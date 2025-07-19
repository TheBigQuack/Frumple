
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Server, 
  Zap, 
  Shield,
  Globe,
  Clock,
  HardDrive,
  Cpu,
  Wifi,
  Users,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react'
import { BookingModal } from '@/components/booking-modal'

interface ServerPackage {
  id: string
  name: string
  tier: 'starter' | 'professional' | 'enterprise' | 'dedicated'
  monthlyPrice: number
  setupFee: number
  specifications: {
    cpu: string
    ram: string
    storage: string
    bandwidth: string
    locations: string[]
  }
  features: string[]
  gameSupport: string[]
  uptime: string
  support: string
  maxPlayers: number
  isPopular?: boolean
  isRecommended?: boolean
}

const serverPackages: ServerPackage[] = [
  {
    id: 'starter-01',
    name: 'Starter Gaming',
    tier: 'starter',
    monthlyPrice: 99,
    setupFee: 0,
    specifications: {
      cpu: '4 vCPU (3.2GHz)',
      ram: '8GB DDR4',
      storage: '100GB NVMe SSD',
      bandwidth: '1TB/month',
      locations: ['US East', 'US West', 'EU Central']
    },
    features: ['DDoS Protection', 'Automated Backups', 'Control Panel', 'Basic Monitoring'],
    gameSupport: ['Minecraft', 'Terraria', 'CS:GO', 'Garry\'s Mod'],
    uptime: '99.5%',
    support: 'Email Support',
    maxPlayers: 32,
  },
  {
    id: 'pro-01',
    name: 'Professional Esports',
    tier: 'professional',
    monthlyPrice: 249,
    setupFee: 50,
    specifications: {
      cpu: '8 vCPU (3.6GHz)',
      ram: '16GB DDR4',
      storage: '250GB NVMe SSD',
      bandwidth: '5TB/month',
      locations: ['US East', 'US West', 'EU Central', 'Asia Pacific']
    },
    features: ['Advanced DDoS Protection', 'Daily Backups', 'Advanced Control Panel', 'Real-time Monitoring', 'Custom Mods'],
    gameSupport: ['Minecraft', 'CS:GO', 'Valorant', 'Apex Legends', 'Fortnite', 'Rocket League'],
    uptime: '99.9%',
    support: '24/7 Chat Support',
    maxPlayers: 128,
    isPopular: true
  },
  {
    id: 'enterprise-01',
    name: 'Enterprise Tournament',
    tier: 'enterprise',
    monthlyPrice: 499,
    setupFee: 100,
    specifications: {
      cpu: '16 vCPU (4.0GHz)',
      ram: '32GB DDR4',
      storage: '500GB NVMe SSD',
      bandwidth: 'Unlimited',
      locations: ['Global CDN (12 locations)']
    },
    features: ['Enterprise DDoS Protection', 'Hourly Backups', 'White-label Control Panel', 'Advanced Analytics', 'Custom Configurations', 'Load Balancing'],
    gameSupport: ['All Major Games', 'Custom Game Servers', 'Tournament Platforms', 'Streaming Integration'],
    uptime: '99.95%',
    support: 'Dedicated Account Manager',
    maxPlayers: 500,
    isRecommended: true
  },
  {
    id: 'dedicated-01',
    name: 'Dedicated Powerhouse',
    tier: 'dedicated',
    monthlyPrice: 999,
    setupFee: 200,
    specifications: {
      cpu: 'Intel Xeon E-2288G (8 cores, 3.7GHz)',
      ram: '64GB DDR4 ECC',
      storage: '1TB NVMe SSD + 2TB HDD',
      bandwidth: 'Unlimited (10Gbps)',
      locations: ['Choice of dedicated location']
    },
    features: ['Hardware-level DDoS Protection', 'Real-time Backups', 'Full Root Access', 'Custom Hardware', 'Private Network', 'Disaster Recovery'],
    gameSupport: ['Any Game/Application', 'Custom Builds', 'Multiple Game Instances', 'Development Environments'],
    uptime: '99.99%',
    support: '24/7 Phone + Dedicated Engineer',
    maxPlayers: 2000,
  }
]

const serverStats = [
  { label: 'Global Locations', value: '12+', icon: Globe },
  { label: 'Uptime Average', value: '99.9%', icon: CheckCircle },
  { label: 'DDoS Protection', value: '1.2Tbps', icon: Shield },
  { label: 'Response Time', value: '<15ms', icon: Zap }
]

function getTierColor(tier: string) {
  switch (tier) {
    case 'dedicated': return 'from-yellow-400 to-orange-600'
    case 'enterprise': return 'from-purple-400 to-violet-600'
    case 'professional': return 'from-blue-400 to-cyan-600'
    case 'starter': return 'from-green-400 to-emerald-600'
    default: return 'from-gray-400 to-gray-600'
  }
}

export function ServerHostingClient() {
  const [mounted, setMounted] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<ServerPackage | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelectPackage = (pkg: ServerPackage) => {
    setSelectedPackage(pkg)
    setBookingModalOpen(true)
  }

  if (!mounted) return null

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Server Hosting
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Enterprise-grade game server hosting with global CDN, DDoS protection, and guaranteed 99.9% uptime
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto" />
        </div>

        {/* Server Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {serverStats.map((stat, index) => (
            <div key={stat.label} className="cyber-card p-6 text-center">
              <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="data-display text-xl font-bold mb-2">{stat.value}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {serverPackages.map((pkg, index) => (
            <Card 
              key={pkg.id}
              className={`cyber-card relative overflow-hidden ${
                pkg.isRecommended ? 'ring-2 ring-purple-500 scale-105' : ''
              } ${pkg.isPopular ? 'ring-2 ring-green-500' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.isRecommended && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Recommended
                  </Badge>
                </div>
              )}
              {pkg.isPopular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${getTierColor(pkg.tier)} flex items-center justify-center`}>
                  <Server className="w-8 h-8 text-black" />
                </div>
                <CardTitle className="text-xl font-orbitron text-white mb-2">
                  {pkg.name}
                </CardTitle>
                <Badge className={`bg-gradient-to-r ${getTierColor(pkg.tier)} text-black border-0 mb-4`}>
                  {pkg.tier.toUpperCase()}
                </Badge>
                <div className="text-center">
                  <div className="data-display text-3xl font-bold gradient-text mb-1">
                    ${pkg.monthlyPrice}
                  </div>
                  <p className="text-gray-400 text-sm">per month</p>
                  {pkg.setupFee > 0 && (
                    <p className="text-xs text-yellow-400 mt-1">
                      Setup: ${pkg.setupFee}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Specifications */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Cpu className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">{pkg.specifications.cpu}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Activity className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-gray-300">{pkg.specifications.ram}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <HardDrive className="w-4 h-4 text-cyan-400 mr-2" />
                    <span className="text-gray-300">{pkg.specifications.storage}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Wifi className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-gray-300">{pkg.specifications.bandwidth}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2 mb-6">
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Game Support */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-green-400 mb-2">Supported Games:</p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.gameSupport.slice(0, 3).map((game, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-400/50 text-green-400">
                        {game}
                      </Badge>
                    ))}
                    {pkg.gameSupport.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-400/50 text-gray-400">
                        +{pkg.gameSupport.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* SLA Info */}
                <div className="flex items-center justify-between mb-6 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-gray-300">{pkg.uptime} uptime</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-purple-400 mr-1" />
                    <span className="text-gray-300">{pkg.maxPlayers} players</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full cyber-button"
                  onClick={() => handleSelectPackage(pkg)}
                >
                  Select Plan
                </Button>
              </CardContent>

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getTierColor(pkg.tier)} opacity-5 pointer-events-none`} />
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="cyber-card p-8 text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">DDoS Protection</h3>
            <p className="text-gray-400 mb-4">
              Industry-leading DDoS protection with 1.2Tbps mitigation capacity to keep your servers online.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Automatic attack detection</li>
              <li>• Real-time traffic filtering</li>
              <li>• Zero-downtime protection</li>
            </ul>
          </div>

          <div className="cyber-card p-8 text-center">
            <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Global CDN</h3>
            <p className="text-gray-400 mb-4">
              Worldwide server locations with intelligent routing for optimal player connections and minimal latency.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 12+ global locations</li>
              <li>• Automatic failover</li>
              <li>• Sub-15ms response times</li>
            </ul>
          </div>

          <div className="cyber-card p-8 text-center">
            <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Real-time Monitoring</h3>
            <p className="text-gray-400 mb-4">
              Comprehensive monitoring with alerts, analytics, and performance insights for optimal server management.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Performance metrics</li>
              <li>• Instant alerts</li>
              <li>• Historical analytics</li>
            </ul>
          </div>
        </div>

        {/* Enterprise Contact */}
        <div className="holographic rounded-lg p-8 text-center">
          <Server className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-orbitron mb-4 gradient-text">
            Custom Enterprise Solutions
          </h2>
          <p className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto">
            Need custom configurations, hybrid cloud solutions, or dedicated infrastructure? 
            Our enterprise team can design the perfect hosting solution for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="cyber-button px-8 py-3">
              Contact Enterprise Sales
            </Button>
            <Button variant="outline" className="cyber-border text-green-400 hover:bg-green-500/10 px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        station={selectedPackage}
        type="server-hosting"
      />
    </main>
  )
}
