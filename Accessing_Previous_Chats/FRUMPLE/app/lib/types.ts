
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: string
}

export interface GamingStation {
  id: string
  name: string
  type: 'standard' | 'premium' | 'vip'
  status: 'available' | 'occupied' | 'maintenance'
  hourlyRate: number
  specifications: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    monitor: string
    peripherals: string[]
  }
  features: string[]
}

export interface VRExperience {
  id: string
  title: string
  category: 'action' | 'adventure' | 'simulation' | 'horror' | 'education' | 'multiplayer'
  duration: number
  maxPlayers: number
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme'
  price: number
  rating?: number
  description: string
  features: string[]
  requirements: string[]
  isPopular?: boolean
  isNew?: boolean
}

export interface StreamingStudio {
  id: string
  name: string
  type: 'basic' | 'professional' | 'premium' | 'enterprise'
  status: 'available' | 'occupied' | 'maintenance'
  hourlyRate: number
  capacity: number
  equipment: {
    cameras: string[]
    microphones: string[]
    lighting: string[]
    streaming: string[]
    extras: string[]
  }
  features: string[]
  specifications: {
    resolution: string
    frameRate: string
    audio: string
    streaming: string[]
  }
}

export interface Booking {
  id: string
  userId: string
  type: 'gaming-station' | 'vr-experience' | 'streaming-studio'
  resourceId: string
  startTime: Date
  endTime: Date
  duration: number
  players: number
  totalPrice: number
  status: 'confirmed' | 'cancelled' | 'completed'
  specialRequests?: string
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role?: string
      firstName?: string
      lastName?: string
    }
  }

  interface User {
    role?: string
    firstName?: string
    lastName?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    firstName?: string
    lastName?: string
  }
}
