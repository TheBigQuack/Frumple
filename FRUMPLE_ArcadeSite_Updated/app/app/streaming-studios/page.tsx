
import { StreamingStudiosClient } from './streaming-studios-client'
import { Navigation } from '@/components/navigation'

export default function StreamingStudiosPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <StreamingStudiosClient />
    </div>
  )
}
