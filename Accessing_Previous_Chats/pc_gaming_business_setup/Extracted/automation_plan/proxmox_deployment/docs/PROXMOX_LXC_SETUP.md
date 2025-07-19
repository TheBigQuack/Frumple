
# Proxmox LXC Container Setup for Investor Website

This guide provides step-by-step instructions for setting up a Proxmox LXC container to host the gaming-themed investor website with Docker.

## Prerequisites

- Proxmox VE 7.x or higher
- Root access to Proxmox host
- Ubuntu 22.04 LXC template downloaded
- At least 4GB RAM and 20GB storage available

## Step 1: Download Ubuntu Template

First, download the Ubuntu 22.04 template on your Proxmox host:

```bash
# Update template list
pveam update

# List available Ubuntu templates
pveam available | grep ubuntu

# Download Ubuntu 22.04 standard template
pveam download local ubuntu-22.04-standard_22.04-1_amd64.tar.zst
```

## Step 2: Create LXC Container

### Option A: Using Proxmox Web GUI

1. **Access Proxmox Web Interface**
   - Navigate to your Proxmox server IP:8006
   - Login with root credentials

2. **Create Container**
   - Click "Create CT" in the top right
   - Configure the following tabs:

   **General Tab:**
   - Node: Select your Proxmox node
   - CT ID: 105 (or your preferred ID)
   - Hostname: `investor-website`
   - Password: Set a strong root password
   - SSH public key: (optional but recommended)

   **Template Tab:**
   - Storage: local
   - Template: ubuntu-22.04-standard

   **Disk Tab:**
   - Storage: local-lvm (or your preferred storage)
   - Disk size: 20 GB minimum
   - Mount options: Leave default

   **CPU Tab:**
   - Cores: 2 (minimum recommended)
   - CPU limit: Leave default
   - CPU units: 1024

   **Memory Tab:**
   - Memory: 4096 MB (4GB minimum)
   - Swap: 512 MB

   **Network Tab:**
   - Bridge: vmbr0
   - IPv4: DHCP (or static IP)
   - IPv6: auto (or disabled)

   **DNS Tab:**
   - Use host settings: checked
   - Or configure custom DNS servers

3. **Important: Enable Required Features**
   After creating the container, you MUST enable nesting and keyctl:
   - Go to the container's Options tab
   - Double-click "Features"
   - Enable: `nesting=1,keyctl=1`
   - Click OK

### Option B: Using Command Line (Recommended)

Create the container with all required features enabled:

```bash
pct create 105 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname investor-website \
  --storage local-lvm \
  --rootfs 20G \
  --memory 4096 \
  --swap 512 \
  --cores 2 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --features nesting=1,keyctl=1 \
  --unprivileged 1 \
  --password
```

## Step 3: Configure LXC for Docker (Critical)

### Edit LXC Configuration File

On the Proxmox host, edit the container configuration:

```bash
nano /etc/pve/lxc/105.conf
```

Add the following lines to enable Docker functionality:

```
# Enable AppArmor unconfined profile
lxc.apparmor.profile: unconfined

# Allow all devices (required for Docker)
lxc.cgroup.devices.allow: a

# Don't drop any capabilities
lxc.cap.drop:

# For ZFS hosts: Enable FUSE device access
lxc.mount.entry: /dev/fuse dev/fuse none bind,create=file,rw,uid=165536,gid=165536 0 0
```

**Important Notes:**
- The `lxc.mount.entry` line is ONLY needed if your Proxmox host uses ZFS storage
- The UID/GID 165536 is the default for unprivileged containers
- Remove the FUSE line if you're using LVM or other storage backends

### Restart Container

After modifying the configuration:

```bash
pct restart 105
```

## Step 4: Install Docker in LXC Container

### Access the Container

```bash
pct exec 105 -- bash
```

### Install Docker

Run the following commands inside the container:

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install required packages
apt install -y apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package lists
apt update

# Install Docker
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose (standalone)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Configure Docker Storage Driver (For ZFS Hosts)

If your Proxmox host uses ZFS, configure Docker to use fuse-overlayfs:

```bash
# Create Docker daemon configuration
mkdir -p /etc/docker
cat > /etc/docker/daemon.json << 'EOF'
{
  "storage-driver": "fuse-overlayfs"
}
EOF

# Restart Docker
systemctl restart docker
```

### Test Docker Installation

```bash
# Test Docker
docker run hello-world

# Test Docker Compose
docker-compose --version
```

## Step 5: Network Configuration

### Configure Static IP (Optional)

If you prefer a static IP for the container:

1. **Edit network configuration inside container:**
   ```bash
   nano /etc/netplan/10-lxc.yaml
   ```

2. **Configure static IP:**
   ```yaml
   network:
     version: 2
     ethernets:
       eth0:
         addresses:
           - 192.168.1.100/24  # Change to your network
         gateway4: 192.168.1.1   # Change to your gateway
         nameservers:
           addresses:
             - 8.8.8.8
             - 8.8.4.4
   ```

3. **Apply configuration:**
   ```bash
   netplan apply
   ```

### Configure Firewall (Optional)

Install and configure UFW for basic security:

```bash
# Install UFW
apt install -y ufw

# Configure basic rules
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable
```

## Step 6: Prepare for Deployment

### Create Deployment User

```bash
# Create deployment user
adduser deploy
usermod -aG docker deploy
usermod -aG sudo deploy

# Switch to deployment user
su - deploy
```

### Clone Deployment Files

```bash
# Create deployment directory
mkdir -p /home/deploy/investor-deployment

# Copy deployment files from Proxmox host
# (You'll need to transfer the proxmox_deployment directory)
```

## Step 7: Container Resource Limits

### Configure Memory and CPU Limits

Edit the container configuration on the Proxmox host:

```bash
nano /etc/pve/lxc/105.conf
```

Add or modify resource limits:

```
# Memory limits
memory: 4096
swap: 512

# CPU limits
cores: 2
cpulimit: 2
cpuunits: 1024

# I/O limits (optional)
rootfs: local-lvm:vm-105-disk-0,size=20G
```

## Step 8: Backup Configuration

### Create Container Template

After successful setup, create a template for future deployments:

```bash
# Stop the container
pct stop 105

# Create template
pct template 105

# Clone from template for new deployments
pct clone 105 106 --hostname investor-website-prod
```

### Setup Automated Backups

Configure Proxmox backup schedule:

1. Go to Datacenter → Backup
2. Add backup job:
   - Node: Select your node
   - Selection mode: Include selected VMs
   - Schedule: Daily at 2:00 AM
   - Storage: Select backup storage
   - Mode: Snapshot
   - Compression: ZSTD

## Troubleshooting

### Common Issues and Solutions

1. **Docker fails to start with "failed to start shim" error:**
   - Ensure `nesting=1` is enabled in container features
   - Verify `lxc.apparmor.profile: unconfined` is in the config file

2. **Permission denied errors:**
   - Check that `lxc.cgroup.devices.allow: a` is configured
   - Ensure `lxc.cap.drop:` is empty (no capabilities dropped)

3. **Overlay2 storage driver fails on ZFS:**
   - Add the FUSE mount entry to the LXC config
   - Configure Docker to use `fuse-overlayfs` storage driver

4. **Container won't start after configuration changes:**
   - Check configuration syntax: `pct config 105`
   - Review Proxmox logs: `journalctl -u pve-container@105`

5. **Network connectivity issues:**
   - Verify bridge configuration: `ip addr show vmbr0`
   - Check container network: `pct exec 105 -- ip addr show`

### Performance Optimization

1. **Enable KSM (Kernel Same-page Merging):**
   ```bash
   echo 1 > /sys/kernel/mm/ksm/run
   ```

2. **Optimize container I/O:**
   ```bash
   # In container config
   rootfs: local-lvm:vm-105-disk-0,size=20G,cache=writeback
   ```

3. **Configure swap accounting:**
   ```bash
   # Add to Proxmox host /etc/default/grub
   GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"
   update-grub
   reboot
   ```

## Security Considerations

1. **Container Isolation:**
   - Use unprivileged containers when possible
   - Regularly update the container OS
   - Monitor container resource usage

2. **Network Security:**
   - Configure firewall rules
   - Use VPN for external access
   - Implement fail2ban for SSH protection

3. **Access Control:**
   - Use SSH keys instead of passwords
   - Implement sudo restrictions
   - Regular security audits

## Next Steps

After completing this setup:

1. Transfer your deployment files to the container
2. Run the deployment script: `./scripts/deploy.sh`
3. Configure SSL certificates
4. Set up monitoring and logging
5. Configure automated backups

For detailed deployment instructions, see `DEPLOYMENT_GUIDE.md`.
