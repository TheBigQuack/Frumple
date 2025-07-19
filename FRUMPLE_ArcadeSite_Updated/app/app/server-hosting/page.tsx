
import { ServerHostingClient } from './server-hosting-client'
import { Navigation } from '@/components/navigation'

export default function ServerHostingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ServerHostingClient />
    </div>
  )
}
