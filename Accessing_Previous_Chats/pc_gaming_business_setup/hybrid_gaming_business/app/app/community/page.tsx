
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, MessageCircle, Trophy, Star } from 'lucide-react'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Users className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Gaming Community
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect with fellow gamers, join teams, and be part of our vibrant gaming community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Discord Server</CardTitle>
                <CardDescription>Join our active Discord community</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Chat with other gamers, find teammates, and stay updated on events.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                <CardTitle className="text-white">Leaderboards</CardTitle>
                <CardDescription>Compete for the top spots</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Track your progress and compete with other players across all games.</p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  View Rankings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Star className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-white">Loyalty Program</CardTitle>
                <CardDescription>Earn rewards for playing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Accumulate points and unlock exclusive perks and discounts.</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>What's happening in our community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="text-white text-sm">New tournament starting this weekend</div>
                    <div className="text-gray-400 text-xs">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-white text-sm">Gaming marathon event next month</div>
                    <div className="text-gray-400 text-xs">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <div className="text-white text-sm">New VR games added to catalog</div>
                    <div className="text-gray-400 text-xs">3 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Community Stats</CardTitle>
                <CardDescription>Our growing community by the numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2,847</div>
                  <div className="text-gray-400">Active Members</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">156</div>
                    <div className="text-gray-400 text-sm">Tournaments Held</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">89</div>
                    <div className="text-gray-400 text-sm">Teams Formed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to join our community?</h2>
            <p className="text-gray-400 mb-6">Sign up today and become part of the GameHub Elite family</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
