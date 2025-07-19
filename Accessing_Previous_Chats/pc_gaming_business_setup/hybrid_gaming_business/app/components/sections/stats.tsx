
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Trophy, Clock } from 'lucide-react'

const stats = [
  {
    icon: TrendingUp,
    value: '$1.25M',
    label: 'Year 1 Revenue Target',
    description: 'Projected first-year revenue',
    color: 'blue'
  },
  {
    icon: Users,
    value: '34,200',
    label: 'Annual Customers',
    description: 'Expected customer visits',
    color: 'green'
  },
  {
    icon: Trophy,
    value: '312%',
    label: '5-Year ROI',
    description: 'Return on investment',
    color: 'purple'
  },
  {
    icon: Clock,
    value: '18',
    label: 'Break-even Month',
    description: 'Months to profitability',
    color: 'orange'
  }
]

const colorClasses = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400'
}

export function Stats() {
  return (
    <section className="py-24 bg-gray-900">
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
            Backed by comprehensive market research and financial projections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                  <div className="mb-4">
                    <Icon className={`h-12 w-12 mx-auto ${colorClasses[stat.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <motion.div 
                    className={`text-4xl md:text-5xl font-bold mb-2 ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
