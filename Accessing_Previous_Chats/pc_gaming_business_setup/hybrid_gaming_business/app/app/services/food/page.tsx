
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coffee, Utensils, Zap, Truck } from 'lucide-react'
import Link from 'next/link'

export default function FoodPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Coffee className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Food & Beverage
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Gaming-optimized menu with specialty drinks, snacks, and meals delivered to your station
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Coffee className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle className="text-white">Beverages</CardTitle>
                <CardDescription>Specialty coffee and energy drinks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$3-8</div>
                <p className="text-gray-400">High-caffeine gaming fuel</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Utensils className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle className="text-white">Food</CardTitle>
                <CardDescription>One-handed gaming meals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$8-18</div>
                <p className="text-gray-400">Designed for gaming sessions</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Snacks</CardTitle>
                <CardDescription>Energy-boosting treats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">$3-12</div>
                <p className="text-gray-400">Premium gaming snacks</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Truck className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-white">Delivery</CardTitle>
                <CardDescription>Direct to your station</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">Free</div>
                <p className="text-gray-400">No interruption to your game</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/booking">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 mr-4">
                Order Now
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
