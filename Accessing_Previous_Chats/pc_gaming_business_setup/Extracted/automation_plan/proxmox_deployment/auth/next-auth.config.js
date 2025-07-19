
// NextAuth.js configuration for investor website
// Compatible with NextAuth.js v5 and @auth/pg-adapter

import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import { Pool } from "pg"
import bcrypt from "bcryptjs"

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Custom user lookup function for credentials
async function getUserByEmail(email) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT id, email, name, password_hash FROM users WHERE email = $1',
      [email]
    )
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

// Custom user creation function
async function createUser(userData) {
  const client = await pool.connect()
  try {
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 12) : null
    const result = await client.query(
      'INSERT INTO users (email, name, password_hash, email_verified) VALUES ($1, $2, $3, $4) RETURNING id, email, name',
      [userData.email, userData.name, hashedPassword, userData.emailVerified || null]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  
  providers: [
    // Google OAuth Provider
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
    
    // Email Magic Link Provider
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
    
    // Credentials Provider for email/password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email)
        if (!user || !user.password_hash) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Allow sign in for verified users or OAuth providers
      if (account?.provider === 'google' || account?.provider === 'email') {
        return true
      }
      
      // For credentials, check if user exists
      if (account?.provider === 'credentials') {
        return !!user
      }
      
      return false
    },

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

    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        // Create investor profile for new users
        const client = await pool.connect()
        try {
          await client.query(
            'INSERT INTO investor_profiles (user_id) VALUES ($1)',
            [user.id]
          )
        } catch (error) {
          console.error('Error creating investor profile:', error)
        } finally {
          client.release()
        }
      }
    }
  },

  debug: process.env.NODE_ENV === 'development',
  
  secret: process.env.NEXTAUTH_SECRET,
})
