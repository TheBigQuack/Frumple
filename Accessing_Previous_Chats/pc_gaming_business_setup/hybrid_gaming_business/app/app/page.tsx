
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Stats } from '@/components/sections/stats'
import { Features } from '@/components/sections/features'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="pt-16">
        <Hero />
        <Services />
        <Stats />
        <Features />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
