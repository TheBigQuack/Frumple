
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Server, Shield, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

export default function HostingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Server className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Server Hosting
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Reliable, high-performance game server hosting for communities and tournaments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Shield className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle className="text-white">Basic Server</CardTitle>
                <CardDescription>2 vCPU, 4GB RAM, 50GB SSD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$15/month</div>
                <p className="text-gray-400">Perfect for small communities</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Premium Server</CardTitle>
                <CardDescription>4 vCPU, 8GB RAM, 100GB SSD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$35/month</div>
                <p className="text-gray-400">Ideal for competitive gaming</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Globe className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-white">Enterprise Server</CardTitle>
                <CardDescription>8 vCPU, 16GB RAM, 250GB SSD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$75/month</div>
                <p className="text-gray-400">For large tournaments and organizations</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 mr-4">
                Start Subscription
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
