
# Authentication System Setup Guide

This guide covers the complete authentication setup for the gaming-themed investor website using NextAuth.js v5 with PostgreSQL adapter.

## Overview

The authentication system provides:
- **Multiple Authentication Methods**: Email/password, OAuth (Google), and magic links
- **Database Session Management**: Using PostgreSQL with @auth/pg-adapter
- **Investor-Specific Features**: KYC verification, investor profiles, and role-based access
- **Security Features**: Rate limiting, CSRF protection, and secure session handling

## Authentication Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   NextAuth.js    │    │   PostgreSQL    │
│   (Next.js)     │◄──►│   Middleware     │◄──►│   Database      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Auth UI │             │ Session │             │ User    │
    │ Pages   │             │ Manager │             │ Tables  │
    └─────────┘             └─────────┘             └─────────┘
```

## Step 1: Database Schema Setup

The database schema is automatically created by the `init.sql` script, but here's what it includes:

### Core NextAuth.js Tables

```sql
-- Users table (core user information)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table (OAuth provider accounts)
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT
);

-- Sessions table (active user sessions)
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL UNIQUE
);

-- Verification tokens (for magic links)
CREATE TABLE verification_token (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
);
```

### Investor-Specific Tables

```sql
-- Investor profiles (extended user information)
CREATE TABLE investor_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    investor_type VARCHAR(50) DEFAULT 'individual',
    investment_experience VARCHAR(50) DEFAULT 'beginner',
    risk_tolerance VARCHAR(50) DEFAULT 'moderate',
    investment_goals TEXT,
    annual_income_range VARCHAR(50),
    net_worth_range VARCHAR(50),
    accredited_investor BOOLEAN DEFAULT FALSE,
    kyc_verified BOOLEAN DEFAULT FALSE,
    kyc_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

## Step 2: NextAuth.js Configuration

### Environment Variables

Create or update your `.env` file with the following authentication-related variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://investor.local
NEXTAUTH_SECRET=your_secure_secret_key_here

# Database Connection
DATABASE_URL=postgresql://investor_user:password@postgres:5432/investor_db

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Configuration (for magic links)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_FROM=noreply@investor.local
```

### NextAuth.js Configuration File

The main configuration is in `/auth/next-auth.config.js`. Key features:

#### 1. Database Adapter Setup

```javascript
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  // ... other configuration
})
```

#### 2. Authentication Providers

```javascript
providers: [
  // Google OAuth
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }
  }),
  
  // Email Magic Links
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    maxAge: 24 * 60 * 60, // 24 hours
  }),
  
  // Email/Password Credentials
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // Custom authentication logic
      // See full implementation in next-auth.config.js
    }
  })
]
```

#### 3. Session Configuration

```javascript
session: {
  strategy: "database",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
},
```

#### 4. Custom Callbacks

```javascript
callbacks: {
  async session({ session, user, token }) {
    // Add user ID and investor profile to session
    if (session?.user && user) {
      session.user.id = user.id
      
      // Fetch investor profile
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT investor_type, investment_experience, risk_tolerance, kyc_verified FROM investor_profiles WHERE user_id = $1',
          [user.id]
        )
        session.user.investorProfile = result.rows[0] || null
      } finally {
        client.release()
      }
    }
    return session
  },
  
  async signIn({ user, account, profile, email, credentials }) {
    // Custom sign-in logic
    return true
  }
}
```

## Step 3: Middleware Setup

The middleware file (`/auth/middleware.js`) provides route protection:

### Route Protection Rules

```javascript
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/verify-request',
  '/api/auth',
  '/api/health'
]

// Admin routes require admin role
if (pathname.startsWith('/admin')) {
  return token?.role === 'admin'
}

// Investment routes require KYC verification
if (pathname.startsWith('/invest')) {
  return token?.investorProfile?.kyc_verified === true
}
```

## Step 4: Frontend Integration

### Authentication Pages

Create the following pages in your Next.js application:

#### Sign In Page (`pages/auth/signin.js` or `app/auth/signin/page.js`)

```javascript
import { getProviders, signIn, getSession } from "next-auth/react"
import { useState } from "react"

export default function SignIn({ providers }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    if (result?.error) {
      // Handle error
    } else {
      // Redirect to dashboard
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="auth-container">
      <h1>Sign In to Investor Portal</h1>
      
      {/* OAuth Providers */}
      {Object.values(providers).map((provider) => {
        if (provider.id === 'credentials') return null
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        )
      })}
      
      {/* Email/Password Form */}
      <form onSubmit={handleCredentialsSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      
      {/* Magic Link */}
      <button onClick={() => signIn('email', { email })}>
        Send Magic Link
      </button>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
```

#### Session Provider Setup

Wrap your application with the SessionProvider:

```javascript
// pages/_app.js or app/layout.js
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

### Using Authentication in Components

```javascript
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>

  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <p>Investor Type: {session.user.investorProfile?.investor_type}</p>
        <p>KYC Status: {session.user.investorProfile?.kyc_verified ? 'Verified' : 'Pending'}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

## Step 5: OAuth Provider Setup

### Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit https://console.cloud.google.com/
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: Web application
   - Name: Investor Website
   - Authorized JavaScript origins: `https://investor.local`
   - Authorized redirect URIs: `https://investor.local/api/auth/callback/google`

4. **Configure Environment Variables**
   ```bash
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

## Step 6: Email Configuration

### Gmail SMTP Setup

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"

3. **Configure Environment Variables**
   ```bash
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_email@gmail.com
   EMAIL_SERVER_PASSWORD=your_app_password
   EMAIL_FROM=noreply@investor.local
   ```

### Custom Email Templates

Create custom email templates for magic links:

```javascript
// In NextAuth configuration
EmailProvider({
  // ... server configuration
  sendVerificationRequest: async ({ identifier, url, provider }) => {
    const { host } = new URL(url)
    const transport = nodemailer.createTransporter(provider.server)
    
    await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Sign in to ${host}`,
      text: `Sign in to ${host}\n${url}\n\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to Investor Portal</h1>
          <p>Click the button below to sign in to your account:</p>
          <a href="${url}" style="background: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Sign In</a>
          <p>If the button doesn't work, copy and paste this link:</p>
          <p>${url}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    })
  },
})
```

## Step 7: Security Configuration

### Rate Limiting

The Nginx configuration includes rate limiting for authentication endpoints:

```nginx
# Rate limiting zones
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# Apply to auth routes
location /api/auth/ {
    limit_req zone=login burst=5 nodelay;
    # ... proxy configuration
}
```

### CSRF Protection

NextAuth.js includes built-in CSRF protection. Ensure your forms include the CSRF token:

```javascript
import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken }) {
  return (
    <form method="post" action="/api/auth/signin/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      {/* ... other form fields */}
    </form>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
```

### Session Security

Configure secure session settings:

```javascript
// In NextAuth configuration
session: {
  strategy: "database",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
},

cookies: {
  sessionToken: {
    name: `__Secure-next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true, // HTTPS only
    }
  }
}
```

## Step 8: Testing Authentication

### Test Checklist

1. **OAuth Sign In**
   - [ ] Google OAuth flow works
   - [ ] User profile is created
   - [ ] Session is established

2. **Email/Password Sign In**
   - [ ] User can register with email/password
   - [ ] Password is hashed correctly
   - [ ] Sign in works with correct credentials
   - [ ] Sign in fails with incorrect credentials

3. **Magic Link Sign In**
   - [ ] Email is sent successfully
   - [ ] Magic link works and signs user in
   - [ ] Link expires after 24 hours

4. **Session Management**
   - [ ] Session persists across page reloads
   - [ ] Session expires after configured time
   - [ ] Sign out works correctly

5. **Route Protection**
   - [ ] Protected routes redirect to sign in
   - [ ] KYC-required routes check verification status
   - [ ] Admin routes check admin role

### Testing Commands

```bash
# Test database connection
docker-compose exec postgres psql -U investor_user -d investor_db -c "SELECT * FROM users LIMIT 5;"

# Check authentication logs
docker-compose logs nextjs_app | grep auth

# Test email configuration
docker-compose exec nextjs_app node -e "
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  auth: { user: 'your_email@gmail.com', pass: 'your_app_password' }
});
transport.verify().then(console.log).catch(console.error);
"
```

## Troubleshooting

### Common Issues

1. **"Adapter error" messages**
   - Check database connection string
   - Verify all required tables exist
   - Check PostgreSQL logs

2. **OAuth callback errors**
   - Verify redirect URIs in OAuth provider settings
   - Check NEXTAUTH_URL environment variable
   - Ensure HTTPS is properly configured

3. **Email sending failures**
   - Test SMTP credentials
   - Check firewall settings
   - Verify app password for Gmail

4. **Session not persisting**
   - Check cookie settings
   - Verify database session storage
   - Check NEXTAUTH_SECRET configuration

### Debug Mode

Enable debug mode for detailed logging:

```javascript
// In NextAuth configuration
debug: process.env.NODE_ENV === 'development',
```

### Database Queries for Debugging

```sql
-- Check user accounts
SELECT u.email, u.name, a.provider, a.type 
FROM users u 
LEFT JOIN accounts a ON u.id = a."userId";

-- Check active sessions
SELECT u.email, s."sessionToken", s.expires 
FROM users u 
JOIN sessions s ON u.id = s."userId" 
WHERE s.expires > NOW();

-- Check investor profiles
SELECT u.email, ip.investor_type, ip.kyc_verified 
FROM users u 
LEFT JOIN investor_profiles ip ON u.id = ip.user_id;
```

## Next Steps

After completing the authentication setup:

1. **Customize Authentication UI** - Style the sign-in/sign-up pages to match your gaming theme
2. **Implement KYC Process** - Add forms and verification workflow for investor accreditation
3. **Add Role Management** - Implement admin roles and permissions
4. **Set Up Monitoring** - Monitor authentication metrics and failed attempts
5. **Configure Backup** - Ensure user data is included in backup procedures

For deployment instructions, see `DEPLOYMENT_GUIDE.md`.
