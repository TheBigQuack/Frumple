
import { GamingStationsClient } from './gaming-stations-client'
import { Navigation } from '@/components/navigation'

export default function GamingStationsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <GamingStationsClient />
    </div>
  )
}
