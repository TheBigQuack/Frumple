
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ menuItems })
  } catch (error) {
    console.error('Get menu items error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
