
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stations = await prisma.gamingStation.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ stations })
  } catch (error) {
    console.error('Get gaming stations error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
