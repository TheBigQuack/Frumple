
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Gamepad2, Headphones, Video, Server, Coffee } from 'lucide-react'
import { GamingBooking } from './gaming-booking'
import { VrBooking } from './vr-booking'
import { StreamingBooking } from './streaming-booking'
import { ServerBooking } from './server-booking'
import { FoodBooking } from './food-booking'

const services = [
  {
    id: 'gaming',
    title: 'Gaming Stations',
    icon: Gamepad2,
    description: 'Premium gaming PCs with RTX 4090 and high-refresh monitors',
    color: 'blue'
  },
  {
    id: 'vr',
    title: 'VR Experiences',
    icon: Headphones,
    description: 'Immersive virtual reality with room-scale tracking',
    color: 'purple'
  },
  {
    id: 'streaming',
    title: 'Streaming Studios',
    icon: Video,
    description: 'Professional content creation with 4K equipment',
    color: 'green'
  },
  {
    id: 'server',
    title: 'Server Hosting',
    icon: Server,
    description: 'Reliable game server hosting for communities',
    color: 'orange'
  },
  {
    id: 'food',
    title: 'Food & Beverage',
    icon: Coffee,
    description: 'Gaming-optimized menu with station delivery',
    color: 'red'
  }
]

export function BookingInterface() {
  const [selectedService, setSelectedService] = useState('gaming')

  const renderBookingComponent = () => {
    switch (selectedService) {
      case 'gaming':
        return <GamingBooking />
      case 'vr':
        return <VrBooking />
      case 'streaming':
        return <StreamingBooking />
      case 'server':
        return <ServerBooking />
      case 'food':
        return <FoodBooking />
      default:
        return <GamingBooking />
    }
  }

  return (
    <div className="space-y-8">
      <Tabs value={selectedService} onValueChange={setSelectedService} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 h-auto p-2 bg-gray-900">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="flex flex-col items-center space-y-2 p-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{service.title}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {services.map((service) => (
          <TabsContent key={service.id} value={service.id} className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <service.icon className="h-6 w-6 text-blue-500" />
                  <span>{service.title}</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderBookingComponent()}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
