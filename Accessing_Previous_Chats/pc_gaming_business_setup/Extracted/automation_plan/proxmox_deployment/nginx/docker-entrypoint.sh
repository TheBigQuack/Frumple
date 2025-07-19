
#!/bin/sh
set -e

# Function to generate self-signed certificate if none exists
generate_self_signed_cert() {
    local domain=$1
    local cert_dir="/etc/nginx/ssl"
    local cert_file="${cert_dir}/${domain}.pem"
    local key_file="${cert_dir}/${domain}-key.pem"
    
    if [ ! -f "$cert_file" ] || [ ! -f "$key_file" ]; then
        echo "Generating self-signed certificate for $domain..."
        mkdir -p "$cert_dir"
        
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout "$key_file" \
            -out "$cert_file" \
            -subj "/C=US/ST=State/L=City/O=Organization/CN=$domain" \
            -addext "subjectAltName=DNS:$domain,DNS:*.$domain,DNS:localhost,IP:127.0.0.1"
        
        echo "Self-signed certificate generated for $domain"
    else
        echo "Certificate already exists for $domain"
    fi
}

# Generate certificate for the domain
DOMAIN=${DOMAIN:-investor.local}
generate_self_signed_cert "$DOMAIN"

# Execute the original command
exec "$@"
