
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Monitor, Clock, DollarSign, Gamepad2 } from 'lucide-react'

interface GamingStation {
  id: string
  name: string
  type: string
  hourlyRate: number
  specs: any
  isActive: boolean
}

const stationTypes = [
  { 
    type: 'STANDARD',
    name: 'Standard Gaming',
    hourlyRate: 8,
    specs: 'RTX 4070, i7-13700K, 1440p Monitor',
    description: 'Perfect for casual gaming and popular titles'
  },
  { 
    type: 'PREMIUM',
    name: 'Premium Gaming',
    hourlyRate: 12,
    specs: 'RTX 4080, i9-14900K, 4K Monitor',
    description: 'High-performance gaming with 4K visuals'
  },
  { 
    type: 'ELITE',
    name: 'Elite Gaming',
    hourlyRate: 15,
    specs: 'RTX 4090, i9-14900KS, Dual 4K Monitors',
    description: 'Ultimate gaming experience with flagship hardware'
  },
  { 
    type: 'CONSOLE',
    name: 'Console Gaming',
    hourlyRate: 8,
    specs: 'PS5, Xbox Series X, Nintendo Switch',
    description: 'Latest generation console gaming'
  }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
]

export function GamingBooking() {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedStation, setSelectedStation] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState('1')
  const [stations, setStations] = useState<GamingStation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStations()
  }, [])

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/gaming-stations')
      const data = await response.json()
      setStations(data)
    } catch (error) {
      console.error('Error fetching stations:', error)
    }
  }

  const handleBooking = async () => {
    if (!session) {
      toast.error('Please sign in to make a booking')
      return
    }

    if (!selectedStation || !selectedTime || !selectedDate) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const startTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(':')
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      const endTime = new Date(startTime)
      endTime.setHours(endTime.getHours() + parseInt(duration))

      const selectedStationType = stationTypes.find(s => s.type === selectedStation)
      const totalAmount = selectedStationType ? selectedStationType.hourlyRate * parseInt(duration) : 0

      const response = await fetch('/api/bookings/gaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stationId: selectedStation,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          totalAmount,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Booking created successfully!')
        // Reset form
        setSelectedStation('')
        setSelectedTime('')
        setDuration('1')
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

  const selectedStationType = stationTypes.find(s => s.type === selectedStation)
  const totalCost = selectedStationType ? selectedStationType.hourlyRate * parseInt(duration) : 0

  return (
    <div className="space-y-6">
      {/* Station Types */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Gaming Station</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stationTypes.map((station) => (
            <Card 
              key={station.type}
              className={`cursor-pointer transition-all ${
                selectedStation === station.type 
                  ? 'bg-blue-600/20 border-blue-500' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedStation(station.type)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">{station.name}</CardTitle>
                  <Badge variant="secondary">${station.hourlyRate}/hr</Badge>
                </div>
                <CardDescription className="text-sm text-gray-400">
                  {station.specs}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500">{station.description}</p>
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
            <h3 className="text-lg font-semibold text-white mb-4">Select Time & Duration</h3>
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration (hours)</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 8].map((hours) => (
                      <SelectItem key={hours} value={hours.toString()}>
                        {hours} hour{hours > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedStation && selectedTime && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white flex items-center">
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Station:</span>
                  <span className="text-white">{selectedStationType?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{selectedTime} - {
                    new Date(2024, 0, 1, parseInt(selectedTime.split(':')[0]) + parseInt(duration), parseInt(selectedTime.split(':')[1]))
                      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                  }</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white font-semibold">${totalCost}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Book Button */}
      <Button 
        onClick={handleBooking}
        disabled={!selectedStation || !selectedTime || !session || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
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
            Book Now - ${totalCost}
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
