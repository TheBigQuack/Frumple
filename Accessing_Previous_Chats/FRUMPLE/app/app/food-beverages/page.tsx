
import { FoodBeveragesClient } from './food-beverages-client'
import { Navigation } from '@/components/navigation'

export default function FoodBeveragesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <FoodBeveragesClient />
    </div>
  )
}
