
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const { 
      type, 
      resourceId, 
      date, 
      time, 
      duration, 
      players, 
      specialRequests 
    } = await request.json()

    // Validate required fields
    if (!type || !resourceId || !date || !time || !duration) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate dates
    const startTime = new Date(`${date}T${time}`)
    const endTime = new Date(startTime.getTime() + parseInt(duration) * 60 * 60 * 1000)

    // Calculate price based on type and duration
    let totalPrice = 0
    if (type === 'gaming-station') {
      totalPrice = parseInt(duration) * 1000 // $10 per hour in cents
    } else if (type === 'vr-experience') {
      totalPrice = 3000 // $30 per session
    } else if (type === 'streaming-studio') {
      totalPrice = parseInt(duration) * 7500 // $75 per hour
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        type,
        resourceId,
        startTime,
        endTime,
        duration: parseInt(duration) * 60, // Convert to minutes
        players: parseInt(players) || 1,
        totalPrice,
        specialRequests: specialRequests || null,
        status: 'confirmed'
      }
    })

    return NextResponse.json(
      { 
        message: 'Booking created successfully',
        booking: {
          id: booking.id,
          type: booking.type,
          startTime: booking.startTime,
          endTime: booking.endTime,
          totalPrice: booking.totalPrice,
          status: booking.status
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
