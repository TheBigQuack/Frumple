
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Trophy, Users, Clock } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Weekly CS:GO Tournament',
    description: 'Competitive Counter-Strike tournament with cash prizes',
    date: 'Dec 20, 2024',
    time: '7:00 PM - 11:00 PM',
    type: 'Tournament',
    maxPlayers: 32,
    entryFee: 25,
    prizePool: 500,
    status: 'Open'
  },
  {
    id: 2,
    title: 'VR Experience Night',
    description: 'Special VR gaming event with multiplayer experiences',
    date: 'Dec 15, 2024',
    time: '6:00 PM - 9:00 PM',
    type: 'Social',
    maxPlayers: 16,
    entryFee: 15,
    prizePool: null,
    status: 'Open'
  },
  {
    id: 3,
    title: 'Content Creation Workshop',
    description: 'Learn professional streaming and content creation techniques',
    date: 'Dec 22, 2024',
    time: '2:00 PM - 4:00 PM',
    type: 'Workshop',
    maxPlayers: 12,
    entryFee: 35,
    prizePool: null,
    status: 'Open'
  },
  {
    id: 4,
    title: 'Valorant Championship',
    description: 'Monthly Valorant tournament for competitive players',
    date: 'Dec 28, 2024',
    time: '1:00 PM - 6:00 PM',
    type: 'Tournament',
    maxPlayers: 40,
    entryFee: 30,
    prizePool: 800,
    status: 'Registration Full'
  }
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Calendar className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Events & Tournaments
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join our competitive tournaments, social events, and educational workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={event.type === 'Tournament' ? 'default' : event.type === 'Workshop' ? 'secondary' : 'outline'}>
                      {event.type}
                    </Badge>
                    <Badge variant={event.status === 'Open' ? 'default' : 'destructive'}>
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-green-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="h-4 w-4 mr-2 text-purple-500" />
                      {event.maxPlayers} players max
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Trophy className="h-4 w-4 mr-2 text-orange-500" />
                      ${event.entryFee} entry
                    </div>
                  </div>
                  
                  {event.prizePool && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500">${event.prizePool}</div>
                        <div className="text-sm text-gray-400">Prize Pool</div>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    disabled={event.status !== 'Open'}
                    variant={event.status === 'Open' ? 'default' : 'secondary'}
                  >
                    {event.status === 'Open' ? 'Register Now' : 'Registration Closed'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">Want to host your own event?</h2>
            <p className="text-gray-400 mb-6">Contact us about private tournaments and custom events</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contact Event Team
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
