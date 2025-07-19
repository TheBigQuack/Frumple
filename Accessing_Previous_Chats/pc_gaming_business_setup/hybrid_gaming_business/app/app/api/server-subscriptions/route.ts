
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
    const { serverName, gameType, plan, monthlyPrice } = body

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

    // Check if user already has a server with the same name
    const existingServer = await prisma.serverSubscription.findFirst({
      where: {
        userId: user.id,
        serverName,
        isActive: true
      }
    })

    if (existingServer) {
      return NextResponse.json(
        { message: 'Server name already exists for this user' },
        { status: 409 }
      )
    }

    // Create server specifications based on plan
    const specifications = {
      'BASIC': {
        cpu: '2 vCPU',
        ram: '4GB RAM',
        storage: '50GB SSD',
        bandwidth: '1TB/month'
      },
      'PREMIUM': {
        cpu: '4 vCPU',
        ram: '8GB RAM',
        storage: '100GB SSD',
        bandwidth: '2TB/month'
      },
      'ENTERPRISE': {
        cpu: '8 vCPU',
        ram: '16GB RAM',
        storage: '250GB SSD',
        bandwidth: '5TB/month'
      }
    }

    // Create the subscription
    const subscription = await prisma.serverSubscription.create({
      data: {
        userId: user.id,
        serverName,
        gameType,
        plan,
        monthlyPrice,
        specifications: specifications[plan as keyof typeof specifications] || {},
        status: 'active'
      }
    })

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('Error creating server subscription:', error)
    return NextResponse.json(
      { message: 'Failed to create subscription' },
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

    const subscriptions = await prisma.serverSubscription.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching server subscriptions:', error)
    return NextResponse.json(
      { message: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}
