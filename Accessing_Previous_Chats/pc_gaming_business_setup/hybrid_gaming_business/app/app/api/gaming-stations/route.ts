
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stations = await prisma.gamingStation.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        type: 'asc'
      }
    })

    return NextResponse.json(stations)
  } catch (error) {
    console.error('Error fetching gaming stations:', error)
    return NextResponse.json(
      { message: 'Failed to fetch gaming stations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description, hourlyRate, specs } = body

    const station = await prisma.gamingStation.create({
      data: {
        name,
        type,
        description,
        hourlyRate,
        specs: specs || {}
      }
    })

    return NextResponse.json(station, { status: 201 })
  } catch (error) {
    console.error('Error creating gaming station:', error)
    return NextResponse.json(
      { message: 'Failed to create gaming station' },
      { status: 500 }
    )
  }
}
