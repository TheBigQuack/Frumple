
import { DashboardClient } from './dashboard-client'
import { Navigation } from '@/components/navigation'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <DashboardClient />
    </div>
  )
}
