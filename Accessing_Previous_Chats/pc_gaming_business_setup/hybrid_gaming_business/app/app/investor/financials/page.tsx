
'use client'

import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react'

const revenueData = [
  { year: 'Year 1', gaming: 499, vr: 249, streaming: 187, hosting: 125, food: 187 },
  { year: 'Year 2', gaming: 649, vr: 324, streaming: 243, hosting: 162, food: 243 },
  { year: 'Year 3', gaming: 844, vr: 422, streaming: 316, hosting: 211, food: 316 },
  { year: 'Year 4', gaming: 1097, vr: 549, streaming: 411, hosting: 274, food: 411 },
  { year: 'Year 5', gaming: 1426, vr: 713, streaming: 535, hosting: 356, food: 535 }
]

const cashFlowData = [
  { month: 'M6', revenue: 99, expenses: 71, netCashFlow: 28 },
  { month: 'M12', revenue: 125, expenses: 71, netCashFlow: 54 },
  { month: 'M18', revenue: 142, expenses: 73, netCashFlow: 69 },
  { month: 'M24', revenue: 158, expenses: 76, netCashFlow: 82 },
  { month: 'M30', revenue: 176, expenses: 79, netCashFlow: 97 },
  { month: 'M36', revenue: 195, expenses: 82, netCashFlow: 113 }
]

const marketShareData = [
  { name: 'Gaming Stations', value: 40, color: '#60B5FF' },
  { name: 'VR Experiences', value: 20, color: '#FF9149' },
  { name: 'Streaming Studios', value: 15, color: '#FF9898' },
  { name: 'Food & Beverage', value: 15, color: '#80D8C3' },
  { name: 'Server Hosting', value: 10, color: '#FF90BB' }
]

export default function FinancialsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <TrendingUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Financial Dashboard
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Interactive financial projections and business metrics for GameHub Elite
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Initial Investment</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$875,000</div>
                <p className="text-xs text-gray-500 mt-1">One-time capital requirement</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Break-even Point</CardTitle>
                <Calendar className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">18 Months</div>
                <p className="text-xs text-gray-500 mt-1">Faster than industry average</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">5-Year ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">312%</div>
                <p className="text-xs text-gray-500 mt-1">Exceptional return potential</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Year 5 Revenue</CardTitle>
                <Target className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$3.57M</div>
                <p className="text-xs text-gray-500 mt-1">Conservative projection</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Revenue Projection */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">5-Year Revenue Projection</CardTitle>
                <CardDescription className="text-gray-400">
                  Revenue breakdown by business segment (in thousands)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
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
              </CardContent>
            </Card>

            {/* Cash Flow Analysis */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Cash Flow Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Monthly cash flow projections over 3 years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cashFlowData}>
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
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="netCashFlow" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Mix */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Mix by Service</CardTitle>
              <CardDescription className="text-gray-400">
                Projected revenue distribution across business segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          fontSize: 11
                        }}
                        formatter={(value: any) => [`${value}%`, 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {marketShareData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-3" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-white font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
