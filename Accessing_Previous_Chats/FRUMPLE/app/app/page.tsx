
import { HeroSection } from '@/components/hero-section'
import { ServicesGrid } from '@/components/services-grid'
import { StatsSection } from '@/components/stats-section'
import { FeaturedPackages } from '@/components/featured-packages'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CTASection } from '@/components/cta-section'
import { Navigation } from '@/components/navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesGrid />
        <StatsSection />
        <FeaturedPackages />
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  )
}
