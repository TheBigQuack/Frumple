
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Download, FileText, BarChart } from 'lucide-react'

export default function ProtectedInvestorPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <Lock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Protected Investor Materials
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Access detailed business plan, financial models, and confidential investor documentation
            </p>
          </div>

          <Card className="bg-gray-900/50 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Access Required</CardTitle>
              <CardDescription className="text-gray-400">
                Please enter the access code provided to you to view confidential materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="accessCode" className="text-gray-300">Access Code</Label>
                  <Input
                    id="accessCode"
                    type="password"
                    placeholder="Enter access code"
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Access Materials
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/30 border-gray-700">
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Comprehensive Business Plan</CardTitle>
                <CardDescription>Complete 50-page business plan with market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Executive Summary</li>
                  <li>• Market Analysis & Competitive Landscape</li>
                  <li>• Financial Projections & Modeling</li>
                  <li>• Risk Analysis & Mitigation Strategies</li>
                  <li>• Implementation Timeline</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 border-gray-700">
              <CardHeader>
                <BarChart className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle className="text-white">Financial Models</CardTitle>
                <CardDescription>Detailed Excel models with 5-year projections</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Revenue Forecasting Model</li>
                  <li>• Cash Flow Projections</li>
                  <li>• Break-even Analysis</li>
                  <li>• Sensitivity Analysis</li>
                  <li>• ROI Calculations</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-blue-900/20 border-blue-700">
              <CardContent className="pt-6">
                <p className="text-blue-200 mb-4">
                  <strong>Note:</strong> These materials are confidential and proprietary. 
                  Access is restricted to qualified investors and authorized parties only.
                </p>
                <p className="text-blue-300 text-sm">
                  For access credentials, please contact our investor relations team at 
                  <a href="mailto:investors@gamehubelite.com" className="underline ml-1">
                    investors@gamehubelite.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
