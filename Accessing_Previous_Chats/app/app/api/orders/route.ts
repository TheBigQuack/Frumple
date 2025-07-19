
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

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
    const { items, location, deliveryNotes, totalAmount } = body

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

    // Ensure menu items exist (create if demo data)
    const menuItemIds = items.map((item: any) => item.menuItemId)
    const existingMenuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds
        }
      }
    })

    // Create missing menu items for demo
    const existingIds = existingMenuItems.map((item: { id: string }) => item.id)
    const missingIds = menuItemIds.filter((id: string) => !existingIds.includes(id))

    for (const missingId of missingIds) {
      const itemData = items.find((item: any) => item.menuItemId === missingId)
      if (itemData) {
        await prisma.menuItem.create({
          data: {
            id: missingId,
            name: `Menu Item ${missingId}`,
            description: 'Gaming cafe item',
            price: itemData.price,
            category: 'Food',
            isAvailable: true
          }
        })
      }
    }

    // Create the order with transaction
    const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          totalAmount,
          location,
          deliveryNotes,
          status: 'PENDING',
          paymentStatus: 'PAID'
        }
      })

      // Create order items
      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price
          }
        })
      }

      return newOrder
    })

    // Fetch the complete order with items
    const completeOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            menuItem: true
          }
        }
      }
    })

    return NextResponse.json(completeOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { message: 'Failed to create order' },
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

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id
      },
      include: {
        orderItems: {
          include: {
            menuItem: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { message: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
