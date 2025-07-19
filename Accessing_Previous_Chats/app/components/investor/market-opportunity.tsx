
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const marketData = [
  { name: 'Gaming Server Hosting', size: 5.8, growth: '15.2%', color: '#3B82F6' },
  { name: 'Esports Market', size: 1.9, growth: '21.8%', color: '#8B5CF6' },
  { name: 'VR Gaming', size: 39.7, growth: '33.0%', color: '#10B981' },
  { name: 'Content Creation', size: 32.3, growth: '13.9%', color: '#F59E0B' },
  { name: 'Gaming Cafes', size: 1.5, growth: '10.5%', color: '#EF4444' }
]

const revenueProjection = [
  { year: 'Year 1', gaming: 499, vr: 249, streaming: 187, hosting: 125, food: 187 },
  { year: 'Year 2', gaming: 649, vr: 324, streaming: 243, hosting: 162, food: 243 },
  { year: 'Year 3', gaming: 844, vr: 422, streaming: 316, hosting: 211, food: 316 },
  { year: 'Year 4', gaming: 1097, vr: 549, streaming: 411, hosting: 274, food: 411 },
  { year: 'Year 5', gaming: 1426, vr: 713, streaming: 535, hosting: 356, food: 535 }
]

export function MarketOpportunity() {
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
            Massive Market Opportunity
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our hybrid model targets five rapidly growing segments within the $184B global gaming industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Market Size Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white">Market Size & Growth Rates</CardTitle>
                <CardDescription className="text-gray-400">
                  Total addressable market across our five business segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#9CA3AF"
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={11}
                        label={{ value: 'Market Size ($B)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: 11
                        }}
                        formatter={(value: any, name: string) => [`$${value}B`, 'Market Size']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar 
                        dataKey="size" 
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {marketData.map((item) => (
                    <div key={item.name} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.name}:</span>
                      <span className="text-white">{item.growth} CAGR</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Revenue Projection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white">5-Year Revenue Projection</CardTitle>
                <CardDescription className="text-gray-400">
                  Projected revenue growth across all business segments (in thousands)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueProjection}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#9CA3AF"
                        fontSize={11}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={11}
                        label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: 11
                        }}
                        formatter={(value: any, name: string) => [`$${value}K`, name]}
                      />
                      <Bar dataKey="gaming" stackId="a" fill="#60B5FF" />
                      <Bar dataKey="vr" stackId="a" fill="#FF9149" />
                      <Bar dataKey="streaming" stackId="a" fill="#FF9898" />
                      <Bar dataKey="hosting" stackId="a" fill="#FF90BB" />
                      <Bar dataKey="food" stackId="a" fill="#80D8C3" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center"><div className="w-3 h-3 bg-[#60B5FF] rounded mr-2"></div>Gaming</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-[#FF9149] rounded mr-2"></div>VR</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-[#FF9898] rounded mr-2"></div>Streaming</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-[#FF90BB] rounded mr-2"></div>Hosting</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Market Statistics */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gray-900/30 border-gray-700 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-400">$184B</CardTitle>
              <CardDescription>Global Gaming Market Size</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                The gaming industry continues to outpace traditional entertainment sectors
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-700 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-400">2.8B</CardTitle>
              <CardDescription>Global Gamers Worldwide</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Growing demographics across all age groups and regions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-700 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-400">21.8%</CardTitle>
              <CardDescription>Esports Market CAGR</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Fastest growing segment in entertainment industry
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
