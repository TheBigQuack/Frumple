
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gamepad2, Headphones, Video, Server, Coffee } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/layout/footer'

const services = [
  {
    id: 'gaming',
    icon: Gamepad2,
    title: 'Gaming Stations',
    description: 'Premium gaming PCs with RTX 4090, i9-14900K, and 4K monitors for the ultimate gaming experience.',
    features: ['50 High-end stations', 'Latest hardware', 'All popular games', 'Tournament ready'],
    price: 'From $8/hour',
    href: '/services/gaming'
  },
  {
    id: 'vr',
    icon: Headphones,
    title: 'VR Experiences',
    description: 'Immerse yourself in cutting-edge virtual reality with room-scale tracking and premium headsets.',
    features: ['8 VR stations', 'Room-scale tracking', 'Latest games', 'Group experiences'],
    price: 'From $25/session',
    href: '/services/vr'
  },
  {
    id: 'streaming',
    icon: Video,
    title: 'Streaming Studios',
    description: 'Professional-grade streaming and content creation studios with 4K cameras and lighting.',
    features: ['4 Professional studios', '4K equipment', 'Technical support', 'Live streaming'],
    price: 'From $50/hour',
    href: '/services/streaming'
  },
  {
    id: 'hosting',
    icon: Server,
    title: 'Server Hosting',
    description: 'Reliable game server hosting with low latency and high performance for communities.',
    features: ['24/7 uptime', 'Global locations', 'Custom configs', 'DDoS protection'],
    price: 'From $15/month',
    href: '/services/hosting'
  },
  {
    id: 'food',
    icon: Coffee,
    title: 'Food & Beverage',
    description: 'Gaming-optimized menu with specialty drinks, snacks, and meals delivered to your station.',
    features: ['Specialty coffee', 'Gaming snacks', 'Station delivery', 'Healthy options'],
    price: 'From $3/item',
    href: '/services/food'
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover our comprehensive range of premium gaming and entertainment services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">{service.price}</span>
                        <Link href={service.href}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/booking">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Book Your Experience Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
