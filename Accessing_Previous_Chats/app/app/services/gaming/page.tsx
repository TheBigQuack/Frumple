
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Monitor, Cpu, Zap } from 'lucide-react'
import Link from 'next/link'

export default function GamingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Gamepad2 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Gaming Stations
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience gaming at its finest with our premium gaming stations featuring the latest hardware
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Monitor className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Standard Stations</CardTitle>
                <CardDescription>RTX 4070, i7-13700K, 1440p Monitor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$8/hour</div>
                <p className="text-gray-400">Perfect for casual gaming and popular titles</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Cpu className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-white">Premium Stations</CardTitle>
                <CardDescription>RTX 4080, i9-14900K, 4K Monitor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$12/hour</div>
                <p className="text-gray-400">High-performance gaming with 4K visuals</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Zap className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle className="text-white">Elite Stations</CardTitle>
                <CardDescription>RTX 4090, i9-14900KS, Dual 4K Monitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$15/hour</div>
                <p className="text-gray-400">Ultimate gaming experience with flagship hardware</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 mr-4">
                Book Gaming Session
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
