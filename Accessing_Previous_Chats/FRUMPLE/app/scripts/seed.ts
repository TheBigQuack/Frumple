
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test accounts for comprehensive demo
  const hashedPassword = await bcrypt.hash('johndoe123', 12)
  const hashedPassword2 = await bcrypt.hash('demo123', 12)
  
  // Test investor account (required by system)
  const testInvestor = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'investor'
    }
  })

  // Test admin account
  const testAdmin = await prisma.user.upsert({
    where: { email: 'admin@frumple.com' },
    update: {},
    create: {
      email: 'admin@frumple.com',
      password: hashedPassword2,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      phone: '+1 (423) 555-0100'
    }
  })

  // Test customer account
  const testCustomer = await prisma.user.upsert({
    where: { email: 'gamer@frumple.com' },
    update: {},
    create: {
      email: 'gamer@frumple.com',
      password: hashedPassword2,
      firstName: 'Alex',
      lastName: 'Gamer',
      role: 'customer',
      phone: '+1 (423) 555-0200'
    }
  })

  // Test creator account
  const testCreator = await prisma.user.upsert({
    where: { email: 'creator@frumple.com' },
    update: {},
    create: {
      email: 'creator@frumple.com',
      password: hashedPassword2,
      firstName: 'Sarah',
      lastName: 'Stream',
      role: 'creator',
      phone: '+1 (423) 555-0300'
    }
  })

  // Test business account
  const testBusiness = await prisma.user.upsert({
    where: { email: 'business@frumple.com' },
    update: {},
    create: {
      email: 'business@frumple.com',
      password: hashedPassword2,
      firstName: 'Mike',
      lastName: 'Enterprise',
      role: 'business',
      phone: '+1 (423) 555-0400'
    }
  })

  console.log('✅ Created test accounts (investor, admin, customer, creator, business)')

  // Seed financial projections
  const currentYear = new Date().getFullYear()
  const projections = []

  // Year 1 monthly projections (Red Bank, TN market adjusted)
  for (let month = 1; month <= 12; month++) {
    const baseRevenue = 48000 + (month * 2200) // Gradual growth from $48k to $75k (adjusted for local pricing)
    const baseExpenses = 38000 + (month * 850) // Expenses grow slower (reduced due to lower investment)
    
    projections.push({
      year: currentYear,
      month,
      category: 'monthly',
      projectedRevenue: baseRevenue,
      projectedExpenses: baseExpenses,
      projectedProfit: baseRevenue - baseExpenses
    })
  }

  // Year 2-3 quarterly projections (Red Bank market adjusted)
  for (let year = currentYear + 1; year <= currentYear + 2; year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      const yearMultiplier = year === currentYear + 1 ? 1.3 : 1.6 // More conservative growth for Red Bank market
      const quarterRevenue = Math.floor(220000 * yearMultiplier)
      const quarterExpenses = Math.floor(165000 * yearMultiplier)
      
      projections.push({
        year,
        month: quarter * 3, // Use last month of quarter
        category: 'quarterly',
        projectedRevenue: quarterRevenue,
        projectedExpenses: quarterExpenses,
        projectedProfit: quarterRevenue - quarterExpenses
      })
    }
  }

  for (const projection of projections) {
    await prisma.financialProjection.upsert({
      where: {
        year_month_category: {
          year: projection.year,
          month: projection.month,
          category: projection.category
        }
      },
      update: {},
      create: projection
    })
  }

  console.log('✅ Seeded financial projections')

  // Seed business metrics for current month (Red Bank, TN market adjusted)
  await prisma.businessMetrics.upsert({
    where: { date: new Date() },
    update: {},
    create: {
      date: new Date(),
      totalRevenue: 7200000, // $72k in cents (adjusted for Red Bank market)
      gamingStationRev: 2880000, // $28.8k (reduced due to lower hourly rates)
      vrExperienceRev: 1440000, // $14.4k (adjusted for local pricing)
      streamingStudioRev: 1080000, // $10.8k
      serverHostingRev: 1440000, // $14.4k
      foodBeverageRev: 360000, // $3.6k
      totalBookings: 1125,
      activeUsers: 3200,
      newSignups: 65
    }
  })

  console.log('✅ Seeded business metrics')

  // Seed gaming stations (Red Bank, TN market pricing)
  const gamingStations = [
    {
      name: 'Phoenix Station',
      type: 'premium',
      hourlyRate: 1000, // $10 (Red Bank market)
      specifications: {
        cpu: 'Intel i9-13900K',
        gpu: 'RTX 4080 Super',
        ram: '32GB DDR5',
        storage: '2TB NVMe SSD',
        monitor: '27" 240Hz OLED',
        peripherals: ['Mechanical Keyboard', 'Gaming Mouse', 'Premium Headset']
      },
      features: ['RGB Lighting', 'Adjustable Chair', 'Dual Monitor Support']
    },
    {
      name: 'Viper Station',
      type: 'vip',
      hourlyRate: 1200, // $12 (Red Bank market premium)
      specifications: {
        cpu: 'Intel i9-14900K',
        gpu: 'RTX 4090',
        ram: '64GB DDR5',
        storage: '4TB NVMe SSD',
        monitor: '32" 240Hz OLED',
        peripherals: ['Premium Mechanical Keyboard', 'Pro Gaming Mouse', 'Audiophile Headset']
      },
      features: ['Private Booth', 'RGB Lighting', 'Stream Ready', 'Premium Audio']
    }
  ]

  for (const station of gamingStations) {
    const existing = await prisma.gamingStation.findFirst({
      where: { name: station.name }
    })
    
    if (!existing) {
      await prisma.gamingStation.create({
        data: station
      })
    }
  }

  console.log('✅ Seeded gaming stations')

  // Seed VR experiences (Red Bank, TN market pricing)
  const vrExperiences = [
    {
      title: 'Cyberpunk City 2099',
      category: 'action',
      duration: 45,
      maxPlayers: 1,
      difficulty: 'hard',
      price: 3000, // $30 (Red Bank market)
      rating: 4.8,
      description: 'Immerse yourself in a futuristic cyberpunk world with stunning visuals and intense action.',
      features: ['Full Body Tracking', '360° Environment', 'Haptic Feedback'],
      requirements: ['Age 16+', 'No Motion Sickness'],
      isPopular: true,
      isNew: false
    },
    {
      title: 'Medieval Quest',
      category: 'adventure',
      duration: 60,
      maxPlayers: 4,
      difficulty: 'medium',
      price: 2500, // $25 (Red Bank market)
      rating: 4.6,
      description: 'Embark on an epic medieval adventure with friends in this multiplayer quest.',
      features: ['Multiplayer Co-op', 'Voice Chat', 'Dynamic Storyline'],
      requirements: ['Age 12+', 'Team of 2-4 players'],
      isPopular: true,
      isNew: true
    }
  ]

  for (const experience of vrExperiences) {
    const existing = await prisma.vRExperience.findFirst({
      where: { title: experience.title }
    })
    
    if (!existing) {
      await prisma.vRExperience.create({
        data: experience
      })
    }
  }

  console.log('✅ Seeded VR experiences')

  // Seed streaming studios
  const streamingStudios = [
    {
      name: 'Creator Studio Pro',
      type: 'professional',
      hourlyRate: 7500, // $75
      capacity: 3,
      equipment: {
        cameras: ['3x 4K Sony Cameras', 'Overhead Camera', 'Green Screen Setup'],
        microphones: ['Professional Shotgun Mic', '2x Wireless Lavalier Mics'],
        lighting: ['LED Panel Kit', 'RGB Accent Lighting', 'Softbox Setup'],
        streaming: ['Dual PC Setup', 'Stream Deck', 'Audio Interface'],
        extras: ['Teleprompter', 'Multiple Monitor Setup']
      },
      features: ['Real-time Editing', 'Multi-platform Streaming', 'Cloud Storage'],
      specifications: {
        resolution: '4K 60fps',
        frameRate: '60fps',
        audio: 'Professional Grade',
        streaming: ['YouTube', 'Twitch', 'TikTok', 'Discord']
      }
    }
  ]

  for (const studio of streamingStudios) {
    const existing = await prisma.streamingStudio.findFirst({
      where: { name: studio.name }
    })
    
    if (!existing) {
      await prisma.streamingStudio.create({
        data: studio
      })
    }
  }

  console.log('✅ Seeded streaming studios')

  // Seed server packages
  const serverPackages = [
    {
      name: 'Gaming Starter',
      tier: 'starter',
      monthlyPrice: 4999, // $49.99
      setupFee: 0,
      specifications: {
        cpu: '4 vCPU Cores',
        ram: '8GB RAM',
        storage: '100GB NVMe SSD',
        bandwidth: '1TB Transfer',
        uptime: '99.5%'
      },
      features: ['24/7 Support', 'DDoS Protection', 'Easy Setup'],
      gameSupport: ['Minecraft', 'CS:GO', 'Garry\'s Mod'],
      uptime: '99.5%',
      support: '24/7 Chat',
      maxPlayers: 20,
      isPopular: true
    },
    {
      name: 'Pro Gaming Server',
      tier: 'professional',
      monthlyPrice: 9999, // $99.99
      setupFee: 0,
      specifications: {
        cpu: '8 vCPU Cores',
        ram: '16GB RAM',
        storage: '250GB NVMe SSD',
        bandwidth: '2TB Transfer',
        uptime: '99.9%'
      },
      features: ['Priority Support', 'Advanced DDoS Protection', 'Custom Configs'],
      gameSupport: ['All Popular Games', 'Custom Mods', 'Private Builds'],
      uptime: '99.9%',
      support: '24/7 Priority',
      maxPlayers: 50,
      isRecommended: true
    }
  ]

  for (const pkg of serverPackages) {
    const existing = await prisma.serverPackage.findFirst({
      where: { name: pkg.name }
    })
    
    if (!existing) {
      await prisma.serverPackage.create({
        data: pkg
      })
    }
  }

  console.log('✅ Seeded server packages')

  // Seed menu items
  const menuItems = [
    {
      name: 'Energy Boost Combo',
      category: 'combos',
      price: 1299, // $12.99
      description: 'Energy drink + gaming snack combo for extended sessions',
      ingredients: ['Red Bull', 'Gaming Mix Nuts', 'Protein Bar'],
      nutritionalInfo: { calories: 450, protein: 15, carbs: 45 },
      tags: ['energy', 'combo', 'popular'],
      isPopular: true,
      isNew: false
    },
    {
      name: 'Gamer\'s Pizza',
      category: 'meals',
      price: 1899, // $18.99
      description: 'Personal pizza designed for one-handed gaming',
      ingredients: ['Thin Crust', 'Pepperoni', 'Extra Cheese', 'Special Sauce'],
      nutritionalInfo: { calories: 720, protein: 28, carbs: 65 },
      tags: ['meal', 'pizza', 'one-handed'],
      isPopular: true,
      isNew: true
    }
  ]

  for (const item of menuItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { name: item.name }
    })
    
    if (!existing) {
      await prisma.menuItem.create({
        data: item
      })
    }
  }

  console.log('✅ Seeded menu items')

  // Add sample bookings for demo purposes
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  // Gaming station booking
  const gamingStationBooking = await prisma.booking.upsert({
    where: { id: 'demo-booking-1' },
    update: {},
    create: {
      id: 'demo-booking-1',
      userId: testCustomer.id,
      type: 'gaming-station',
      resourceId: 'phoenix-station',
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // 2 hours
      duration: 120,
      players: 1,
      totalPrice: 2000, // $20 for 2 hours
      status: 'confirmed',
      specialRequests: 'Looking forward to trying the new RTX 4080!'
    }
  })

  // VR experience booking
  const vrBooking = await prisma.booking.upsert({
    where: { id: 'demo-booking-2' },
    update: {},
    create: {
      id: 'demo-booking-2',
      userId: testCustomer.id,
      type: 'vr-experience',
      resourceId: 'cyberpunk-city-2099',
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 45 * 60 * 1000), // 45 minutes
      duration: 45,
      players: 1,
      totalPrice: 3000, // $30
      status: 'confirmed'
    }
  })

  // Streaming studio booking
  const studioBooking = await prisma.booking.upsert({
    where: { id: 'demo-booking-3' },
    update: {},
    create: {
      id: 'demo-booking-3',
      userId: testCreator.id,
      type: 'streaming-studio',
      resourceId: 'creator-studio-pro',
      startTime: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000), // Tomorrow evening
      endTime: new Date(tomorrow.getTime() + 6 * 60 * 60 * 1000), // 2 hours
      duration: 120,
      players: 3,
      totalPrice: 15000, // $150 for 2 hours
      status: 'confirmed',
      specialRequests: 'Recording a gaming tutorial series'
    }
  })

  console.log('✅ Created sample bookings')

  // Add sample food order
  const existingMenuItems = await prisma.menuItem.findMany()
  if (existingMenuItems.length > 0) {
    const sampleOrder = await prisma.order.upsert({
      where: { id: 'demo-order-1' },
      update: {},
      create: {
        id: 'demo-order-1',
        userId: testCustomer.id,
        status: 'completed',
        totalPrice: 3298, // Energy combo + pizza
        orderType: 'pickup',
        notes: 'Extra napkins please!'
      }
    })

    // Add order items
    for (const item of existingMenuItems) {
      await prisma.orderItem.upsert({
        where: { id: `demo-order-item-${item.id}` },
        update: {},
        create: {
          id: `demo-order-item-${item.id}`,
          orderId: sampleOrder.id,
          menuItemId: item.id,
          quantity: 1,
          price: item.price
        }
      })
    }

    console.log('✅ Created sample food order')
  }

  // Add sample server subscription
  const existingServerPackages = await prisma.serverPackage.findMany()
  if (existingServerPackages.length > 0) {
    const subscription = await prisma.serverSubscription.upsert({
      where: { id: 'demo-subscription-1' },
      update: {},
      create: {
        id: 'demo-subscription-1',
        userId: testBusiness.id,
        packageId: existingServerPackages[0].id,
        status: 'active',
        nextBillingDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    })

    console.log('✅ Created sample server subscription')
  }

  // Add sample reviews
  const reviews = [
    {
      id: 'demo-review-1',
      userId: testCustomer.id,
      type: 'station',
      resourceId: 'phoenix-station',
      rating: 5,
      comment: 'Amazing setup! The RTX 4080 runs everything at max settings. Definitely coming back!'
    },
    {
      id: 'demo-review-2',
      userId: testCreator.id,
      type: 'studio',
      resourceId: 'creator-studio-pro',
      rating: 5,
      comment: 'Professional quality equipment and great setup. Perfect for content creation!'
    }
  ]

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review
    })
  }

  console.log('✅ Created sample reviews')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
