
import { VRExperiencesClient } from './vr-experiences-client'
import { Navigation } from '@/components/navigation'

export default function VRExperiencesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <VRExperiencesClient />
    </div>
  )
}
