
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { toast } from '@/hooks/use-toast'
import { CalendarDays, Clock, Users, CreditCard, Check } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  station?: any
  experience?: any
  type: 'gaming-station' | 'vr-experience' | 'streaming-studio' | 'server-hosting'
}

export function BookingModal({ isOpen, onClose, station, experience, type }: BookingModalProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState('')
  const [players, setPlayers] = useState('1')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const item = station || experience
  if (!mounted || !item) return null

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ]

  const durationOptions = type === 'vr-experience' 
    ? [{ value: experience?.duration?.toString() || '30', label: `${experience?.duration || 30} minutes (Fixed)` }]
    : [
        { value: '1', label: '1 hour' },
        { value: '2', label: '2 hours' },
        { value: '3', label: '3 hours' },
        { value: '4', label: '4 hours' },
        { value: '6', label: '6 hours' },
        { value: '8', label: '8 hours' }
      ]

  const maxPlayers = type === 'gaming-station' ? 1 : (experience?.maxPlayers || 1)
  const basePrice = type === 'gaming-station' ? (station?.hourlyRate || 15) : (experience?.price || 25)
  
  const calculateTotal = () => {
    if (type === 'vr-experience') {
      return basePrice * parseInt(players)
    } else {
      return basePrice * parseInt(duration || '1') * parseInt(players)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !duration || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Make real API call to create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          resourceId: item.id,
          date: selectedDate?.toISOString().split('T')[0],
          time: selectedTime,
          duration,
          players,
          specialRequests: ''
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed')
      }
      
      toast({
        title: "Booking Confirmed!",
        description: `Your ${type.replace('-', ' ')} booking has been confirmed. Booking ID: ${data.booking.id}`,
      })
      onClose()
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="cyber-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron gradient-text">
            Book {item.name || item.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Details */}
          <div className="cyber-card p-4 bg-gradient-to-r from-green-500/10 to-purple-500/10">
            <h3 className="font-semibold text-white mb-2">{item.name || item.title}</h3>
            <p className="text-gray-400 text-sm mb-2">
              {type === 'gaming-station' ? `${item.specs?.gpu} • ${item.specs?.monitor}` : item.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="data-display">
                ${basePrice}{type === 'gaming-station' ? '/hour' : '/session'}
              </div>
              {type === 'vr-experience' && (
                <div className="text-sm text-gray-400">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {experience?.duration} minutes
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <Label className="text-green-400 mb-2 block">Select Date</Label>
              <div className="cyber-card p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Time & Details */}
            <div className="space-y-4">
              {/* Time Selection */}
              <div>
                <Label className="text-green-400 mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time Slot
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="cyber-input">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <Label className="text-green-400 mb-2 block">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="cyber-input">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Players */}
              {maxPlayers > 1 && (
                <div>
                  <Label className="text-green-400 mb-2 block">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Players
                  </Label>
                  <Select value={players} onValueChange={setPlayers}>
                    <SelectTrigger className="cyber-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: maxPlayers }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} Player{i + 1 > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-green-400 mb-2 block">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-green-400 mb-2 block">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="cyber-input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Total Cost */}
          <div className="cyber-card p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Cost</p>
                <div className="text-sm text-gray-500">
                  ${basePrice} × {type === 'vr-experience' ? players : `${duration || 1} hour(s) × ${players}`} player(s)
                </div>
              </div>
              <div className="data-display text-2xl font-bold">
                ${calculateTotal()}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 cyber-border text-gray-400 hover:bg-gray-500/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 cyber-button"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
