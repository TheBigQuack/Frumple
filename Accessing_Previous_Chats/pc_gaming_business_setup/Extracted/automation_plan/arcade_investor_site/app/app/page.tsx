
import { HeroSection } from "@/components/hero-section"
import { OpportunitySection } from "@/components/opportunity-section"
import { BusinessModelSection } from "@/components/business-model-section"
import { FinancialsSection } from "@/components/financials-section"
import { InvestmentSection } from "@/components/investment-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <HeroSection />
        <OpportunitySection />
        <BusinessModelSection />
        <FinancialsSection />
        <InvestmentSection />
      </main>
      <Footer />
    </div>
  )
}
