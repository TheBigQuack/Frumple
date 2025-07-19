
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, CreditCard, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-gray-400">
              Manage your bookings, subscriptions, and account settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3</div>
                <p className="text-xs text-gray-500">Upcoming sessions</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Hours Played</CardTitle>
                <Clock className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">24.5</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Spent</CardTitle>
                <CreditCard className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$347</div>
                <p className="text-xs text-gray-500">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Membership</CardTitle>
                <User className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Premium</div>
                <p className="text-xs text-gray-500">40% discount</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Bookings</CardTitle>
                <CardDescription className="text-gray-400">Your latest gaming sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Elite Gaming Station</div>
                      <div className="text-gray-400 text-sm">Tomorrow, 7:00 PM - 10:00 PM</div>
                    </div>
                    <div className="text-green-400 text-sm">Confirmed</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">VR Group Experience</div>
                      <div className="text-gray-400 text-sm">Dec 15, 2:00 PM - 3:00 PM</div>
                    </div>
                    <div className="text-blue-400 text-sm">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-400">Commonly used features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/booking">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Make New Booking
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                  View Order History
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                  Manage Subscriptions
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
