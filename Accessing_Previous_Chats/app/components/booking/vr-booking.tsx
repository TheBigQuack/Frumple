
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Headphones, Users, Clock, DollarSign } from 'lucide-react'

const vrExperiences = [
  {
    type: 'SOLO_30MIN',
    name: 'Solo Adventure (30 min)',
    price: 25,
    duration: 30,
    maxPlayers: 1,
    description: 'Perfect introduction to VR gaming'
  },
  {
    type: 'SOLO_60MIN',
    name: 'Extended Solo (60 min)',
    price: 40,
    duration: 60,
    maxPlayers: 1,
    description: 'Deep dive into immersive worlds'
  },
  {
    type: 'GROUP',
    name: 'Group Experience (45 min)',
    price: 120,
    duration: 45,
    maxPlayers: 4,
    description: 'Multiplayer VR adventures for up to 4 players'
  },
  {
    type: 'PREMIUM',
    name: 'Premium Content (60 min)',
    price: 50,
    duration: 60,
    maxPlayers: 1,
    description: 'Latest AAA VR titles and exclusive content'
  }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00'
]

export function VrBooking() {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedExperience, setSelectedExperience] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [playerCount, setPlayerCount] = useState('1')
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    if (!session) {
      toast.error('Please sign in to make a booking')
      return
    }

    if (!selectedExperience || !selectedTime || !selectedDate) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const startTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(':')
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      const selectedExp = vrExperiences.find(e => e.type === selectedExperience)
      if (!selectedExp) return

      const endTime = new Date(startTime)
      endTime.setMinutes(endTime.getMinutes() + selectedExp.duration)

      const response = await fetch('/api/bookings/vr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experienceType: selectedExperience,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          playerCount: parseInt(playerCount),
          totalAmount: selectedExp.price,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('VR booking created successfully!')
        // Reset form
        setSelectedExperience('')
        setSelectedTime('')
        setPlayerCount('1')
      } else {
        toast.error(result.message || 'Failed to create booking')
      }
    } catch (error) {
      toast.error('An error occurred while creating the booking')
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedExp = vrExperiences.find(e => e.type === selectedExperience)

  return (
    <div className="space-y-6">
      {/* VR Experiences */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your VR Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vrExperiences.map((experience) => (
            <Card 
              key={experience.type}
              className={`cursor-pointer transition-all ${
                selectedExperience === experience.type 
                  ? 'bg-purple-600/20 border-purple-500' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedExperience(experience.type)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">{experience.name}</CardTitle>
                  <Badge variant="secondary">${experience.price}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {experience.duration} min
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {experience.maxPlayers} player{experience.maxPlayers > 1 ? 's' : ''}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500">{experience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="rounded-md border border-gray-700 bg-gray-800"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Select Time & Players</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedExp && selectedExp.maxPlayers > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Number of Players</label>
                  <Select value={playerCount} onValueChange={setPlayerCount}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select players" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: selectedExp.maxPlayers }, (_, i) => i + 1).map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count} player{count > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          {selectedExperience && selectedTime && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white flex items-center">
                  <Headphones className="h-4 w-4 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experience:</span>
                  <span className="text-white">{selectedExp?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{selectedTime} ({selectedExp?.duration} min)</span>
                </div>
                {selectedExp && selectedExp.maxPlayers > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Players:</span>
                    <span className="text-white">{playerCount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white font-semibold">${selectedExp?.price}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Book Button */}
      <Button 
        onClick={handleBooking}
        disabled={!selectedExperience || !selectedTime || !session || loading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
        size="lg"
      >
        {loading ? (
          <>
            <div className="loading-spinner mr-2"></div>
            Creating Booking...
          </>
        ) : (
          <>
            <DollarSign className="h-4 w-4 mr-2" />
            Book VR Experience - ${selectedExp?.price}
          </>
        )}
      </Button>

      {!session && (
        <p className="text-center text-sm text-gray-400">
          Please sign in to make a booking
        </p>
      )}
    </div>
  )
}
