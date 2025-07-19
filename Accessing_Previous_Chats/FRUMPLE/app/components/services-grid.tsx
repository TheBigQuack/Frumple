
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  Headset, 
  Video, 
  Server, 
  Coffee,
  ArrowRight,
  Zap,
  Users,
  Trophy
} from 'lucide-react'

const services = [
  {
    id: 'gaming-stations',
    title: 'Gaming Stations',
    description: 'Premium PC gaming setups with latest RTX 4090 GPUs, 144Hz monitors, and pro gaming peripherals',
    icon: Gamepad2,
    color: 'from-green-400 to-emerald-600',
    href: '/gaming-stations',
    features: ['RTX 4090 Graphics', '144Hz Displays', 'Pro Peripherals'],
    price: 'From $15/hr'
  },
  {
    id: 'vr-experiences',
    title: 'VR Experiences',
    description: 'Immersive virtual reality adventures with cutting-edge headsets and motion tracking technology',
    icon: Headset,
    color: 'from-purple-400 to-violet-600',
    href: '/vr-experiences',
    features: ['Meta Quest Pro', 'Full Body Tracking', '25+ Experiences'],
    price: 'From $25/session'
  },
  {
    id: 'streaming-studios',
    title: 'Streaming Studios',
    description: 'Professional streaming setups with multi-camera systems, lighting, and broadcast equipment',
    icon: Video,
    color: 'from-pink-400 to-rose-600',
    href: '/streaming-studios',
    features: ['Multi-Cam Setup', 'Pro Lighting', 'Stream Overlays'],
    price: 'From $50/hr'
  },
  {
    id: 'server-hosting',
    title: 'Server Hosting',
    description: 'Enterprise-grade game server hosting with global CDN, DDoS protection, and 99.9% uptime',
    icon: Server,
    color: 'from-cyan-400 to-blue-600',
    href: '/server-hosting',
    features: ['Global CDN', 'DDoS Protection', '99.9% Uptime'],
    price: 'From $99/month'
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
    description: 'Gourmet gaming fuel including energy drinks, snacks, meals, and gaming-themed cocktails',
    icon: Coffee,
    color: 'from-orange-400 to-amber-600',
    href: '/food-beverages',
    features: ['Energy Drinks', 'Gaming Snacks', 'Themed Meals'],
    price: 'From $5'
  },
  {
    id: 'tournaments',
    title: 'Tournaments',
    description: 'Competitive esports tournaments with cash prizes, streaming, and professional commentary',
    icon: Trophy,
    color: 'from-yellow-400 to-orange-600',
    href: '/tournaments',
    features: ['Cash Prizes', 'Live Streaming', 'Pro Commentary'],
    price: 'Entry varies'
  }
]

export function ServicesGrid() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
          Gaming Services
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Comprehensive gaming solutions for casual players, content creators, and esports professionals
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Card 
              key={service.id} 
              className="cyber-card group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 relative">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} mr-4`}>
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-orbitron text-white">
                        {service.title}
                      </h3>
                      <p className="text-green-400 font-medium text-sm">
                        {service.price}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Zap className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={service.href}>
                    <Button className="w-full cyber-button group">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="holographic rounded-lg p-8 max-w-2xl mx-auto">
          <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold font-orbitron mb-4">
            Ready to Level Up?
          </h3>
          <p className="text-gray-400 mb-6">
            Join thousands of gamers who've made FRUMPLE their gaming home
          </p>
          <Link href="/auth/signup">
            <Button className="cyber-button px-8 py-3">
              Join the Community
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
