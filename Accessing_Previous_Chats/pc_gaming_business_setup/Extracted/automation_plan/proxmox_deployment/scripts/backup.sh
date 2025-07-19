
#!/bin/bash

# Backup script for investor website deployment
# Creates backups of database, uploaded files, and configuration

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
BACKUP_DIR="/home/ubuntu/backups/investor_website"
DOCKER_COMPOSE_FILE="$DEPLOYMENT_DIR/docker/docker-compose.yml"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

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

create_backup_directory() {
    log_info "Creating backup directory..."
    mkdir -p "$BACKUP_DIR/$TIMESTAMP"
    log_success "Backup directory created: $BACKUP_DIR/$TIMESTAMP"
}

backup_database() {
    log_info "Backing up PostgreSQL database..."
    
    # Get database credentials from environment
    source "$DEPLOYMENT_DIR/docker/.env"
    
    # Create database backup
    docker-compose -f "$DOCKER_COMPOSE_FILE" exec -T postgres pg_dump \
        -U "$POSTGRES_USER" \
        -d "$POSTGRES_DB" \
        --clean --if-exists --create > "$BACKUP_DIR/$TIMESTAMP/database_backup.sql"
    
    # Compress the backup
    gzip "$BACKUP_DIR/$TIMESTAMP/database_backup.sql"
    
    log_success "Database backup completed: database_backup.sql.gz"
}

backup_uploads() {
    log_info "Backing up uploaded files..."
    
    # Create uploads backup using docker volume
    docker run --rm \
        -v investor_app_uploads:/source:ro \
        -v "$BACKUP_DIR/$TIMESTAMP":/backup \
        alpine:latest \
        tar czf /backup/uploads_backup.tar.gz -C /source .
    
    log_success "Uploads backup completed: uploads_backup.tar.gz"
}

backup_ssl_certificates() {
    log_info "Backing up SSL certificates..."
    
    if [ -d "$DEPLOYMENT_DIR/nginx/ssl" ]; then
        tar czf "$BACKUP_DIR/$TIMESTAMP/ssl_certificates.tar.gz" \
            -C "$DEPLOYMENT_DIR/nginx" ssl/
        log_success "SSL certificates backup completed: ssl_certificates.tar.gz"
    else
        log_warning "SSL certificates directory not found, skipping..."
    fi
}

backup_configuration() {
    log_info "Backing up configuration files..."
    
    # Create configuration backup
    tar czf "$BACKUP_DIR/$TIMESTAMP/configuration_backup.tar.gz" \
        -C "$DEPLOYMENT_DIR" \
        docker/ nginx/ scripts/ docs/ sql/ auth/ \
        --exclude="docker/.env" \
        --exclude="nginx/ssl/*.pem"
    
    log_success "Configuration backup completed: configuration_backup.tar.gz"
}

create_backup_manifest() {
    log_info "Creating backup manifest..."
    
    cat > "$BACKUP_DIR/$TIMESTAMP/backup_manifest.txt" << EOF
Investor Website Backup Manifest
================================
Backup Date: $(date)
Backup Location: $BACKUP_DIR/$TIMESTAMP

Files Included:
- database_backup.sql.gz: PostgreSQL database dump
- uploads_backup.tar.gz: User uploaded files
- ssl_certificates.tar.gz: SSL certificates and keys
- configuration_backup.tar.gz: Docker and nginx configurations

Restore Instructions:
1. Extract configuration_backup.tar.gz to deployment directory
2. Extract ssl_certificates.tar.gz to nginx/ssl directory
3. Restore database using: gunzip -c database_backup.sql.gz | docker-compose exec -T postgres psql -U [user] -d [database]
4. Restore uploads using: docker run --rm -v investor_app_uploads:/target -v [backup_dir]:/backup alpine:latest tar xzf /backup/uploads_backup.tar.gz -C /target

Environment Variables:
$(grep -v "PASSWORD\|SECRET" "$DEPLOYMENT_DIR/docker/.env" 2>/dev/null || echo "Environment file not found")
EOF
    
    log_success "Backup manifest created: backup_manifest.txt"
}

cleanup_old_backups() {
    log_info "Cleaning up old backups (keeping last 7 days)..."
    
    find "$BACKUP_DIR" -type d -name "20*" -mtime +7 -exec rm -rf {} + 2>/dev/null || true
    
    log_success "Old backups cleaned up"
}

show_backup_summary() {
    log_success "Backup completed successfully!"
    echo
    log_info "Backup location: $BACKUP_DIR/$TIMESTAMP"
    log_info "Backup size: $(du -sh "$BACKUP_DIR/$TIMESTAMP" | cut -f1)"
    echo
    log_info "Backup contents:"
    ls -la "$BACKUP_DIR/$TIMESTAMP"
    echo
    log_info "To restore from this backup, see: $BACKUP_DIR/$TIMESTAMP/backup_manifest.txt"
}

main() {
    log_info "Starting backup process for investor website..."
    
    # Check if Docker Compose is running
    if ! docker-compose -f "$DOCKER_COMPOSE_FILE" ps | grep -q "Up"; then
        log_error "Docker Compose services are not running. Please start the services first."
        exit 1
    fi
    
    create_backup_directory
    backup_database
    backup_uploads
    backup_ssl_certificates
    backup_configuration
    create_backup_manifest
    cleanup_old_backups
    show_backup_summary
}

# Show usage if help requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0"
    echo
    echo "Creates a complete backup of the investor website including:"
    echo "  - PostgreSQL database"
    echo "  - Uploaded files"
    echo "  - SSL certificates"
    echo "  - Configuration files"
    echo
    echo "Backups are stored in: $BACKUP_DIR"
    echo "Old backups (>7 days) are automatically cleaned up"
    exit 0
fi

# Run main function
main "$@"
