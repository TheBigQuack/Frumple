
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Headset, 
  Users, 
  Clock,
  Star,
  Zap,
  Shield,
  Gamepad2,
  Headphones,
  Eye,
  Hand
} from 'lucide-react'
import { BookingModal } from '@/components/booking-modal'

interface VRExperience {
  id: string
  title: string
  category: 'action' | 'adventure' | 'simulation' | 'horror' | 'education' | 'multiplayer'
  duration: number
  maxPlayers: number
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme'
  price: number
  rating: number
  description: string
  features: string[]
  requirements: string[]
  image: string
  isPopular?: boolean
  isNew?: boolean
}

const vrExperiences: VRExperience[] = [
  {
    id: 'vr-001',
    title: 'Cyberpunk City 2099',
    category: 'action',
    duration: 45,
    maxPlayers: 4,
    difficulty: 'hard',
    price: 30, // Red Bank, TN market pricing
    rating: 4.9,
    description: 'Navigate through a dystopian cyberpunk metropolis filled with neon-lit streets, flying cars, and corporate espionage. Team up to complete high-stakes missions.',
    features: ['Full Body Tracking', 'Haptic Feedback', 'Team Communication', '4K Visuals'],
    requirements: ['No motion sickness history', 'Comfortable with heights'],
    image: 'https://thumbs.dreamstime.com/b/futuristic-city-illuminated-neon-lights-filled-flying-cars-lit-cyberpunk-cityscape-zooming-past-320220583.jpg',
    isPopular: true
  },
  {
    id: 'vr-002',
    title: 'Medieval Quest',
    category: 'adventure',
    duration: 60,
    maxPlayers: 6,
    difficulty: 'medium',
    price: 25, // Red Bank, TN market pricing
    rating: 4.8,
    description: 'Embark on an epic medieval adventure as knights, wizards, or archers. Explore ancient castles, fight dragons, and solve mystical puzzles.',
    features: ['Magic Spells', 'Weapon Physics', 'Voice Chat', 'Progressive Story'],
    requirements: ['Basic VR experience recommended'],
    image: 'https://s1.1zoom.me/b5050/913/Castles_Dragons_448011_2560x1440.jpg',
    isNew: true
  },
  {
    id: 'vr-003',
    title: 'Space Station Alpha',
    category: 'simulation',
    duration: 30,
    maxPlayers: 2,
    difficulty: 'medium',
    price: 22, // Red Bank, TN market pricing
    rating: 4.7,
    description: 'Experience life aboard a space station. Conduct experiments, handle emergencies, and explore the cosmos in zero gravity.',
    features: ['Zero Gravity Simulation', 'Scientific Tools', 'Space Walks', 'Real Physics'],
    requirements: ['Comfortable with confined spaces'],
    image: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/videos/2021/09/floating_through_the_space_station_in_360/23446188-1-eng-GB/Floating_through_the_Space_Station_in_360_pillars.jpg'
  },
  {
    id: 'vr-004',
    title: 'Horror Asylum',
    category: 'horror',
    duration: 25,
    maxPlayers: 1,
    difficulty: 'extreme',
    price: 20, // Red Bank, TN market pricing
    rating: 4.6,
    description: 'Survive the night in an abandoned psychiatric hospital. Uncover dark secrets while avoiding supernatural entities.',
    features: ['Psychological Horror', '3D Audio', 'Jump Scares', 'Multiple Endings'],
    requirements: ['18+ only', 'Strong heart recommended', 'No anxiety disorders'],
    image: 'https://thumbs.dreamstime.com/b/haunting-journey-forgotten-hospital-corridor-capturing-eerie-atmosphere-abandoned-step-bygone-era-349237068.jpg'
  },
  {
    id: 'vr-005',
    title: 'Ocean Deep',
    category: 'education',
    duration: 40,
    maxPlayers: 8,
    difficulty: 'easy',
    price: 20, // Red Bank, TN market pricing
    rating: 4.8,
    description: 'Explore the depths of the ocean, encounter marine life, and learn about ocean conservation in this educational experience.',
    features: ['Marine Biology', 'Interactive Learning', 'Beautiful Visuals', 'Relaxing'],
    requirements: ['Family friendly', 'All ages welcome'],
    image: 'https://i.ytimg.com/vi/nvq_lvC1MRY/maxresdefault.jpg',
    isPopular: true
  },
  {
    id: 'vr-006',
    title: 'Esports Arena',
    category: 'multiplayer',
    duration: 20,
    maxPlayers: 10,
    difficulty: 'hard',
    price: 25, // Red Bank, TN market pricing
    rating: 4.9,
    description: 'Compete in virtual esports tournaments with enhanced abilities and weapons. Fast-paced action with professional commentary.',
    features: ['Competitive Play', 'Leaderboards', 'Spectator Mode', 'Tournament Style'],
    requirements: ['Gaming experience recommended'],
    image: 'https://thumbs.dreamstime.com/b/futuristic-stadium-hosting-global-esports-tournament-interactive-hologram-technology-spectators-fill-massive-vibrant-laser-343841905.jpg',
    isNew: true
  }
]

const categories = [
  { value: 'all', label: 'All Experiences', count: vrExperiences.length },
  { value: 'action', label: 'Action', count: vrExperiences.filter(e => e.category === 'action').length },
  { value: 'adventure', label: 'Adventure', count: vrExperiences.filter(e => e.category === 'adventure').length },
  { value: 'simulation', label: 'Simulation', count: vrExperiences.filter(e => e.category === 'simulation').length },
  { value: 'horror', label: 'Horror', count: vrExperiences.filter(e => e.category === 'horror').length },
  { value: 'education', label: 'Educational', count: vrExperiences.filter(e => e.category === 'education').length },
  { value: 'multiplayer', label: 'Multiplayer', count: vrExperiences.filter(e => e.category === 'multiplayer').length }
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'text-green-400 bg-green-400/20'
    case 'medium': return 'text-yellow-400 bg-yellow-400/20'
    case 'hard': return 'text-orange-400 bg-orange-400/20'
    case 'extreme': return 'text-red-400 bg-red-400/20'
    default: return 'text-gray-400 bg-gray-400/20'
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'action': return 'from-red-400 to-pink-600'
    case 'adventure': return 'from-green-400 to-emerald-600'
    case 'simulation': return 'from-blue-400 to-cyan-600'
    case 'horror': return 'from-purple-400 to-violet-600'
    case 'education': return 'from-yellow-400 to-orange-600'
    case 'multiplayer': return 'from-cyan-400 to-blue-600'
    default: return 'from-gray-400 to-gray-600'
  }
}

export function VRExperiencesClient() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState<VRExperience | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredExperiences = selectedCategory === 'all' 
    ? vrExperiences 
    : vrExperiences.filter(exp => exp.category === selectedCategory)

  const handleBookExperience = (experience: VRExperience) => {
    setSelectedExperience(experience)
    setBookingModalOpen(true)
  }

  if (!mounted) return null

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            VR Experiences
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Immerse yourself in cutting-edge virtual reality worlds with full body tracking and haptic feedback
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto" />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`${
                selectedCategory === category.value 
                  ? 'cyber-button' 
                  : 'cyber-border text-green-400 hover:bg-green-500/10'
              }`}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>

        {/* VR Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="cyber-card p-4 text-center">
            <Headset className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">25+</div>
            <p className="text-gray-400 text-sm">VR Experiences</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Eye className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">8K</div>
            <p className="text-gray-400 text-sm">Visual Fidelity</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Hand className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">Full</div>
            <p className="text-gray-400 text-sm">Body Tracking</p>
          </div>
          <div className="cyber-card p-4 text-center">
            <Headphones className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="data-display text-lg font-bold">3D</div>
            <p className="text-gray-400 text-sm">Spatial Audio</p>
          </div>
        </div>

        {/* VR Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience, index) => (
            <Card 
              key={experience.id} 
              className="cyber-card overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl font-orbitron text-white">
                    {experience.title}
                  </CardTitle>
                  <div className="flex gap-1">
                    {experience.isNew && (
                      <Badge className="bg-green-500 text-black border-0 text-xs">NEW</Badge>
                    )}
                    {experience.isPopular && (
                      <Badge className="bg-yellow-500 text-black border-0 text-xs">POPULAR</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(experience.category)} text-black border-0`}>
                    {experience.category.toUpperCase()}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-yellow-400 text-sm font-medium">{experience.rating}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Experience Image */}
                <div className="relative aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getDifficultyColor(experience.difficulty)} border-0 text-xs`}>
                      {experience.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {experience.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-gray-300">{experience.duration} minutes</span>
                    </div>
                    <div className="data-display font-bold">
                      ${experience.price}
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-gray-300">Up to {experience.maxPlayers} players</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {experience.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-purple-400/50 text-purple-400">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full cyber-button"
                  onClick={() => handleBookExperience(experience)}
                >
                  Book Experience
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* VR Technology Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Headset, title: 'Meta Quest Pro', desc: 'Latest VR headsets with 4K per eye resolution' },
            { icon: Hand, title: 'Hand Tracking', desc: 'Natural hand gestures without controllers' },
            { icon: Zap, title: 'Haptic Suits', desc: 'Feel every impact and interaction' },
            { icon: Shield, title: 'Safety First', desc: 'Sanitized equipment and safe play areas' }
          ].map((feature, index) => (
            <div key={feature.title} className="cyber-card p-6 text-center">
              <feature.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
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
        experience={selectedExperience}
        type="vr-experience"
      />
    </main>
  )
}
