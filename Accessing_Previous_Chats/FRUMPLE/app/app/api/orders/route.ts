
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

    const { items, orderType, notes } = await request.json()

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Items are required' },
        { status: 400 }
      )
    }

    // Calculate total price
    let totalPrice = 0
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      })
      if (!menuItem) {
        return NextResponse.json(
          { message: `Menu item ${item.menuItemId} not found` },
          { status: 400 }
        )
      }
      totalPrice += menuItem.price * item.quantity
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'pending',
        totalPrice,
        orderType: orderType || 'pickup',
        notes: notes || null
      }
    })

    // Create order items
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      })
      
      if (menuItem) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: menuItem.price
          }
        })
      }
    }

    return NextResponse.json(
      { 
        message: 'Order created successfully',
        order: {
          id: order.id,
          totalPrice: order.totalPrice,
          status: order.status,
          orderType: order.orderType
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order error:', error)
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

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
