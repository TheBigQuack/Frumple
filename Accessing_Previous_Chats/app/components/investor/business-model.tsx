
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Gamepad2, Headphones, Video, Server, Coffee, Users, TrendingUp, Zap } from 'lucide-react'

const businessSegments = [
  {
    icon: Gamepad2,
    title: 'Gaming Stations',
    revenue: '$499K',
    percentage: '40%',
    description: '50 premium gaming PCs with latest hardware',
    pricing: '$8-15/hour',
    color: 'blue'
  },
  {
    icon: Headphones,
    title: 'VR Experiences',
    revenue: '$249K',
    percentage: '20%',
    description: '8 VR stations with room-scale tracking',
    pricing: '$25-50/session',
    color: 'purple'
  },
  {
    icon: Video,
    title: 'Streaming Studios',
    revenue: '$187K',
    percentage: '15%',
    description: '4 professional content creation studios',
    pricing: '$50-100/hour',
    color: 'green'
  },
  {
    icon: Server,
    title: 'Server Hosting',
    revenue: '$125K',
    percentage: '10%',
    description: 'Reliable game server hosting services',
    pricing: '$15-75/month',
    color: 'orange'
  },
  {
    icon: Coffee,
    title: 'Food & Beverage',
    revenue: '$187K',
    percentage: '15%',
    description: 'Gaming-optimized cafe and delivery',
    pricing: '$3-18/item',
    color: 'red'
  }
]

const competitiveAdvantages = [
  {
    icon: Users,
    title: 'Community Ecosystem',
    description: 'Building loyal customer base through events, tournaments, and social experiences'
  },
  {
    icon: TrendingUp,
    title: 'Revenue Diversification',
    description: 'Multiple income streams reduce risk and increase stability'
  },
  {
    icon: Zap,
    title: 'Technology Leadership',
    description: 'Cutting-edge infrastructure and automated systems for operational efficiency'
  }
]

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
}

export function BusinessModel() {
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
            Proven Business Model
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Five integrated revenue streams creating a synergistic ecosystem with multiple competitive advantages
          </p>
        </motion.div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {businessSegments.map((segment, index) => {
            const Icon = segment.icon
            return (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}
              >
                <Card className="h-full bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses[segment.color as keyof typeof colorClasses]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">{segment.percentage}</Badge>
                        <div className="text-lg font-bold text-white">{segment.revenue}</div>
                        <div className="text-xs text-gray-400">Year 1 Revenue</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white">{segment.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {segment.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Pricing:</span>
                      <span className="text-sm font-semibold text-white">{segment.pricing}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Competitive Advantages */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Competitive Advantages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {competitiveAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-gray-900/30 border-gray-700 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{advantage.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400">
                        {advantage.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Business Model Summary */}
        <motion.div 
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">The Synergy Effect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Revenue Synergies</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Gaming tournaments drive server hosting demand</li>
                <li>• Content creators promote venue through streaming</li>
                <li>• VR experiences attract customers to other services</li>
                <li>• Food & beverage increases session duration</li>
                <li>• Cross-service packages maximize customer value</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-4">Operational Efficiencies</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Shared infrastructure reduces overhead costs</li>
                <li>• Automated systems optimize resource utilization</li>
                <li>• Community events drive organic marketing</li>
                <li>• Membership programs ensure recurring revenue</li>
                <li>• Scalable platform enables rapid expansion</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
