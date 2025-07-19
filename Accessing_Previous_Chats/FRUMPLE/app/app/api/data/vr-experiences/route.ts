
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const experiences = await prisma.vRExperience.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ experiences })
  } catch (error) {
    console.error('Get VR experiences error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
