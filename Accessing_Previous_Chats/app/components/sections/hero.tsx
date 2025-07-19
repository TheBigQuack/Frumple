
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-purple-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-green-400">THE FUTURE OF</span>
            <span className="block bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              HYBRID GAMING
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-green-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-purple-400">Neural-linked</span> gaming stations, 
            <span className="text-green-400"> quantum VR</span> experiences, 
            <span className="text-purple-400">holographic</span> streaming studios, 
            and <span className="text-green-400">quantum server</span> hosting - 
            the nexus of digital reality.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/booking">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-purple-600 hover:to-green-500 text-lg px-8 py-4 border border-green-400/50">
                <Calendar className="h-5 w-5 mr-2" />
                JACK IN NOW
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/services">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-purple-400/50 text-purple-400 hover:bg-purple-400/20 hover:text-green-400">
                <Play className="h-5 w-5 mr-2" />
                EXPLORE MATRIX
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-green-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center hover:scale-105 transition-transform p-4 rounded-lg bg-black/30 border border-green-400/20">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-green-300/70 text-sm uppercase tracking-wide">Neural Stations</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform p-4 rounded-lg bg-black/30 border border-purple-400/20">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">8</div>
              <div className="text-purple-300/70 text-sm uppercase tracking-wide">Quantum VR</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform p-4 rounded-lg bg-black/30 border border-green-400/20">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">4</div>
              <div className="text-green-300/70 text-sm uppercase tracking-wide">Holo Studios</div>
            </div>
            <div className="text-center hover:scale-105 transition-transform p-4 rounded-lg bg-black/30 border border-purple-400/20">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-purple-300/70 text-sm uppercase tracking-wide">Grid Hosting</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center shadow-lg shadow-green-400/50">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
