
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      role: 'ADMIN'
    }
  })

  console.log('✅ Created test user:', testUser.email)

  // Create memberships
  const memberships = await Promise.all([
    prisma.membership.upsert({
      where: { id: 'basic-membership' },
      update: {},
      create: {
        id: 'basic-membership',
        name: 'Basic Membership',
        tier: 'BASIC',
        monthlyFee: 89,
        benefits: {
          gaming: '20% off gaming sessions',
          food: '10% off food & beverage',
          features: ['Priority booking', 'Member events']
        },
        discount: 20
      }
    }),
    prisma.membership.upsert({
      where: { id: 'premium-membership' },
      update: {},
      create: {
        id: 'premium-membership',
        name: 'Premium Membership',
        tier: 'PREMIUM',
        monthlyFee: 149,
        benefits: {
          gaming: '40% off gaming sessions',
          food: '15% off food & beverage',
          vr: '2 free VR sessions monthly',
          features: ['Priority booking', 'Member events', 'Exclusive tournaments']
        },
        discount: 40
      }
    }),
    prisma.membership.upsert({
      where: { id: 'elite-membership' },
      update: {},
      create: {
        id: 'elite-membership',
        name: 'Elite Membership',
        tier: 'ELITE',
        monthlyFee: 199,
        benefits: {
          gaming: '50% off gaming sessions',
          food: '20% off food & beverage',
          vr: '4 free VR sessions monthly',
          features: ['Priority booking', 'Member events', 'Exclusive tournaments', 'Private events']
        },
        discount: 50
      }
    })
  ])

  console.log('✅ Created memberships')

  // Create gaming stations
  const gamingStations = await Promise.all([
    // Standard stations
    ...Array.from({ length: 30 }, (_, i) => 
      prisma.gamingStation.upsert({
        where: { id: `standard-${i + 1}` },
        update: {},
        create: {
          id: `standard-${i + 1}`,
          name: `Standard Gaming Station ${i + 1}`,
          type: 'STANDARD',
          description: 'RTX 4070, i7-13700K, 1440p Monitor',
          hourlyRate: 8,
          specs: {
            cpu: 'Intel i7-13700K',
            gpu: 'RTX 4070',
            ram: '32GB DDR5',
            storage: '1TB NVMe SSD',
            monitor: '27" 1440p 144Hz'
          }
        }
      })
    ),
    // Premium stations
    ...Array.from({ length: 15 }, (_, i) => 
      prisma.gamingStation.upsert({
        where: { id: `premium-${i + 1}` },
        update: {},
        create: {
          id: `premium-${i + 1}`,
          name: `Premium Gaming Station ${i + 1}`,
          type: 'PREMIUM',
          description: 'RTX 4080, i9-14900K, 4K Monitor',
          hourlyRate: 12,
          specs: {
            cpu: 'Intel i9-14900K',
            gpu: 'RTX 4080',
            ram: '32GB DDR5',
            storage: '2TB NVMe SSD',
            monitor: '32" 4K 144Hz'
          }
        }
      })
    ),
    // Elite stations
    ...Array.from({ length: 5 }, (_, i) => 
      prisma.gamingStation.upsert({
        where: { id: `elite-${i + 1}` },
        update: {},
        create: {
          id: `elite-${i + 1}`,
          name: `Elite Gaming Station ${i + 1}`,
          type: 'ELITE',
          description: 'RTX 4090, i9-14900KS, Dual 4K Monitors',
          hourlyRate: 15,
          specs: {
            cpu: 'Intel i9-14900KS',
            gpu: 'RTX 4090',
            ram: '64GB DDR5',
            storage: '4TB NVMe SSD',
            monitor: 'Dual 32" 4K 144Hz'
          }
        }
      })
    )
  ])

  console.log('✅ Created gaming stations')

  // Create VR stations
  const vrStations = await Promise.all([
    ...Array.from({ length: 8 }, (_, i) => 
      prisma.vrStation.upsert({
        where: { id: `vr-${i + 1}` },
        update: {},
        create: {
          id: `vr-${i + 1}`,
          name: `VR Station ${i + 1}`,
          type: i < 4 ? 'SOLO_30MIN' : 'GROUP',
          description: 'HTC Vive Pro 2 with room-scale tracking',
          price: i < 4 ? 25 : 120,
          duration: i < 4 ? 30 : 45,
          maxPlayers: i < 4 ? 1 : 4,
          equipment: {
            headset: 'HTC Vive Pro 2',
            tracking: 'Room-scale with Lighthouse',
            controllers: 'Vive Controllers',
            playArea: '3.5m x 3.5m'
          }
        }
      })
    )
  ])

  console.log('✅ Created VR stations')

  // Create streaming studios
  const streamingStudios = await Promise.all([
    prisma.streamingStudio.upsert({
      where: { id: 'basic-studio-1' },
      update: {},
      create: {
        id: 'basic-studio-1',
        name: 'Basic Streaming Studio A',
        type: 'BASIC',
        description: 'Single camera setup with basic lighting',
        hourlyRate: 50,
        equipment: {
          cameras: '1080p Webcam',
          lighting: 'Basic LED Panel',
          audio: 'USB Microphone',
          software: 'OBS Studio'
        }
      }
    }),
    prisma.streamingStudio.upsert({
      where: { id: 'professional-studio-1' },
      update: {},
      create: {
        id: 'professional-studio-1',
        name: 'Professional Streaming Studio A',
        type: 'PROFESSIONAL',
        description: 'Multi-camera setup with advanced lighting',
        hourlyRate: 75,
        equipment: {
          cameras: '4K Multi-Camera Setup',
          lighting: 'Professional LED Rig',
          audio: 'Professional Audio Interface',
          software: 'Advanced Streaming Suite'
        }
      }
    }),
    prisma.streamingStudio.upsert({
      where: { id: 'professional-studio-2' },
      update: {},
      create: {
        id: 'professional-studio-2',
        name: 'Professional Streaming Studio B',
        type: 'PROFESSIONAL',
        description: 'Multi-camera setup with advanced lighting',
        hourlyRate: 75,
        equipment: {
          cameras: '4K Multi-Camera Setup',
          lighting: 'Professional LED Rig',
          audio: 'Professional Audio Interface',
          software: 'Advanced Streaming Suite'
        }
      }
    }),
    prisma.streamingStudio.upsert({
      where: { id: 'premium-studio-1' },
      update: {},
      create: {
        id: 'premium-studio-1',
        name: 'Premium Streaming Studio',
        type: 'PREMIUM',
        description: 'Full production suite with premium equipment',
        hourlyRate: 100,
        equipment: {
          cameras: '4K Broadcast Quality',
          lighting: 'Professional Lighting Rig',
          audio: 'Premium Audio Suite',
          software: 'Live Production Tools'
        }
      }
    })
  ])

  console.log('✅ Created streaming studios')

  // Create menu items
  const menuItems = await Promise.all([
    prisma.menuItem.upsert({
      where: { id: 'gaming-fuel-coffee' },
      update: {},
      create: {
        id: 'gaming-fuel-coffee',
        name: 'Gaming Fuel Coffee',
        description: 'High-caffeine blend for extended gaming sessions',
        price: 4.50,
        category: 'Beverages',
        isAvailable: true
      }
    }),
    prisma.menuItem.upsert({
      where: { id: 'energy-boost-smoothie' },
      update: {},
      create: {
        id: 'energy-boost-smoothie',
        name: 'Energy Boost Smoothie',
        description: 'Protein-packed smoothie with natural energy boosters',
        price: 6.99,
        category: 'Beverages',
        isAvailable: true
      }
    }),
    prisma.menuItem.upsert({
      where: { id: 'victory-sandwich' },
      update: {},
      create: {
        id: 'victory-sandwich',
        name: 'Victory Sandwich',
        description: 'Premium gaming sandwich designed for one-handed eating',
        price: 12.99,
        category: 'Food',
        isAvailable: true
      }
    }),
    prisma.menuItem.upsert({
      where: { id: 'gamers-trail-mix' },
      update: {},
      create: {
        id: 'gamers-trail-mix',
        name: "Gamer's Trail Mix",
        description: 'Premium nuts and dried fruits for sustained energy',
        price: 5.99,
        category: 'Snacks',
        isAvailable: true
      }
    }),
    prisma.menuItem.upsert({
      where: { id: 'pixel-pizza-slice' },
      update: {},
      create: {
        id: 'pixel-pizza-slice',
        name: 'Pixel Pizza Slice',
        description: 'Artisan pizza slice with gamer-friendly toppings',
        price: 8.99,
        category: 'Food',
        isAvailable: true
      }
    }),
    prisma.menuItem.upsert({
      where: { id: 'hydration-station' },
      update: {},
      create: {
        id: 'hydration-station',
        name: 'Hydration Station',
        description: 'Electrolyte-enhanced water with natural flavors',
        price: 2.99,
        category: 'Beverages',
        isAvailable: true
      }
    })
  ])

  console.log('✅ Created menu items')

  // Create sample events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { id: 'tournament-csgo-weekly' },
      update: {},
      create: {
        id: 'tournament-csgo-weekly',
        title: 'Weekly CS:GO Tournament',
        description: 'Competitive Counter-Strike tournament with cash prizes',
        eventType: 'Tournament',
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours later
        maxPlayers: 32,
        entryFee: 25,
        prizePool: 500
      }
    }),
    prisma.event.upsert({
      where: { id: 'vr-night' },
      update: {},
      create: {
        id: 'vr-night',
        title: 'VR Experience Night',
        description: 'Special VR gaming event with multiplayer experiences',
        eventType: 'Social',
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours later
        maxPlayers: 16,
        entryFee: 15,
        prizePool: null
      }
    }),
    prisma.event.upsert({
      where: { id: 'streaming-workshop' },
      update: {},
      create: {
        id: 'streaming-workshop',
        title: 'Content Creation Workshop',
        description: 'Learn professional streaming and content creation techniques',
        eventType: 'Workshop',
        startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // In 10 days
        endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
        maxPlayers: 12,
        entryFee: 35,
        prizePool: null
      }
    })
  ])

  console.log('✅ Created sample events')

  // Create business metrics for the last 30 days
  const today = new Date()
  const businessMetrics = []

  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const baseRevenue = 3000 + Math.random() * 1000
    const gaming = baseRevenue * 0.4
    const vr = baseRevenue * 0.2
    const streaming = baseRevenue * 0.15
    const server = baseRevenue * 0.1
    const food = baseRevenue * 0.15
    
    businessMetrics.push(
      prisma.businessMetrics.upsert({
        where: { date },
        update: {},
        create: {
          date,
          dailyRevenue: baseRevenue,
          gamingRevenue: gaming,
          vrRevenue: vr,
          streamingRevenue: streaming,
          serverRevenue: server,
          foodRevenue: food,
          customerCount: Math.floor(80 + Math.random() * 40),
          utilizationRate: 0.65 + Math.random() * 0.25
        }
      })
    )
  }

  await Promise.all(businessMetrics)
  console.log('✅ Created business metrics')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
