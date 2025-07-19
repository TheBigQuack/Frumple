
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  Headset, 
  Video, 
  Calendar,
  Star,
  Clock,
  Trophy,
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  Target,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export function DashboardClient() {
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
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="cyber-card p-8">
            <h1 className="text-2xl font-orbitron mb-4 gradient-text">Access Denied</h1>
            <p className="text-gray-400 mb-6">Please sign in to access your dashboard</p>
            <Link href="/auth/signin">
              <Button className="cyber-button">Sign In</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Different content based on user role
  const isInvestor = session?.user?.role === 'investor'
  const isAdmin = session?.user?.role === 'admin'

  const quickActions = isInvestor ? [
    {
      title: 'Financial Overview',
      description: 'View detailed financial metrics',
      icon: DollarSign,
      href: '/investor',
      color: 'from-green-400 to-emerald-600'
    },
    {
      title: 'ROI Analysis',
      description: 'Track return on investment',
      icon: TrendingUp,
      href: '/investor',
      color: 'from-purple-400 to-violet-600'
    },
    {
      title: 'Business Metrics',
      description: 'Monitor key performance indicators',
      icon: BarChart3,
      href: '/investor',
      color: 'from-cyan-400 to-blue-600'
    }
  ] : [
    {
      title: 'Book Gaming Station',
      description: 'Reserve your favorite gaming setup',
      icon: Gamepad2,
      href: '/gaming-stations',
      color: 'from-green-400 to-emerald-600'
    },
    {
      title: 'VR Experience',
      description: 'Explore virtual worlds',
      icon: Headset,
      href: '/vr-experiences',
      color: 'from-purple-400 to-violet-600'
    },
    {
      title: 'Streaming Studio',
      description: 'Create professional content',
      icon: Video,
      href: '/streaming-studios',
      color: 'from-pink-400 to-rose-600'
    }
  ]

  const mockBookings = [
    {
      id: '1',
      type: 'Gaming Station',
      name: 'Phoenix Station',
      date: '2025-07-16',
      time: '14:00 - 16:00',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'VR Experience',
      name: 'Cyberpunk City 2099',
      date: '2025-07-18',
      time: '19:00 - 19:45',
      status: 'confirmed'
    }
  ]

  const mockStats = isInvestor ? [
    { label: 'Monthly Revenue', value: '$125K', icon: DollarSign, color: 'text-green-400' },
    { label: 'ROI Progress', value: '85%', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Active Users', value: '4,250', icon: Users, color: 'text-blue-400' },
    { label: 'Utilization', value: '87%', icon: Target, color: 'text-yellow-400' }
  ] : [
    { label: 'Gaming Hours', value: '127', icon: Clock, color: 'text-green-400' },
    { label: 'VR Sessions', value: '23', icon: Headset, color: 'text-purple-400' },
    { label: 'Streams Created', value: '8', icon: Video, color: 'text-pink-400' },
    { label: 'Tournaments Won', value: '3', icon: Trophy, color: 'text-yellow-400' }
  ]

  const recentActivity = isInvestor ? [
    {
      icon: 'green',
      title: 'Monthly revenue target exceeded',
      subtitle: 'Q2 Performance • 2 hours ago'
    },
    {
      icon: 'purple',
      title: 'New investor report generated',
      subtitle: 'Financial Analytics • 1 day ago'
    },
    {
      icon: 'blue',
      title: 'User growth milestone reached',
      subtitle: '5,000 Active Users • 3 days ago'
    }
  ] : [
    {
      icon: 'green',
      title: 'Completed 2-hour gaming session',
      subtitle: 'Phoenix Station • 2 hours ago'
    },
    {
      icon: 'purple',
      title: 'Finished VR Experience',
      subtitle: 'Medieval Quest • 1 day ago'
    },
    {
      icon: 'yellow',
      title: 'Won tournament match',
      subtitle: 'CS:GO Weekly • 3 days ago'
    }
  ]

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-2 gradient-text">
            Welcome back, {session?.user?.firstName || session?.user?.name || 'User'}!
          </h1>
          <p className="text-gray-400 text-lg">
            {isInvestor 
              ? 'Your investment dashboard - Track FRUMPLE\'s performance and returns'
              : 'Ready to level up your gaming experience?'
            }
          </p>
          {isInvestor && (
            <div className="mt-4 p-4 cyber-card bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-cyan-400 font-medium">Investor Status: </span>
                <span className="text-white ml-2">Verified • Full Access</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <Card key={stat.label} className="cyber-card">
              <CardContent className="p-6 text-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="data-display text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-orbitron mb-4 text-green-400">
              {isInvestor ? 'Investor Tools' : 'Quick Actions'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.href}>
                  <Card className="cyber-card h-full hover:scale-105 transition-transform cursor-pointer">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-black" />
                      </div>
                      <CardTitle className="text-lg font-orbitron text-white">
                        {action.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-center">
                      <p className="text-gray-400 text-sm">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-orbitron mb-4 text-green-400">Recent Activity</h2>
            <div className="cyber-card p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-4 ${
                      activity.icon === 'green' ? 'bg-green-400' :
                      activity.icon === 'purple' ? 'bg-purple-400' :
                      activity.icon === 'blue' ? 'bg-blue-400' :
                      'bg-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white">{activity.title}</p>
                      <p className="text-gray-400 text-sm">{activity.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {!isInvestor && (
              <>
                {/* Upcoming Bookings */}
                <h2 className="text-xl font-orbitron mb-4 text-green-400">Upcoming Bookings</h2>
                <div className="space-y-4 mb-8">
                  {mockBookings.map((booking) => (
                    <Card key={booking.id} className="cyber-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{booking.name}</h3>
                          <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded">
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{booking.type}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {booking.date} • {booking.time}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* Status Card */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-lg font-orbitron text-white flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  {isInvestor ? 'Investment Status' : 'Member Status'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="data-display text-lg font-bold text-purple-400 mb-2">
                    {isInvestor ? 'Premium Investor' : 'Pro Gamer'}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {isInvestor ? 'Full access granted' : 'Next tier: Elite Gamer'}
                  </p>
                  {!isInvestor && (
                    <>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-green-400 to-purple-600 h-2 rounded-full" style={{ width: '70%' }} />
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        70% progress to next tier
                      </p>
                    </>
                  )}
                  <Button className="w-full cyber-button" size="sm">
                    {isInvestor ? 'View Portfolio' : 'View Benefits'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
