
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Headphones, Video, Server, Coffee } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Gamepad2,
    title: 'Gaming Stations',
    description: 'Premium gaming PCs with RTX 4090, i9-14900K, and 4K monitors for the ultimate gaming experience.',
    features: ['50 High-end stations', 'Latest hardware', 'All popular games', 'Tournament ready'],
    price: 'From $8/hour',
    color: 'blue',
    href: '/services/gaming'
  },
  {
    icon: Headphones,
    title: 'VR Experiences',
    description: 'Immerse yourself in cutting-edge virtual reality with room-scale tracking and premium headsets.',
    features: ['8 VR stations', 'Room-scale tracking', 'Latest games', 'Group experiences'],
    price: 'From $25/session',
    color: 'purple',
    href: '/services/vr'
  },
  {
    icon: Video,
    title: 'Streaming Studios',
    description: 'Professional-grade streaming and content creation studios with 4K cameras and lighting.',
    features: ['4 Professional studios', '4K equipment', 'Technical support', 'Live streaming'],
    price: 'From $50/hour',
    color: 'green',
    href: '/services/streaming'
  },
  {
    icon: Server,
    title: 'Server Hosting',
    description: 'Reliable game server hosting with low latency and high performance for communities.',
    features: ['24/7 uptime', 'Global locations', 'Custom configs', 'DDoS protection'],
    price: 'From $15/month',
    color: 'orange',
    href: '/services/hosting'
  },
  {
    icon: Coffee,
    title: 'Food & Beverage',
    description: 'Gaming-optimized menu with specialty drinks, snacks, and meals delivered to your station.',
    features: ['Specialty coffee', 'Gaming snacks', 'Station delivery', 'Healthy options'],
    price: 'From $3/item',
    color: 'red',
    href: '/services/food'
  },
]

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
}

export function Services() {
  return (
    <section className="py-24 bg-gray-950" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Five Services, One Destination
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of gaming and entertainment with our comprehensive suite of premium services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
              >
                <Card className="h-full bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses[service.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">{service.price}</span>
                        <Link href={service.href}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/booking">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Book Your Experience Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
