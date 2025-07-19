
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Zap, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  if (!mounted) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className="holographic rounded-2xl p-12 text-center mb-16 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500" />
          </div>
          
          <div className="relative z-10">
            <Zap className="w-16 h-16 text-green-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6 gradient-text">
              Ready to Level Up?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the elite gaming community and experience next-generation gaming like never before. 
              Your epic adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button className="cyber-button text-lg px-8 py-4 w-full sm:w-auto">
                  Start Gaming Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/gaming-stations">
                <Button 
                  variant="outline" 
                  className="cyber-border text-green-400 hover:bg-green-500/10 text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Explore Stations
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="cyber-card p-8 max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold font-orbitron mb-4">
            Stay in the Game
          </h3>
          <p className="text-gray-400 mb-6">
            Get the latest updates on new games, tournaments, and exclusive member benefits
          </p>
          
          {subscribed ? (
            <div className="flex items-center justify-center text-green-400">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Thanks for subscribing! Check your email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="cyber-input flex-1"
              />
              <Button type="submit" className="cyber-button">
                Subscribe
              </Button>
            </form>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <div className="data-display text-2xl font-bold mb-2">24/7</div>
            <p className="text-gray-400 text-sm">Always Open</p>
          </div>
          <div>
            <div className="data-display text-2xl font-bold mb-2">50+</div>
            <p className="text-gray-400 text-sm">Gaming Stations</p>
          </div>
          <div>
            <div className="data-display text-2xl font-bold mb-2">99.9%</div>
            <p className="text-gray-400 text-sm">Uptime</p>
          </div>
          <div>
            <div className="data-display text-2xl font-bold mb-2">15K+</div>
            <p className="text-gray-400 text-sm">Satisfied Gamers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
