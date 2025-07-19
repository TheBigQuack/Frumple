
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Headphones, Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'

export default function VRPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Headphones className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              VR Experiences
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Step into virtual worlds with our cutting-edge VR technology and room-scale tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Clock className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-white">Solo Adventures</CardTitle>
                <CardDescription>30-60 minute immersive experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$25-40</div>
                <p className="text-gray-400">Perfect introduction to VR gaming</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Users className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle className="text-white">Group Experiences</CardTitle>
                <CardDescription>Multiplayer VR for up to 4 players</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$120</div>
                <p className="text-gray-400">Team adventures and competitions</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 mr-4">
                Book VR Experience
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
