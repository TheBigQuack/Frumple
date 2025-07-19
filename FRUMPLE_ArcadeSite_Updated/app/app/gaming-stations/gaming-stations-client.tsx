
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Monitor, 
  Cpu, 
  HardDrive, 
  Clock,
  Users,
  Star,
  Wifi,
  Headphones,
  Keyboard,
  MousePointer
} from 'lucide-react'
import { BookingModal } from '@/components/booking-modal'

interface GamingStation {
  id: string
  name: string
  type: 'standard' | 'premium' | 'vip'
  status: 'available' | 'occupied' | 'maintenance'
  hourlyRate: number
  specs: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    monitor: string
    peripherals: string[]
  }
  features: string[]
  image: string
}

const gamingStations: GamingStation[] = [
  {
    id: 'station-01',
    name: 'Phoenix Station',
    type: 'vip',
    status: 'available',
    hourlyRate: 12, // Red Bank, TN market pricing
    specs: {
      cpu: 'Intel i9-13900K',
      gpu: 'RTX 4090 24GB',
      ram: '64GB DDR5',
      storage: '2TB NVMe SSD',
      monitor: '32" 4K 144Hz OLED',
      peripherals: ['Razer DeathAdder V3', 'Corsair K95 RGB', 'SteelSeries Arctis Pro']
    },
    features: ['4K Gaming', 'RGB Lighting', 'Private Booth', 'Premium Audio', 'Streaming Ready'],
    image: 'https://i.ytimg.com/vi/mFeMirdRFwA/maxresdefault.jpg'
  },
  {
    id: 'station-02',
    name: 'Cyber Station',
    type: 'premium',
    status: 'occupied',
    hourlyRate: 10, // Red Bank, TN market pricing
    specs: {
      cpu: 'AMD Ryzen 9 7900X',
      gpu: 'RTX 4080 16GB',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      monitor: '27" 1440p 165Hz',
      peripherals: ['Logitech G Pro X', 'Corsair K70', 'HyperX Cloud Alpha']
    },
    features: ['1440p Gaming', 'Competitive Setup', 'Tournament Grade', 'Low Latency'],
    image: 'https://image.benq.com/is/image/benqco/IK_banner_1280x720_2401?$ResponsivePreset$'
  },
  {
    id: 'station-03',
    name: 'Neon Station',
    type: 'standard',
    status: 'available',
    hourlyRate: 8, // Red Bank, TN market pricing
    specs: {
      cpu: 'Intel i7-12700K',
      gpu: 'RTX 4070 12GB',
      ram: '32GB DDR4',
      storage: '500GB NVMe SSD',
      monitor: '24" 1080p 144Hz',
      peripherals: ['Razer Viper', 'Logitech G413', 'Corsair HS60']
    },
    features: ['1080p Gaming', 'Solid Performance', 'Great Value', 'Popular Games'],
    image: 'https://i.ytimg.com/vi/qbBubK3AP5E/maxresdefault.jpg'
  },
  {
    id: 'station-04',
    name: 'Quantum Station',
    type: 'vip',
    status: 'available',
    hourlyRate: 12, // Red Bank, TN market pricing
    specs: {
      cpu: 'Intel i9-13900KS',
      gpu: 'RTX 4090 24GB',
      ram: '64GB DDR5',
      storage: '4TB NVMe SSD',
      monitor: '32" 4K 240Hz',
      peripherals: ['Finalmouse Starlight', 'Wooting 60HE', 'Audeze LCD-GX']
    },
    features: ['240Hz Gaming', 'Premium Peripherals', 'Content Creation', 'VIP Service'],
    image: 'https://i.ytimg.com/vi/CVjx9rT_oH0/maxresdefault.jpg'
  },
  {
    id: 'station-05',
    name: 'Matrix Station',
    type: 'premium',
    status: 'maintenance',
    hourlyRate: 10, // Red Bank, TN market pricing
    specs: {
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'RTX 4080 16GB',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
      monitor: '27" 1440p 240Hz',
      peripherals: ['Zowie EC3-C', 'Ducky One 3', 'Beyerdynamic DT 990']
    },
    features: ['High Refresh Rate', 'Competitive Gaming', 'Pro Peripherals', 'Stream Setup'],
    image: 'https://www.techspot.com/images2/news/bigimage/2024/06/2024-06-26-image-7.jpg'
  },
  {
    id: 'station-06',
    name: 'Pulse Station',
    type: 'standard',
    status: 'available',
    hourlyRate: 8, // Red Bank, TN market pricing
    specs: {
      cpu: 'AMD Ryzen 7 7700X',
      gpu: 'RTX 4060 Ti 16GB',
      ram: '16GB DDR5',
      storage: '1TB NVMe SSD',
      monitor: '24" 1080p 165Hz',
      peripherals: ['Corsair Harpoon', 'Redragon K552', 'HyperX Cloud Core']
    },
    features: ['Smooth Gaming', 'Entry Level Pro', 'Good Performance', 'Budget Friendly'],
    image: 'https://i.ytimg.com/vi/IWjTl4a4iww/maxresdefault.jpg'
  }
]

const stationTypes = [
  { value: 'all', label: 'All Stations', count: gamingStations.length },
  { value: 'standard', label: 'Standard', count: gamingStations.filter(s => s.type === 'standard').length },
  { value: 'premium', label: 'Premium', count: gamingStations.filter(s => s.type === 'premium').length },
  { value: 'vip', label: 'VIP', count: gamingStations.filter(s => s.type === 'vip').length }
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
    case 'vip': return 'from-yellow-400 to-orange-600'
    case 'premium': return 'from-purple-400 to-violet-600'
    case 'standard': return 'from-green-400 to-emerald-600'
    default: return 'from-gray-400 to-gray-600'
  }
}

export function GamingStationsClient() {
  const [mounted, setMounted] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStation, setSelectedStation] = useState<GamingStation | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredStations = selectedType === 'all' 
    ? gamingStations 
    : gamingStations.filter(station => station.type === selectedType)

  const handleBookStation = (station: GamingStation) => {
    setSelectedStation(station)
    setBookingModalOpen(true)
  }

  if (!mounted) return null

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Gaming Stations
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Premium PC gaming setups with the latest hardware, professional peripherals, and optimized performance
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {stationTypes.map((type) => (
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
            <Gamepad2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">50+</div>
            <p className="text-gray-400 text-sm">Total Stations</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Monitor className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">144Hz+</div>
            <p className="text-gray-400 text-sm">High Refresh</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Cpu className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">RTX 40</div>
            <p className="text-gray-400 text-sm">Latest GPUs</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">24/7</div>
            <p className="text-gray-400 text-sm">Always Open</p>
          </div>
        </div>

        {/* Gaming Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStations.map((station, index) => (
            <Card 
              key={station.id} 
              className="cyber-card overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-orbitron text-white">
                    {station.name}
                  </CardTitle>
                  <Badge className={`${getStatusColor(station.status)} border-0`}>
                    {station.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`bg-gradient-to-r ${getTypeColor(station.type)} text-black border-0`}>
                    {station.type.toUpperCase()}
                  </Badge>
                  <div className="text-right">
                    <div className="data-display text-lg font-bold">
                      ${station.hourlyRate}/hr
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Station Image */}
                <div className="relative aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20" />
                  <div className="absolute bottom-2 right-2">
                    <div className={`w-3 h-3 rounded-full ${
                      station.status === 'available' ? 'bg-green-400 pulse-neon' :
                      station.status === 'occupied' ? 'bg-red-400' : 'bg-yellow-400'
                    }`} />
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Cpu className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-gray-300">{station.specs.cpu}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Monitor className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-gray-300">{station.specs.gpu}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <HardDrive className="w-4 h-4 text-cyan-400 mr-2" />
                    <span className="text-gray-300">{station.specs.ram} • {station.specs.storage}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {station.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-green-400/50 text-green-400">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full cyber-button"
                  disabled={station.status !== 'available'}
                  onClick={() => handleBookStation(station)}
                >
                  {station.status === 'available' ? 'Book Now' : 
                   station.status === 'occupied' ? 'Currently Occupied' : 'Under Maintenance'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Wifi, title: 'Ultra-Fast Internet', desc: 'Gigabit fiber connection with ultra-low latency' },
            { icon: Headphones, title: 'Premium Audio', desc: 'High-end headsets with 7.1 surround sound' },
            { icon: Keyboard, title: 'Pro Peripherals', desc: 'Mechanical keyboards and precision gaming mice' },
            { icon: Users, title: 'Community', desc: 'Connect with fellow gamers and esports athletes' }
          ].map((feature, index) => (
            <div key={feature.title} className="cyber-card p-6 text-center">
              <feature.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        station={selectedStation}
        type="gaming-station"
      />
    </main>
  )
}
