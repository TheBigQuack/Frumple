
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Shield, Headphones, Wifi, Clock, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Zap,
    title: 'Latest Hardware',
    description: 'RTX 4090 graphics cards, Intel i9 processors, and cutting-edge peripherals for unmatched performance.',
  },
  {
    icon: Shield,
    title: 'Secure Environment',
    description: '24/7 security monitoring, climate-controlled facilities, and premium insurance coverage.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated gaming technicians and content creation specialists available to assist you.',
  },
  {
    icon: Wifi,
    title: 'Ultra-Low Latency',
    description: 'Fiber internet with dedicated gaming traffic prioritization for competitive advantage.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 16 hours daily with extended hours for tournaments and special events.',
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'Comfortable seating, ambient lighting, and curated atmosphere for optimal gaming.',
  },
]

export function Features() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose GameHub Elite?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We've thought of everything to deliver the ultimate gaming and entertainment experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gray-900/30 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
