
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Video, 
  Camera, 
  Mic,
  Monitor,
  Lightbulb,
  Wifi,
  Users,
  Clock,
  Star,
  Zap,
  Settings,
  Play
} from 'lucide-react'
import { BookingModal } from '@/components/booking-modal'

interface StreamingStudio {
  id: string
  name: string
  type: 'basic' | 'professional' | 'premium' | 'enterprise'
  status: 'available' | 'occupied' | 'maintenance'
  hourlyRate: number
  capacity: number
  equipment: {
    cameras: string[]
    microphones: string[]
    lighting: string[]
    streaming: string[]
    extras: string[]
  }
  features: string[]
  specifications: {
    resolution: string
    frameRate: string
    audio: string
    streaming: string[]
  }
  image: string
  popularFeatures?: string[]
}

const streamingStudios: StreamingStudio[] = [
  {
    id: 'studio-01',
    name: 'Phoenix Broadcast',
    type: 'enterprise',
    status: 'available',
    hourlyRate: 150,
    capacity: 8,
    equipment: {
      cameras: ['6x Sony FX6 4K Cinema', '2x PTZ Remote Cameras', 'Overhead Rig Cam'],
      microphones: ['Shure SM7B (4x)', 'Wireless Lapel Mics (8x)', 'Boom Mic Setup'],
      lighting: ['Professional LED Panel Array', 'RGB Accent Lighting', 'Green Screen Lighting'],
      streaming: ['Multi-Platform Streaming', 'OBS Studio Pro', 'Stream Deck XL'],
      extras: ['Teleprompter', 'Cue Monitor System', 'Professional Mixer Board']
    },
    features: ['4K Streaming', 'Multi-Camera Setup', 'Live Production', 'Green Screen', 'Professional Audio'],
    specifications: {
      resolution: '4K 60fps',
      frameRate: '60fps stable',
      audio: '48kHz Professional',
      streaming: ['Twitch', 'YouTube', 'Facebook', 'Custom RTMP']
    },
    image: 'https://i.ytimg.com/vi/dMKNJWHtgfg/maxresdefault.jpg',
    popularFeatures: ['Multi-Camera Direction', 'Live Graphics', 'Professional Mixing']
  },
  {
    id: 'studio-02',
    name: 'Cyber Content',
    type: 'professional',
    status: 'occupied',
    hourlyRate: 100,
    capacity: 4,
    equipment: {
      cameras: ['3x Sony A7S III', 'Webcam Backup', 'Action Cam Mount'],
      microphones: ['Audio-Technica AT2020 (2x)', 'Wireless Headset', 'Backup Lapel'],
      lighting: ['LED Ring Light', 'Softbox Kit', 'RGB Strip Lighting'],
      streaming: ['Dual PC Setup', 'OBS Studio', 'Stream Deck Mini'],
      extras: ['Adjustable Desk Setup', 'Multiple Monitor Array', 'Cable Management']
    },
    features: ['Professional Quality', 'Dual PC Setup', 'Custom Overlays', 'Flexible Layout'],
    specifications: {
      resolution: '1440p 60fps',
      frameRate: '60fps consistent',
      audio: '44.1kHz Studio',
      streaming: ['Twitch', 'YouTube', 'Discord']
    },
    image: 'https://i.imgur.com/8JUHMC8.jpg'
  },
  {
    id: 'studio-03',
    name: 'Neon Stream',
    type: 'basic',
    status: 'available',
    hourlyRate: 50,
    capacity: 2,
    equipment: {
      cameras: ['2x Logitech C920', 'Phone Mount'],
      microphones: ['Blue Yeti', 'Backup USB Mic'],
      lighting: ['Ring Light', 'Desk Lamp with Diffuser'],
      streaming: ['Single PC Setup', 'OBS Studio', 'Basic Stream Deck'],
      extras: ['Gaming Chair', 'Adjustable Monitor Arm', 'Basic Backdrop']
    },
    features: ['Starter Friendly', 'Easy Setup', 'Good Quality', 'Affordable'],
    specifications: {
      resolution: '1080p 30fps',
      frameRate: '30fps stable',
      audio: '44.1kHz Standard',
      streaming: ['Twitch', 'YouTube']
    },
    image: 'https://i.ytimg.com/vi/UrZZoDw9Yfg/maxresdefault.jpg'
  },
  {
    id: 'studio-04',
    name: 'Matrix Production',
    type: 'premium',
    status: 'available',
    hourlyRate: 125,
    capacity: 6,
    equipment: {
      cameras: ['4x Canon EOS R5', 'Gimbal Setup', 'Drone Integration'],
      microphones: ['Rode PodMic (4x)', 'Wireless System', 'Boom Operator Kit'],
      lighting: ['Professional Fresnel Kit', 'Color-Changing LEDs', 'Haze Machine'],
      streaming: ['Triple PC Setup', 'ATEM Mixer', 'Professional Stream Deck'],
      extras: ['Virtual Set Technology', 'Motion Graphics', 'Live Chat Integration']
    },
    features: ['Virtual Sets', 'Motion Graphics', 'Advanced Audio', 'Multi-Platform'],
    specifications: {
      resolution: '4K 30fps / 1440p 60fps',
      frameRate: 'Variable (optimized)',
      audio: '96kHz Professional',
      streaming: ['All Major Platforms', 'Custom Solutions']
    },
    image: 'https://i.ytimg.com/vi/EW-bSkyhQFg/maxresdefault.jpg'
  },
  {
    id: 'studio-05',
    name: 'Pulse Creator',
    type: 'professional',
    status: 'maintenance',
    hourlyRate: 90,
    capacity: 3,
    equipment: {
      cameras: ['2x Sony A7 IV', 'Action Cam Setup'],
      microphones: ['Electro-Voice RE20', 'Wireless Handheld'],
      lighting: ['Godox LED Panel Kit', 'RGB Background'],
      streaming: ['Dual PC Gaming Setup', 'Elgato Capture', 'Stream Deck Plus'],
      extras: ['Gaming Integration', 'Multi-Screen Display', 'Chat Bot Setup']
    },
    features: ['Gaming Focused', 'Chat Integration', 'Custom Alerts', 'Multi-Screen'],
    specifications: {
      resolution: '1440p 60fps',
      frameRate: '60fps for gaming',
      audio: '48kHz Gaming',
      streaming: ['Twitch', 'YouTube Gaming']
    },
    image: 'https://i.ytimg.com/vi/mnW-4_ioKj8/maxresdefault.jpg'
  }
]

const studioTypes = [
  { value: 'all', label: 'All Studios', count: streamingStudios.length },
  { value: 'basic', label: 'Basic', count: streamingStudios.filter(s => s.type === 'basic').length },
  { value: 'professional', label: 'Professional', count: streamingStudios.filter(s => s.type === 'professional').length },
  { value: 'premium', label: 'Premium', count: streamingStudios.filter(s => s.type === 'premium').length },
  { value: 'enterprise', label: 'Enterprise', count: streamingStudios.filter(s => s.type === 'enterprise').length }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'available': return 'text-green-400 bg-green-400/20'
    case 'occupied': return 'text-red-400 bg-red-400/20'
    case 'maintenance': return 'text-yellow-400 bg-yellow-400/20'
    default: return 'text-gray-400 bg-gray-400/20'
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'enterprise': return 'from-yellow-400 to-orange-600'
    case 'premium': return 'from-purple-400 to-violet-600'
    case 'professional': return 'from-blue-400 to-cyan-600'
    case 'basic': return 'from-green-400 to-emerald-600'
    default: return 'from-gray-400 to-gray-600'
  }
}

export function StreamingStudiosClient() {
  const [mounted, setMounted] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStudio, setSelectedStudio] = useState<StreamingStudio | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredStudios = selectedType === 'all' 
    ? streamingStudios 
    : streamingStudios.filter(studio => studio.type === selectedType)

  const handleBookStudio = (studio: StreamingStudio) => {
    setSelectedStudio(studio)
    setBookingModalOpen(true)
  }

  if (!mounted) return null

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Streaming Studios
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Professional streaming setups with multi-camera systems, professional lighting, and broadcast-quality equipment
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {studioTypes.map((type) => (
            <Button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              variant={selectedType === type.value ? "default" : "outline"}
              className={`${
                selectedType === type.value 
                  ? 'cyber-button' 
                  : 'cyber-border text-green-400 hover:bg-green-500/10'
              }`}
            >
              {type.label} ({type.count})
            </Button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="cyber-card p-4 text-center">
            <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">10+</div>
            <p className="text-gray-400 text-sm">Studios Available</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Camera className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">4K</div>
            <p className="text-gray-400 text-sm">Max Resolution</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Lightbulb className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">Pro</div>
            <p className="text-gray-400 text-sm">Lighting Setup</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Wifi className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">Multi</div>
            <p className="text-gray-400 text-sm">Platform Streaming</p>
          </div>
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudios.map((studio, index) => (
            <Card 
              key={studio.id} 
              className="cyber-card overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-orbitron text-white">
                    {studio.name}
                  </CardTitle>
                  <Badge className={`${getStatusColor(studio.status)} border-0`}>
                    {studio.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`bg-gradient-to-r ${getTypeColor(studio.type)} text-black border-0`}>
                    {studio.type.toUpperCase()}
                  </Badge>
                  <div className="text-right">
                    <div className="data-display text-lg font-bold">
                      ${studio.hourlyRate}/hr
                    </div>
                    <div className="text-xs text-gray-400">
                      Up to {studio.capacity} people
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Studio Image */}
                <div className="relative aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
                  <div className="absolute bottom-2 left-2">
                    <div className="flex items-center space-x-1">
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-cyan-400">{studio.specifications.resolution}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <div className={`w-3 h-3 rounded-full ${
                      studio.status === 'available' ? 'bg-green-400 pulse-neon' :
                      studio.status === 'occupied' ? 'bg-red-400' : 'bg-yellow-400'
                    }`} />
                  </div>
                </div>

                {/* Equipment Overview */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Camera className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-gray-300">{studio.equipment.cameras.length} Cameras</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mic className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">{studio.equipment.microphones.length} Mics</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Lightbulb className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-gray-300">{studio.equipment.lighting.length} Lights</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Settings className="w-4 h-4 text-cyan-400 mr-2" />
                      <span className="text-gray-300">{studio.equipment.extras.length} Extras</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {studio.features.slice(0, 4).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-purple-400/50 text-purple-400">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Popular Features */}
                {studio.popularFeatures && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-yellow-400">Popular Features</span>
                    </div>
                    <div className="space-y-1">
                      {studio.popularFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Zap className="w-3 h-3 text-green-400 mr-2" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Streaming Platforms */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Streaming Platforms:</p>
                  <div className="flex flex-wrap gap-1">
                    {studio.specifications.streaming.map((platform, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-green-400/50 text-green-400">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full cyber-button"
                  disabled={studio.status !== 'available'}
                  onClick={() => handleBookStudio(studio)}
                >
                  {studio.status === 'available' ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Book Studio
                    </>
                  ) : studio.status === 'occupied' ? 'Currently in Use' : 'Under Maintenance'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: 'Production Crew', desc: 'Professional camera operators and directors available' },
            { icon: Settings, title: 'Technical Support', desc: '24/7 technical assistance for all equipment' },
            { icon: Zap, title: 'Live Graphics', desc: 'Real-time graphics and overlay customization' },
            { icon: Monitor, title: 'Multi-Platform', desc: 'Simultaneous streaming to multiple platforms' }
          ].map((service, index) => (
            <div key={service.title} className="cyber-card p-6 text-center">
              <service.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        station={selectedStudio}
        type="streaming-studio"
      />
    </main>
  )
}
