
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react'

const cashFlowData = [
  { month: 'M1', revenue: 52, expenses: 78, netCashFlow: -26, cumulative: -26 },
  { month: 'M2', revenue: 68, expenses: 75, netCashFlow: -7, cumulative: -33 },
  { month: 'M3', revenue: 85, expenses: 74, netCashFlow: 11, cumulative: -22 },
  { month: 'M6', revenue: 99, expenses: 71, netCashFlow: 28, cumulative: 46 },
  { month: 'M12', revenue: 125, expenses: 71, netCashFlow: 54, cumulative: 392 },
  { month: 'M18', revenue: 142, expenses: 73, netCashFlow: 69, cumulative: 658 },
  { month: 'M24', revenue: 158, expenses: 76, netCashFlow: 82, cumulative: 982 }
]

const roiData = [
  { year: 'Year 1', investment: 875, revenue: 1248, profit: 392, roi: 45 },
  { year: 'Year 2', investment: 875, revenue: 1622, profit: 712, roi: 81 },
  { year: 'Year 3', investment: 875, revenue: 2109, profit: 1139, roi: 130 },
  { year: 'Year 4', investment: 875, revenue: 2742, profit: 1702, roi: 194 },
  { year: 'Year 5', investment: 875, revenue: 3565, profit: 2447, roi: 280 }
]

export function FinancialHighlights() {
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
            Financial Projections
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive financial analysis based on extensive market research and conservative estimates
          </p>
        </motion.div>

        {/* Key Financial Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Initial Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$875,000</div>
              <p className="text-xs text-gray-500 mt-1">One-time capital requirement</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Break-even Point</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">18 Months</div>
              <p className="text-xs text-gray-500 mt-1">Faster than industry average</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">5-Year ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">312%</div>
              <p className="text-xs text-gray-500 mt-1">Exceptional return potential</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Year 5 Revenue</CardTitle>
              <Target className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$3.57M</div>
              <p className="text-xs text-gray-500 mt-1">Conservative projection</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cash Flow Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white">Monthly Cash Flow Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Revenue, expenses, and cumulative cash flow over first 24 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#9CA3AF"
                        fontSize={11}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={11}
                        label={{ value: 'Amount ($K)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
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
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stackId="1" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stackId="2" 
                        stroke="#EF4444" 
                        fill="#EF4444" 
                        fillOpacity={0.3}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cumulative" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                  <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div>Revenue</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-2"></div>Expenses</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>Cumulative</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ROI Projection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white">Return on Investment</CardTitle>
                <CardDescription className="text-gray-400">
                  Projected ROI growth over 5-year period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roiData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#9CA3AF"
                        fontSize={11}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        fontSize={11}
                        label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: 11
                        }}
                        formatter={(value: any, name: string) => {
                          if (name === 'roi') return [`${value}%`, 'ROI']
                          return [`$${value}K`, name]
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="roi" 
                        stroke="#8B5CF6" 
                        strokeWidth={4}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {roiData.map((item) => (
                    <div key={item.year} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.year}:</span>
                      <div className="space-x-4">
                        <span className="text-white">${item.revenue}K Rev</span>
                        <span className="text-purple-400">{item.roi}% ROI</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Investment Summary */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">$875K</div>
              <div className="text-white font-semibold mb-1">Total Investment</div>
              <div className="text-sm text-gray-400">Technology, facility, working capital</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$1.85M</div>
              <div className="text-white font-semibold mb-1">Net Present Value</div>
              <div className="text-sm text-gray-400">5-year NPV at 10% discount rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$2.45M</div>
              <div className="text-white font-semibold mb-1">Year 5 Net Profit</div>
              <div className="text-sm text-gray-400">Annual profit by year 5</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
