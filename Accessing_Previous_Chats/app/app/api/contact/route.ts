
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, formType = 'general' } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create the contact form entry
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message,
        formType,
        status: 'new'
      }
    })

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contactForm.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact form:', error)
    return NextResponse.json(
      { message: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const formType = searchParams.get('type')

    const where = formType ? { formType } : {}

    const contactForms = await prisma.contactForm.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(contactForms)
  } catch (error) {
    console.error('Error fetching contact forms:', error)
    return NextResponse.json(
      { message: 'Failed to fetch contact forms' },
      { status: 500 }
    )
  }
}
