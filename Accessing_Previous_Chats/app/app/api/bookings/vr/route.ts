
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { experienceType, startTime, endTime, playerCount, totalAmount, specialRequests } = body

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Create a VR station if it doesn't exist (for demo purposes)
    let station = await prisma.vrStation.findFirst({
      where: { type: experienceType }
    })

    if (!station) {
      const stationConfigs = {
        'SOLO_30MIN': { name: 'Solo VR Experience (30min)', price: 25, duration: 30, maxPlayers: 1 },
        'SOLO_60MIN': { name: 'Extended Solo VR (60min)', price: 40, duration: 60, maxPlayers: 1 },
        'GROUP': { name: 'Group VR Experience', price: 120, duration: 45, maxPlayers: 4 },
        'PREMIUM': { name: 'Premium VR Content', price: 50, duration: 60, maxPlayers: 1 }
      }

      const config = stationConfigs[experienceType as keyof typeof stationConfigs]
      if (config) {
        station = await prisma.vrStation.create({
          data: {
            name: config.name,
            type: experienceType,
            price: config.price,
            duration: config.duration,
            maxPlayers: config.maxPlayers,
            description: 'Immersive VR experience'
          }
        })
      }
    }

    if (!station) {
      return NextResponse.json(
        { message: 'Invalid experience type' },
        { status: 400 }
      )
    }

    // Check for conflicting bookings
    const conflictingBooking = await prisma.vrBooking.findFirst({
      where: {
        stationId: station.id,
        status: {
          in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS']
        },
        OR: [
          {
            AND: [
              { startTime: { lte: new Date(startTime) } },
              { endTime: { gt: new Date(startTime) } }
            ]
          },
          {
            AND: [
              { startTime: { lt: new Date(endTime) } },
              { endTime: { gte: new Date(endTime) } }
            ]
          }
        ]
      }
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { message: 'VR station is not available for the selected time' },
        { status: 409 }
      )
    }

    // Create the booking
    const booking = await prisma.vrBooking.create({
      data: {
        userId: user.id,
        stationId: station.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        playerCount,
        totalAmount,
        specialRequests,
        status: 'CONFIRMED',
        paymentStatus: 'PAID'
      },
      include: {
        station: true
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating VR booking:', error)
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const bookings = await prisma.vrBooking.findMany({
      where: {
        userId: user.id
      },
      include: {
        station: true
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching VR bookings:', error)
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
