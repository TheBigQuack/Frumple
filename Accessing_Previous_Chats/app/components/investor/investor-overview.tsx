
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Users, Zap } from 'lucide-react'

export function InvestorOverview() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Investment
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Opportunity
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              GameHub Elite represents a revolutionary opportunity in the rapidly expanding gaming and 
              entertainment industry, combining five high-growth sectors into one synergistic business model.
            </motion.p>
          </div>

          {/* Key Investment Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">312%</div>
              <div className="text-gray-300">5-Year ROI</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">18</div>
              <div className="text-gray-300">Months to Break-even</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">$45M</div>
              <div className="text-gray-300">Market Opportunity</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">$875K</div>
              <div className="text-gray-300">Initial Investment</div>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div 
            className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why GameHub Elite is a Compelling Investment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">Market Timing</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Gaming industry valued at $184B globally</li>
                  <li>• Esports growing at 21.8% CAGR</li>
                  <li>• VR market expanding at 33% CAGR</li>
                  <li>• Content creation economy booming</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-400">Competitive Advantage</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Only integrated 5-service model</li>
                  <li>• Premium technology infrastructure</li>
                  <li>• Multiple revenue streams</li>
                  <li>• Strong community focus</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
