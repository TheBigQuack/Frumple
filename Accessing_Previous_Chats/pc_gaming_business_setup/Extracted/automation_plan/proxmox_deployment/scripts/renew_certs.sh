
#!/bin/bash

# SSL Certificate renewal script for investor website
# Supports both mkcert (development) and Let's Encrypt (production)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOYMENT_DIR="$(dirname "$SCRIPT_DIR")"
DOMAIN="investor.local"
SSL_DIR="$DEPLOYMENT_DIR/nginx/ssl"
DOCKER_COMPOSE_FILE="$DEPLOYMENT_DIR/docker/docker-compose.yml"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_certificate_expiry() {
    local cert_file="$SSL_DIR/${DOMAIN}.pem"
    
    if [ ! -f "$cert_file" ]; then
        log_warning "Certificate file not found: $cert_file"
        return 1
    fi
    
    local expiry_date=$(openssl x509 -enddate -noout -in "$cert_file" | cut -d= -f2)
    local expiry_epoch=$(date -d "$expiry_date" +%s)
    local current_epoch=$(date +%s)
    local days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))
    
    log_info "Certificate expires in $days_until_expiry days"
    
    if [ $days_until_expiry -lt 30 ]; then
        log_warning "Certificate expires in less than 30 days, renewal recommended"
        return 0
    else
        log_info "Certificate is still valid for more than 30 days"
        return 1
    fi
}

renew_mkcert_certificates() {
    log_info "Renewing certificates with mkcert..."
    
    if ! command -v mkcert &> /dev/null; then
        log_error "mkcert is not installed. Please install mkcert first."
        return 1
    fi
    
    # Create SSL directory if it doesn't exist
    mkdir -p "$SSL_DIR"
    
    # Generate new certificates
    cd "$SSL_DIR"
    
    # Remove old certificates
    rm -f "${DOMAIN}.pem" "${DOMAIN}-key.pem"
    
    # Generate new certificates
    mkcert "$DOMAIN" "*.${DOMAIN}" localhost 127.0.0.1 ::1
    
    # Rename files to match nginx configuration
    mv "${DOMAIN}+4.pem" "${DOMAIN}.pem" 2>/dev/null || true
    mv "${DOMAIN}+4-key.pem" "${DOMAIN}-key.pem" 2>/dev/null || true
    
    log_success "mkcert certificates renewed successfully"
    return 0
}

renew_letsencrypt_certificates() {
    log_info "Renewing Let's Encrypt certificates..."
    
    if ! command -v certbot &> /dev/null; then
        log_error "Certbot is not installed. Please install certbot first."
        return 1
    fi
    
    # Stop nginx temporarily for standalone renewal
    log_info "Stopping nginx for certificate renewal..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" stop nginx
    
    # Renew certificates
    certbot renew --standalone --preferred-challenges http
    
    # Copy renewed certificates to SSL directory
    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$SSL_DIR/${DOMAIN}.pem"
        cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$SSL_DIR/${DOMAIN}-key.pem"
        log_success "Let's Encrypt certificates copied to SSL directory"
    else
        log_error "Let's Encrypt certificates not found for domain $DOMAIN"
        return 1
    fi
    
    # Restart nginx
    log_info "Restarting nginx..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" start nginx
    
    log_success "Let's Encrypt certificates renewed successfully"
    return 0
}

generate_self_signed_certificates() {
    log_info "Generating self-signed certificates..."
    
    mkdir -p "$SSL_DIR"
    cd "$SSL_DIR"
    
    # Remove old certificates
    rm -f "${DOMAIN}.pem" "${DOMAIN}-key.pem"
    
    # Generate new self-signed certificate
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "${DOMAIN}-key.pem" \
        -out "${DOMAIN}.pem" \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=$DOMAIN" \
        -addext "subjectAltName=DNS:$DOMAIN,DNS:*.$DOMAIN,DNS:localhost,IP:127.0.0.1"
    
    log_success "Self-signed certificates generated successfully"
    return 0
}

reload_nginx() {
    log_info "Reloading nginx configuration..."
    
    if docker-compose -f "$DOCKER_COMPOSE_FILE" exec nginx nginx -t; then
        docker-compose -f "$DOCKER_COMPOSE_FILE" exec nginx nginx -s reload
        log_success "Nginx configuration reloaded successfully"
    else
        log_error "Nginx configuration test failed"
        return 1
    fi
}

main() {
    log_info "Starting SSL certificate renewal process..."
    
    # Check if certificates need renewal
    if ! check_certificate_expiry; then
        log_info "Certificates are still valid, skipping renewal"
        exit 0
    fi
    
    # Determine renewal method
    if [ "$1" = "--letsencrypt" ]; then
        if renew_letsencrypt_certificates; then
            reload_nginx
        else
            log_error "Let's Encrypt renewal failed"
            exit 1
        fi
    elif [ "$1" = "--self-signed" ]; then
        if generate_self_signed_certificates; then
            reload_nginx
        else
            log_error "Self-signed certificate generation failed"
            exit 1
        fi
    else
        # Default to mkcert if available, otherwise self-signed
        if command -v mkcert &> /dev/null; then
            if renew_mkcert_certificates; then
                reload_nginx
            else
                log_error "mkcert renewal failed"
                exit 1
            fi
        else
            log_warning "mkcert not available, falling back to self-signed certificates"
            if generate_self_signed_certificates; then
                reload_nginx
            else
                log_error "Self-signed certificate generation failed"
                exit 1
            fi
        fi
    fi
    
    log_success "Certificate renewal completed successfully!"
    
    # Show certificate information
    log_info "Certificate information:"
    openssl x509 -in "$SSL_DIR/${DOMAIN}.pem" -text -noout | grep -A 2 "Validity"
}

# Show usage if help requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  --letsencrypt    Use Let's Encrypt for certificate renewal"
    echo "  --self-signed    Generate self-signed certificates"
    echo "  --help, -h       Show this help message"
    echo
    echo "Default behavior: Use mkcert if available, otherwise generate self-signed certificates"
    exit 0
fi

# Run main function
main "$@"
