
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Video, Clock, DollarSign, Settings } from 'lucide-react'

const studioTypes = [
  {
    type: 'BASIC',
    name: 'Basic Studio',
    hourlyRate: 50,
    description: 'Single camera setup with basic lighting',
    features: ['1080p Camera', 'Basic Lighting', 'Green Screen', 'Audio Setup']
  },
  {
    type: 'PROFESSIONAL',
    name: 'Professional Studio',
    hourlyRate: 75,
    description: 'Multi-camera setup with advanced lighting',
    features: ['4K Multi-Camera', 'Professional Lighting', 'Advanced Audio', 'Streaming Software']
  },
  {
    type: 'PREMIUM',
    name: 'Premium Studio',
    hourlyRate: 100,
    description: 'Full production suite with premium equipment',
    features: ['4K Broadcast Quality', 'Professional Lighting Rig', 'Premium Audio Suite', 'Live Production Tools']
  }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00'
]

export function StreamingBooking() {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedStudio, setSelectedStudio] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState('1')
  const [techSupport, setTechSupport] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    if (!session) {
      toast.error('Please sign in to make a booking')
      return
    }

    if (!selectedStudio || !selectedTime || !selectedDate) {
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

      const selectedStudioType = studioTypes.find(s => s.type === selectedStudio)
      const baseAmount = selectedStudioType ? selectedStudioType.hourlyRate * parseInt(duration) : 0
      const techSupportCost = techSupport ? 50 * parseInt(duration) : 0
      const totalAmount = baseAmount + techSupportCost

      const response = await fetch('/api/bookings/streaming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studioType: selectedStudio,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          techSupport,
          totalAmount,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Streaming studio booking created successfully!')
        // Reset form
        setSelectedStudio('')
        setSelectedTime('')
        setDuration('1')
        setTechSupport(false)
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

  const selectedStudioType = studioTypes.find(s => s.type === selectedStudio)
  const baseAmount = selectedStudioType ? selectedStudioType.hourlyRate * parseInt(duration) : 0
  const techSupportCost = techSupport ? 50 * parseInt(duration) : 0
  const totalCost = baseAmount + techSupportCost

  return (
    <div className="space-y-6">
      {/* Studio Types */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Studio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studioTypes.map((studio) => (
            <Card 
              key={studio.type}
              className={`cursor-pointer transition-all ${
                selectedStudio === studio.type 
                  ? 'bg-green-600/20 border-green-500' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedStudio(studio.type)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">{studio.name}</CardTitle>
                  <Badge variant="secondary">${studio.hourlyRate}/hr</Badge>
                </div>
                <CardDescription className="text-sm text-gray-400">
                  {studio.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1">
                  {studio.features.map((feature) => (
                    <li key={feature} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
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
                    {[1, 2, 3, 4, 6, 8].map((hours) => (
                      <SelectItem key={hours} value={hours.toString()}>
                        {hours} hour{hours > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="techSupport" 
                  checked={techSupport}
                  onCheckedChange={(checked) => setTechSupport(checked === true)}
                />
                <label htmlFor="techSupport" className="text-sm text-gray-300">
                  Add Technical Support (+$50/hour)
                </label>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedStudio && selectedTime && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Studio:</span>
                  <span className="text-white">{selectedStudioType?.name}</span>
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Studio Fee:</span>
                  <span className="text-white">${baseAmount}</span>
                </div>
                {techSupport && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tech Support:</span>
                    <span className="text-white">${techSupportCost}</span>
                  </div>
                )}
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
        disabled={!selectedStudio || !selectedTime || !session || loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
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
            Book Studio - ${totalCost}
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
