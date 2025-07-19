
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
    const { studioType, startTime, endTime, techSupport, totalAmount, specialRequests } = body

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

    // Create a streaming studio if it doesn't exist (for demo purposes)
    let studio = await prisma.streamingStudio.findFirst({
      where: { type: studioType }
    })

    if (!studio) {
      const studioConfigs = {
        'BASIC': { name: 'Basic Streaming Studio', hourlyRate: 50 },
        'PROFESSIONAL': { name: 'Professional Streaming Studio', hourlyRate: 75 },
        'PREMIUM': { name: 'Premium Streaming Studio', hourlyRate: 100 }
      }

      const config = studioConfigs[studioType as keyof typeof studioConfigs]
      if (config) {
        studio = await prisma.streamingStudio.create({
          data: {
            name: config.name,
            type: studioType,
            hourlyRate: config.hourlyRate,
            description: 'Professional streaming studio'
          }
        })
      }
    }

    if (!studio) {
      return NextResponse.json(
        { message: 'Invalid studio type' },
        { status: 400 }
      )
    }

    // Check for conflicting bookings
    const conflictingBooking = await prisma.streamingBooking.findFirst({
      where: {
        studioId: studio.id,
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
        { message: 'Studio is not available for the selected time' },
        { status: 409 }
      )
    }

    // Create the booking
    const booking = await prisma.streamingBooking.create({
      data: {
        userId: user.id,
        studioId: studio.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        techSupport,
        totalAmount,
        specialRequests,
        status: 'CONFIRMED',
        paymentStatus: 'PAID'
      },
      include: {
        studio: true
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating streaming booking:', error)
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

    const bookings = await prisma.streamingBooking.findMany({
      where: {
        userId: user.id
      },
      include: {
        studio: true
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching streaming bookings:', error)
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
