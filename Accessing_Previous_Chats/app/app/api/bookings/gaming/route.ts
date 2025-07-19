
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
    const { stationId, startTime, endTime, totalAmount, specialRequests } = body

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

    // Create a gaming station if it doesn't exist (for demo purposes)
    let station = await prisma.gamingStation.findFirst({
      where: { type: stationId }
    })

    if (!station) {
      const stationConfigs = {
        'STANDARD': { name: 'Standard Gaming Station', hourlyRate: 8 },
        'PREMIUM': { name: 'Premium Gaming Station', hourlyRate: 12 },
        'ELITE': { name: 'Elite Gaming Station', hourlyRate: 15 },
        'CONSOLE': { name: 'Console Gaming Station', hourlyRate: 8 }
      }

      const config = stationConfigs[stationId as keyof typeof stationConfigs]
      if (config) {
        station = await prisma.gamingStation.create({
          data: {
            name: config.name,
            type: stationId,
            hourlyRate: config.hourlyRate,
            description: 'High-performance gaming station'
          }
        })
      }
    }

    if (!station) {
      return NextResponse.json(
        { message: 'Invalid station type' },
        { status: 400 }
      )
    }

    // Check for conflicting bookings
    const conflictingBooking = await prisma.gamingBooking.findFirst({
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
        { message: 'Station is not available for the selected time' },
        { status: 409 }
      )
    }

    // Create the booking
    const booking = await prisma.gamingBooking.create({
      data: {
        userId: user.id,
        stationId: station.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
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
    console.error('Error creating gaming booking:', error)
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

    const bookings = await prisma.gamingBooking.findMany({
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
    console.error('Error fetching gaming bookings:', error)
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
