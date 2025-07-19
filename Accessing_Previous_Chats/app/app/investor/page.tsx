
import { InvestorOverview } from '@/components/investor/investor-overview'
import { MarketOpportunity } from '@/components/investor/market-opportunity'
import { FinancialHighlights } from '@/components/investor/financial-highlights'
import { BusinessModel } from '@/components/investor/business-model'
import { TechnicalCapabilities } from '@/components/investor/technical-capabilities'
import { InvestorCTA } from '@/components/investor/investor-cta'
import { Footer } from '@/components/layout/footer'

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <main className="pt-16">
        <InvestorOverview />
        <MarketOpportunity />
        <FinancialHighlights />
        <BusinessModel />
        <TechnicalCapabilities />
        <InvestorCTA />
      </main>
      <Footer />
    </div>
  )
}
