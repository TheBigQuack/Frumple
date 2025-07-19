
export interface User {
  id: string
  name?: string | null
  email: string
  role: 'CUSTOMER' | 'ADMIN' | 'INVESTOR' | 'STAFF'
  membershipId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface GamingStation {
  id: string
  name: string
  type: 'STANDARD' | 'PREMIUM' | 'ELITE' | 'CONSOLE'
  description?: string | null
  hourlyRate: number
  isActive: boolean
  specs?: any
  createdAt: Date
  updatedAt: Date
}

export interface GamingBooking {
  id: string
  userId: string
  stationId: string
  startTime: Date
  endTime: Date
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  totalAmount: number
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  specialRequests?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  station?: GamingStation
}

export interface VrStation {
  id: string
  name: string
  type: 'SOLO_30MIN' | 'SOLO_60MIN' | 'GROUP' | 'PREMIUM'
  description?: string | null
  price: number
  duration: number
  maxPlayers: number
  isActive: boolean
  equipment?: any
  createdAt: Date
  updatedAt: Date
}

export interface VrBooking {
  id: string
  userId: string
  stationId: string
  startTime: Date
  endTime: Date
  playerCount: number
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  totalAmount: number
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  specialRequests?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  station?: VrStation
}

export interface StreamingStudio {
  id: string
  name: string
  type: 'BASIC' | 'PROFESSIONAL' | 'PREMIUM'
  description?: string | null
  hourlyRate: number
  equipment?: any
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface StreamingBooking {
  id: string
  userId: string
  studioId: string
  startTime: Date
  endTime: Date
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  totalAmount: number
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  techSupport: boolean
  specialRequests?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  studio?: StreamingStudio
}

export interface ServerSubscription {
  id: string
  userId: string
  serverName: string
  gameType: string
  plan: string
  monthlyPrice: number
  status: string
  specifications?: any
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface MenuItem {
  id: string
  name: string
  description?: string | null
  price: number
  category: string
  isAvailable: boolean
  imageUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  totalAmount: number
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  deliveryNotes?: string | null
  location?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  orderItems?: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  menuItemId: string
  quantity: number
  price: number
  createdAt: Date
  order?: Order
  menuItem?: MenuItem
}

export interface Event {
  id: string
  title: string
  description?: string | null
  eventType: string
  startTime: Date
  endTime: Date
  maxPlayers?: number | null
  entryFee?: number | null
  prizePool?: number | null
  isActive: boolean
  imageUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface BusinessMetrics {
  id: string
  date: Date
  dailyRevenue: number
  gamingRevenue: number
  vrRevenue: number
  streamingRevenue: number
  serverRevenue: number
  foodRevenue: number
  customerCount: number
  utilizationRate: number
  createdAt: Date
}

export interface ContactForm {
  id: string
  name: string
  email: string
  subject: string
  message: string
  formType: string
  status: string
  createdAt: Date
}

export interface Membership {
  id: string
  name: string
  tier: 'BASIC' | 'PREMIUM' | 'ELITE'
  monthlyFee: number
  benefits: any
  discount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
