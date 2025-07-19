
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, Camera, Mic, Settings } from 'lucide-react'
import Link from 'next/link'

export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Video className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Streaming Studios
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional content creation studios with broadcast-quality equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Camera className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle className="text-white">Basic Studio</CardTitle>
                <CardDescription>Single camera with basic lighting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$50/hour</div>
                <p className="text-gray-400">Perfect for starting content creators</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Mic className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Professional Studio</CardTitle>
                <CardDescription>Multi-camera with advanced lighting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$75/hour</div>
                <p className="text-gray-400">Professional streaming setup</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Settings className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-white">Premium Studio</CardTitle>
                <CardDescription>Full production suite</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$100/hour</div>
                <p className="text-gray-400">Broadcast-quality production</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 mr-4">
                Book Studio Time
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
