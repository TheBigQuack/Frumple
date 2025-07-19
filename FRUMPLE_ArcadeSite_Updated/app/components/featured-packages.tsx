
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react'
import Link from 'next/link'

const packages = [
  {
    id: 'casual-gamer',
    name: 'Casual Gamer',
    description: 'Perfect for weekend warriors and casual gaming sessions',
    price: 89,
    period: 'month',
    icon: Zap,
    color: 'from-green-400 to-emerald-600',
    popular: false,
    features: [
      '20 Hours Gaming Station Access',
      '2 VR Experience Sessions',
      'Basic F&B Credits ($25)',
      'Community Discord Access',
      'Weekend Tournament Entry'
    ]
  },
  {
    id: 'pro-gamer',
    name: 'Pro Gamer',
    description: 'Ideal for serious gamers and content creators',
    price: 199,
    period: 'month',
    icon: Star,
    color: 'from-purple-400 to-violet-600',
    popular: true,
    features: [
      '60 Hours Gaming Station Access',
      '8 VR Experience Sessions',
      '4 Hours Streaming Studio',
      'Premium F&B Credits ($75)',
      'Priority Booking',
      'All Tournament Access',
      'Monthly 1-on-1 Coaching'
    ]
  },
  {
    id: 'elite-gamer',
    name: 'Elite Gamer',
    description: 'Ultimate package for professional esports teams',
    price: 499,
    period: 'month',
    icon: Crown,
    color: 'from-yellow-400 to-orange-600',
    popular: false,
    features: [
      'Unlimited Gaming Station Access',
      'Unlimited VR Sessions',
      '20 Hours Streaming Studio',
      'Premium F&B Credits ($200)',
      'Private Tournament Hosting',
      'Team Training Sessions',
      'Dedicated Account Manager',
      'Custom Branding Options'
    ]
  }
]

export function FeaturedPackages() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Gaming Packages
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect package that matches your gaming intensity and unlock exclusive benefits
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon
            return (
              <Card 
                key={pkg.id}
                className={`cyber-card relative overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Rocket className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-2xl font-orbitron text-white mb-2">
                    {pkg.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    {pkg.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold font-orbitron gradient-text">
                        ${pkg.price}
                      </span>
                      <span className="text-gray-400 ml-2">/{pkg.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href="/auth/signup">
                    <Button 
                      className={`w-full ${
                        pkg.popular 
                          ? 'cyber-button' 
                          : 'cyber-border text-green-400 hover:bg-green-500/10'
                      }`}
                    >
                      {pkg.popular ? 'Start Pro Gaming' : 'Get Started'}
                    </Button>
                  </Link>
                </CardContent>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-5 pointer-events-none`} />
              </Card>
            )
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="holographic rounded-lg p-8 max-w-2xl mx-auto">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-orbitron mb-4">
              Enterprise Solutions
            </h3>
            <p className="text-gray-400 mb-6">
              Custom packages for gaming cafes, esports organizations, and corporate events
            </p>
            <Link href="/contact">
              <Button variant="outline" className="cyber-border text-yellow-400 hover:bg-yellow-500/10">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
