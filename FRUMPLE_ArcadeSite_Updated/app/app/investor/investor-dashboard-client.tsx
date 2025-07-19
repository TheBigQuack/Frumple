
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Gamepad2,
  Video,
  Headset,
  Server,
  Coffee,
  Building2,
  Banknote,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { TennesseeBusinessInfo } from '@/components/tennessee-business-info'

// Dynamic import for charts
const RevenueChart = dynamic(() => import('./components/revenue-chart'), {
  ssr: false,
  loading: () => <div className="h-64 cyber-card flex items-center justify-center">Loading chart...</div>
})

const ROIChart = dynamic(() => import('./components/roi-chart'), {
  ssr: false,
  loading: () => <div className="h-64 cyber-card flex items-center justify-center">Loading chart...</div>
})

const RevenueBreakdownChart = dynamic(() => import('./components/revenue-breakdown-chart'), {
  ssr: false,
  loading: () => <div className="h-64 cyber-card flex items-center justify-center">Loading chart...</div>
})

export function InvestorDashboardClient() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (status === 'loading' || !mounted) {
    return (
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="cyber-card p-8 text-center">
            <div className="loading-scan aspect-video rounded-lg mb-4" />
            <p className="text-gray-400">Loading investor dashboard...</p>
          </div>
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'investor') {
    return (
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="cyber-card p-8">
            <h1 className="text-2xl font-orbitron mb-4 gradient-text">Access Denied</h1>
            <p className="text-gray-400 mb-6">This portal is restricted to verified investors only.</p>
            <Link href="/auth/signin">
              <Button className="cyber-button">Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Key business metrics (Red Bank, TN market adjusted)
  const keyMetrics = [
    { 
      title: 'Total Investment', 
      value: '$500,000', 
      change: '+0%', 
      icon: Banknote, 
      color: 'text-cyan-400',
      bgColor: 'from-cyan-400/20 to-cyan-600/20'
    },
    { 
      title: 'Projected Year 1 Revenue', 
      value: '$720,000', 
      change: '+$720K', 
      icon: TrendingUp, 
      color: 'text-green-400',
      bgColor: 'from-green-400/20 to-green-600/20'
    },
    { 
      title: 'Break-even Timeline', 
      value: 'Month 15', 
      change: 'On Track', 
      icon: Calendar, 
      color: 'text-purple-400',
      bgColor: 'from-purple-400/20 to-purple-600/20'
    },
    { 
      title: 'Projected ROI', 
      value: '185%', 
      change: '+185%', 
      icon: Target, 
      color: 'text-yellow-400',
      bgColor: 'from-yellow-400/20 to-yellow-600/20'
    }
  ]

  const revenueStreams = [
    { 
      name: 'PC Gaming Stations', 
      monthlyProjected: 240000,
      yearlyProjected: 288000,
      icon: Gamepad2, 
      color: 'text-green-400',
      description: '50 gaming stations @ $8-12/hour (Red Bank market)'
    },
    { 
      name: 'VR Experience Center', 
      monthlyProjected: 120000,
      yearlyProjected: 144000,
      icon: Headset, 
      color: 'text-purple-400',
      description: '8 VR pods @ $20-30/session (Red Bank market)'
    },
    { 
      name: 'Streaming Studios', 
      monthlyProjected: 90000,
      yearlyProjected: 108000,
      icon: Video, 
      color: 'text-pink-400',
      description: '6 professional streaming setups'
    },
    { 
      name: 'Server Hosting', 
      monthlyProjected: 120000,
      yearlyProjected: 144000,
      icon: Server, 
      color: 'text-blue-400',
      description: 'Proxmox virtualization hosting services'
    },
    { 
      name: 'Food & Beverages', 
      monthlyProjected: 30000,
      yearlyProjected: 36000,
      icon: Coffee, 
      color: 'text-orange-400',
      description: 'Integrated F&B service with gaming-focused menu'
    }
  ]

  const milestones = [
    { quarter: 'Q1 2025', status: 'completed', milestone: 'Venue Setup & Equipment Installation' },
    { quarter: 'Q2 2025', status: 'in-progress', milestone: 'Grand Opening & Marketing Launch' },
    { quarter: 'Q3 2025', status: 'upcoming', milestone: 'Break-even Achievement Target' },
    { quarter: 'Q4 2025', status: 'upcoming', milestone: 'Expansion Planning Phase' }
  ]

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-2 gradient-text">
                Investor Portal
              </h1>
              <p className="text-gray-400 text-lg">
                Welcome, {session?.user?.firstName || session?.user?.name || 'Investor'} - FRUMPLE Elite Gaming Hub Financial Overview
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-cyan-400" />
              <span className="text-cyan-400 font-orbitron font-bold">CONFIDENTIAL</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <Card key={metric.title} className="cyber-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.bgColor} flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  {metric.change.includes('+') ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
                <div className="data-display text-2xl font-bold mb-1 text-white">
                  {metric.value}
                </div>
                <p className="text-gray-400 text-sm mb-2">{metric.title}</p>
                <p className={`text-xs ${metric.change.includes('+') ? 'text-green-400' : 'text-yellow-400'}`}>
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 cyber-border bg-black/50">
            <TabsTrigger value="overview" className="text-gray-400 data-[state=active]:text-green-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="text-gray-400 data-[state=active]:text-green-400">
              Revenue Streams
            </TabsTrigger>
            <TabsTrigger value="projections" className="text-gray-400 data-[state=active]:text-green-400">
              Financial Projections
            </TabsTrigger>
            <TabsTrigger value="market" className="text-gray-400 data-[state=active]:text-green-400">
              Market Analysis
            </TabsTrigger>
            <TabsTrigger value="milestones" className="text-gray-400 data-[state=active]:text-green-400">
              Milestones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg font-orbitron text-white flex items-center">
                    <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
                    Projected Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              {/* ROI Chart */}
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg font-orbitron text-white flex items-center">
                    <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                    ROI Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ROIChart />
                </CardContent>
              </Card>
            </div>

            {/* Business Model Summary */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-white">Business Model Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="data-display text-xl font-bold text-white mb-2">5,000+</div>
                    <p className="text-gray-400 text-sm">Expected Monthly Active Users</p>
                  </div>
                  <div className="text-center">
                    <Building2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="data-display text-xl font-bold text-white mb-2">15,000</div>
                    <p className="text-gray-400 text-sm">Total Venue Square Feet</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <div className="data-display text-xl font-bold text-white mb-2">85%</div>
                    <p className="text-gray-400 text-sm">Target Utilization Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Breakdown Chart */}
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg font-orbitron text-white flex items-center">
                    <PieChart className="w-5 h-5 text-green-400 mr-2" />
                    Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueBreakdownChart />
                </CardContent>
              </Card>

              {/* Revenue Streams Detail */}
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg font-orbitron text-white">Revenue Streams Detail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueStreams.map((stream, index) => (
                      <div key={stream.name} className="border-l-2 border-green-500/30 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <stream.icon className={`w-4 h-4 ${stream.color} mr-2`} />
                            <span className="font-medium text-white">{stream.name}</span>
                          </div>
                          <span className="data-display text-green-400">
                            ${(stream.yearlyProjected / 100).toLocaleString()}/year
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs">{stream.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg font-orbitron text-white">Financial Projections - Year 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Investment</span>
                      <span className="data-display text-white">$500,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Projected Revenue</span>
                      <span className="data-display text-green-400">$720,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Projected Expenses</span>
                      <span className="data-display text-red-400">$485,000</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">Net Profit (Year 1)</span>
                      <span className="data-display text-green-400 text-lg">$235,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium">ROI (3 Years)</span>
                      <span className="data-display text-purple-400 text-lg">185%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg font-orbitron text-white">Investment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Gaming Equipment</span>
                      <span className="data-display text-white">$250,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">VR Setup & Hardware</span>
                      <span className="data-display text-white">$75,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Streaming Infrastructure</span>
                      <span className="data-display text-white">$45,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Server & Network</span>
                      <span className="data-display text-white">$60,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Facility & Renovation</span>
                      <span className="data-display text-white">$45,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Working Capital</span>
                      <span className="data-display text-white">$25,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <TennesseeBusinessInfo />
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-white">Business Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.quarter} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-4 ${
                        milestone.status === 'completed' ? 'bg-green-400' :
                        milestone.status === 'in-progress' ? 'bg-yellow-400' :
                        'bg-gray-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">{milestone.milestone}</span>
                          <span className="text-sm text-gray-400">{milestone.quarter}</span>
                        </div>
                        <p className={`text-xs mt-1 ${
                          milestone.status === 'completed' ? 'text-green-400' :
                          milestone.status === 'in-progress' ? 'text-yellow-400' :
                          'text-gray-500'
                        }`}>
                          {milestone.status === 'completed' ? 'Completed' :
                           milestone.status === 'in-progress' ? 'In Progress' :
                           'Upcoming'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
