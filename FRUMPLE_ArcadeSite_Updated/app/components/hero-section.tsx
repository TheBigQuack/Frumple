
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Zap, Gamepad2, Headset } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 opacity-30">
        <Gamepad2 className="w-16 h-16 text-green-400 animate-bounce" style={{ animationDelay: '0s' }} />
      </div>
      <div className="absolute bottom-32 left-20 opacity-30">
        <Headset className="w-12 h-12 text-purple-400 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-1/3 left-10 opacity-30">
        <Zap className="w-10 h-10 text-cyan-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold font-orbitron mb-4">
            <span className="glitch gradient-text">FRUMPLE</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-purple-600 mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-300 font-rajdhani font-medium tracking-wide">
            ELITE GAMING HUB
          </p>
        </div>

        {/* Subtitle */}
        <div className="mb-12">
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience next-generation gaming with premium stations, immersive VR, professional streaming studios, 
            enterprise server hosting, and gourmet gaming fuel. Located in Red Bank, TN - bringing competitive gaming to the Greater Chattanooga area.
          </p>
          <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-500">
            <span className="flex items-center">
              📍 Red Bank, Tennessee
            </span>
            <span className="flex items-center">
              💰 Gaming from $8/hour
            </span>
            <span className="flex items-center">
              🎮 RTX 40-Series Hardware
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Link href="/gaming-stations">
            <Button className="cyber-button text-lg px-8 py-4 w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              Start Gaming Now
            </Button>
          </Link>
          <Link href="/vr-experiences">
            <Button 
              variant="outline" 
              className="cyber-border text-green-400 hover:bg-green-500/10 text-lg px-8 py-4 w-full sm:w-auto"
            >
              <Headset className="w-5 h-5 mr-2" />
              Explore VR Worlds
            </Button>
          </Link>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Gamepad2, label: 'Premium Gaming', value: '50+' },
            { icon: Headset, label: 'VR Experiences', value: '25+' },
            { icon: Play, label: 'Streaming Studios', value: '10+' },
            { icon: Zap, label: 'Server Uptime', value: '99.9%' }
          ].map((feature, index) => (
            <div key={feature.label} className="cyber-card p-6 text-center">
              <feature.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="data-display text-sm mb-2">{feature.value}</div>
              <p className="text-gray-400 text-sm">{feature.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
