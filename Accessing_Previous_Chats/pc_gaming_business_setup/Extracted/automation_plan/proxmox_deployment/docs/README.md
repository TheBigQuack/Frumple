
# Gaming-Themed Investor Website - Proxmox Deployment

A comprehensive deployment solution for hosting a gaming-themed investor website on Proxmox VE using LXC containers and Docker. This setup provides a production-ready, secure, and scalable environment for internal investor access.

## 🎮 Project Overview

This deployment package contains everything needed to run a Next.js-based investor website with:

- **Gaming Theme**: Tailored for gaming industry investments and esports opportunities
- **Investor Features**: KYC verification, investment tracking, and portfolio management
- **Secure Authentication**: Multi-provider auth with NextAuth.js (email/password, OAuth, magic links)
- **Internal Access**: Designed for private Proxmox networks with SSL certificates
- **Production Ready**: Docker containerization with PostgreSQL, Redis, and Nginx

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Proxmox VE Host                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                LXC Container (Ubuntu 22.04)              │  │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐ │  │
│  │  │   Nginx     │ │  Next.js     │ │    PostgreSQL       │ │  │
│  │  │ (SSL Proxy) │ │ Application  │ │    Database         │ │  │
│  │  └─────────────┘ └──────────────┘ └─────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │              Docker Network                           │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
proxmox_deployment/
├── docker/                     # Docker configuration
│   ├── Dockerfile              # Multi-stage Next.js build
│   ├── docker-compose.yml      # Service orchestration
│   ├── .env.example           # Environment template
│   └── .dockerignore          # Docker ignore rules
├── nginx/                      # Nginx reverse proxy
│   ├── Dockerfile             # Nginx container build
│   ├── nginx.conf             # Main nginx configuration
│   ├── conf.d/                # Site-specific configs
│   └── docker-entrypoint.sh   # SSL cert generation
├── sql/                       # Database setup
│   └── init.sql               # Schema and sample data
├── auth/                      # Authentication setup
│   ├── next-auth.config.js    # NextAuth.js configuration
│   └── middleware.js          # Route protection
├── scripts/                   # Deployment automation
│   ├── deploy.sh              # Main deployment script
│   ├── backup.sh              # Backup automation
│   └── renew_certs.sh         # SSL certificate renewal
└── docs/                      # Documentation
    ├── PROXMOX_LXC_SETUP.md   # Container setup guide
    ├── AUTH_SETUP.md          # Authentication guide
    ├── DEPLOYMENT_GUIDE.md    # Complete deployment
    └── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Proxmox VE 7.x or higher
- 8GB+ RAM and 50GB+ storage available
- Your Next.js investor website at `/home/ubuntu/arcade_investor_site`
- Basic Linux command line knowledge

### 1. Set Up LXC Container

```bash
# On Proxmox host - Create container with Docker support
pct create 105 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname investor-website \
  --storage local-lvm \
  --rootfs 20G \
  --memory 4096 \
  --cores 2 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --features nesting=1,keyctl=1 \
  --unprivileged 1

# Configure for Docker
echo "lxc.apparmor.profile: unconfined" >> /etc/pve/lxc/105.conf
echo "lxc.cgroup.devices.allow: a" >> /etc/pve/lxc/105.conf
echo "lxc.cap.drop:" >> /etc/pve/lxc/105.conf

# Start container
pct start 105
```

### 2. Install Docker in Container

```bash
# Access container
pct exec 105 -- bash

# Install Docker (see PROXMOX_LXC_SETUP.md for complete steps)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 3. Deploy Application

```bash
# Copy deployment files to container
# Transfer proxmox_deployment/ and arcade_investor_site/ directories

# Run deployment script
cd /path/to/proxmox_deployment
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### 4. Access Your Site

```bash
# Add to your hosts file
echo "<container-ip> investor.local" >> /etc/hosts

# Access the website
https://investor.local
```

## 🔧 Configuration

### Environment Variables

Copy `docker/.env.example` to `docker/.env` and configure:

```bash
# Database
POSTGRES_DB=investor_db
POSTGRES_USER=investor_user
POSTGRES_PASSWORD=your_secure_password

# Authentication
NEXTAUTH_SECRET=your_secure_secret
NEXTAUTH_URL=https://investor.local

# Email (for magic links)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password

# OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### SSL Certificates

Three options for SSL certificates:

1. **mkcert (Recommended for internal use)**:
   ```bash
   mkcert -install
   mkcert investor.local "*.investor.local" localhost 127.0.0.1
   ```

2. **Self-signed (Automatic)**: Generated automatically by nginx container

3. **Let's Encrypt**: For public domains (requires certbot)

## 🔐 Authentication Features

- **Multi-Provider Auth**: Email/password, Google OAuth, magic links
- **Database Sessions**: Persistent sessions with PostgreSQL
- **Investor Profiles**: KYC verification, risk assessment, investment tracking
- **Route Protection**: Middleware-based access control
- **Security**: Rate limiting, CSRF protection, secure headers

### Authentication Flow

```
User Request → Middleware → NextAuth.js → PostgreSQL → Session
     ↓              ↓           ↓            ↓          ↓
Route Check → Auth Check → Provider → User Data → Access Granted
```

## 💾 Database Schema

The system includes comprehensive database schema for:

- **User Management**: Users, accounts, sessions, verification tokens
- **Investor Profiles**: KYC status, risk tolerance, investment experience
- **Investment Opportunities**: Gaming/esports investment listings
- **Investment Tracking**: User investments and portfolio management
- **Gaming Metrics**: Performance data for gaming investments

## 🛠️ Management Commands

### Service Management

```bash
# View service status
docker-compose ps

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update services
docker-compose pull && docker-compose up -d
```

### Database Management

```bash
# Access database
docker-compose exec postgres psql -U investor_user -d investor_db

# Backup database
./scripts/backup.sh

# View users
docker-compose exec postgres psql -U investor_user -d investor_db -c "SELECT * FROM users;"
```

### SSL Certificate Management

```bash
# Renew certificates
./scripts/renew_certs.sh

# Check certificate expiry
openssl x509 -in nginx/ssl/investor.local.pem -text -noout | grep "Not After"
```

## 📊 Monitoring and Maintenance

### Health Checks

- **Application**: `https://investor.local/api/health`
- **Database**: Built-in PostgreSQL health checks
- **Services**: Docker Compose health monitoring

### Automated Tasks

- **Daily Backups**: Database and file backups at 2 AM
- **Monthly SSL Renewal**: Automatic certificate renewal
- **Log Rotation**: Automated log cleanup
- **Security Updates**: Container and OS updates

### Performance Monitoring

```bash
# Resource usage
docker stats

# Container performance
pct status 105

# Database performance
docker-compose exec postgres psql -U investor_user -d investor_db -c "SELECT * FROM pg_stat_activity;"
```

## 🔒 Security Features

### Network Security

- **Internal Only**: Designed for private network access
- **Firewall**: UFW configuration with minimal open ports
- **Rate Limiting**: Nginx-based request limiting
- **SSL/TLS**: Strong cipher suites and HSTS headers

### Application Security

- **Authentication**: Multi-factor and secure session management
- **CSRF Protection**: Built-in NextAuth.js protection
- **Input Validation**: Database-level constraints
- **Security Headers**: Comprehensive HTTP security headers

### Container Security

- **Unprivileged Containers**: Non-root container execution
- **Resource Limits**: CPU and memory constraints
- **Network Isolation**: Docker network segmentation
- **Regular Updates**: Automated security updates

## 📚 Documentation

Detailed guides available:

- **[PROXMOX_LXC_SETUP.md](docs/PROXMOX_LXC_SETUP.md)**: Complete LXC container setup
- **[AUTH_SETUP.md](docs/AUTH_SETUP.md)**: Authentication system configuration
- **[DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)**: Step-by-step deployment

## 🐛 Troubleshooting

### Common Issues

1. **Container won't start**: Check nesting and keyctl features
2. **Docker fails**: Verify AppArmor and cgroup configuration
3. **Database connection**: Check network connectivity and credentials
4. **SSL errors**: Verify certificate files and nginx configuration
5. **Authentication issues**: Check environment variables and OAuth setup

### Debug Commands

```bash
# Check container config
pct config 105

# View Docker logs
journalctl -u docker

# Test database connection
docker-compose exec postgres pg_isready -U investor_user

# Check SSL certificate
openssl s_client -connect investor.local:443
```

## 🔄 Backup and Recovery

### Automated Backups

The system includes comprehensive backup automation:

- **Database**: PostgreSQL dumps with compression
- **Files**: Application uploads and user data
- **Configuration**: Docker and nginx configurations
- **SSL Certificates**: Certificate and key backups

### Recovery Procedures

```bash
# Restore database
gunzip -c backup.sql.gz | docker-compose exec -T postgres psql -U investor_user -d investor_db

# Restore files
docker run --rm -v investor_app_uploads:/target -v ./backup:/backup alpine tar xzf /backup/uploads.tar.gz -C /target

# Restore configuration
tar xzf configuration_backup.tar.gz -C /deployment/directory
```

## 🚀 Scaling and Performance

### Vertical Scaling

```bash
# Increase container resources
pct set 105 --memory 8192 --cores 4

# Optimize PostgreSQL
# See DEPLOYMENT_GUIDE.md for database optimization
```

### Horizontal Scaling

- **Load Balancing**: Multiple Next.js containers behind nginx
- **Database Replication**: PostgreSQL read replicas
- **Caching**: Redis for session and application caching
- **CDN**: Static asset distribution

## 📞 Support

For issues and questions:

1. **Check Documentation**: Comprehensive guides in `/docs/`
2. **Review Logs**: Application and system logs
3. **Test Components**: Individual service testing
4. **Community Resources**: Docker, Next.js, and Proxmox communities

## 📄 License

This deployment configuration is provided as-is for internal use. Ensure compliance with all software licenses for included components (Docker, PostgreSQL, Nginx, Next.js, etc.).

## 🎯 Gaming Investment Features

This deployment is specifically tailored for gaming industry investments:

- **Gaming Metrics**: Track game performance, user engagement, revenue
- **Esports Opportunities**: Tournament investments and team funding
- **Industry Analytics**: Gaming market trends and analysis
- **Portfolio Management**: Gaming-focused investment tracking
- **Risk Assessment**: Gaming industry-specific risk evaluation

---

**Ready to deploy your gaming-themed investor website on Proxmox? Start with the [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for complete step-by-step instructions!**
