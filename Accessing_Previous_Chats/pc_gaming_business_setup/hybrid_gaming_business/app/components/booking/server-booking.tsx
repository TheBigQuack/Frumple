
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Server, Shield, Zap, DollarSign } from 'lucide-react'

const serverPlans = [
  {
    plan: 'BASIC',
    name: 'Basic Server',
    monthlyPrice: 15,
    specs: {
      cpu: '2 vCPU',
      ram: '4GB RAM',
      storage: '50GB SSD',
      bandwidth: '1TB/month'
    },
    features: ['DDoS Protection', 'Daily Backups', 'Basic Support'],
    description: 'Perfect for small communities and casual gaming'
  },
  {
    plan: 'PREMIUM',
    name: 'Premium Server',
    monthlyPrice: 35,
    specs: {
      cpu: '4 vCPU',
      ram: '8GB RAM',
      storage: '100GB SSD',
      bandwidth: '2TB/month'
    },
    features: ['Advanced DDoS Protection', 'Hourly Backups', 'Priority Support', 'Custom Configs'],
    description: 'Ideal for competitive gaming and medium communities'
  },
  {
    plan: 'ENTERPRISE',
    name: 'Enterprise Server',
    monthlyPrice: 75,
    specs: {
      cpu: '8 vCPU',
      ram: '16GB RAM',
      storage: '250GB SSD',
      bandwidth: '5TB/month'
    },
    features: ['Enterprise DDoS Protection', 'Real-time Backups', '24/7 Dedicated Support', 'Full Root Access', 'Load Balancing'],
    description: 'For large tournaments and professional esports organizations'
  }
]

const gameTypes = [
  'Minecraft',
  'Counter-Strike 2',
  'Valorant',
  'Apex Legends',
  'Rust',
  'ARK: Survival Evolved',
  'Team Fortress 2',
  'Garry\'s Mod',
  'Left 4 Dead 2',
  'Custom/Other'
]

export function ServerBooking() {
  const { data: session } = useSession()
  const [selectedPlan, setSelectedPlan] = useState('')
  const [serverName, setServerName] = useState('')
  const [gameType, setGameType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscription = async () => {
    if (!session) {
      toast.error('Please sign in to create a server subscription')
      return
    }

    if (!selectedPlan || !serverName || !gameType) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const selectedPlanDetails = serverPlans.find(p => p.plan === selectedPlan)
      if (!selectedPlanDetails) return

      const response = await fetch('/api/server-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serverName,
          gameType,
          plan: selectedPlan,
          monthlyPrice: selectedPlanDetails.monthlyPrice,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Server subscription created successfully!')
        // Reset form
        setSelectedPlan('')
        setServerName('')
        setGameType('')
      } else {
        toast.error(result.message || 'Failed to create subscription')
      }
    } catch (error) {
      toast.error('An error occurred while creating the subscription')
      console.error('Subscription error:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedPlanDetails = serverPlans.find(p => p.plan === selectedPlan)

  return (
    <div className="space-y-6">
      {/* Server Plans */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Server Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serverPlans.map((plan) => (
            <Card 
              key={plan.plan}
              className={`cursor-pointer transition-all ${
                selectedPlan === plan.plan 
                  ? 'bg-orange-600/20 border-orange-500' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedPlan(plan.plan)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">{plan.name}</CardTitle>
                  <Badge variant="secondary">${plan.monthlyPrice}/mo</Badge>
                </div>
                <CardDescription className="text-sm text-gray-400">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Specifications:</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                    <div>{plan.specs.cpu}</div>
                    <div>{plan.specs.ram}</div>
                    <div>{plan.specs.storage}</div>
                    <div>{plan.specs.bandwidth}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Server Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Server Configuration</h3>
          
          <div>
            <Label htmlFor="serverName" className="text-sm font-medium text-gray-300">
              Server Name
            </Label>
            <Input
              id="serverName"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Enter your server name"
              className="mt-1 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="gameType" className="text-sm font-medium text-gray-300">
              Game Type
            </Label>
            <Select value={gameType} onValueChange={setGameType}>
              <SelectTrigger className="mt-1 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select game type" />
              </SelectTrigger>
              <SelectContent>
                {gameTypes.map((game) => (
                  <SelectItem key={game} value={game}>{game}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          {/* Subscription Summary */}
          {selectedPlan && serverName && gameType && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white flex items-center">
                  <Server className="h-4 w-4 mr-2" />
                  Subscription Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Plan:</span>
                  <span className="text-white">{selectedPlanDetails?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Server Name:</span>
                  <span className="text-white">{serverName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Game Type:</span>
                  <span className="text-white">{gameType}</span>
                </div>
                
                <div className="border-t border-gray-700 pt-3 space-y-2">
                  <h4 className="text-sm font-medium text-white">Plan Specs:</h4>
                  {selectedPlanDetails && (
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                      <div>{selectedPlanDetails.specs.cpu}</div>
                      <div>{selectedPlanDetails.specs.ram}</div>
                      <div>{selectedPlanDetails.specs.storage}</div>
                      <div>{selectedPlanDetails.specs.bandwidth}</div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Cost:</span>
                    <span className="text-white font-semibold">${selectedPlanDetails?.monthlyPrice}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Cancel anytime • 7-day free trial
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features Overview */}
          <Card className="bg-gray-900/30 border-gray-700 mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                What's Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-green-500" />
                  Instant server deployment
                </li>
                <li className="flex items-center">
                  <Shield className="h-3 w-3 mr-2 text-blue-500" />
                  DDoS protection included
                </li>
                <li className="flex items-center">
                  <Server className="h-3 w-3 mr-2 text-purple-500" />
                  99.9% uptime guarantee
                </li>
                <li className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-2 text-yellow-500" />
                  7-day money-back guarantee
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscribe Button */}
      <Button 
        onClick={handleSubscription}
        disabled={!selectedPlan || !serverName || !gameType || !session || loading}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
        size="lg"
      >
        {loading ? (
          <>
            <div className="loading-spinner mr-2"></div>
            Creating Subscription...
          </>
        ) : (
          <>
            <Server className="h-4 w-4 mr-2" />
            Start Subscription - ${selectedPlanDetails?.monthlyPrice}/month
          </>
        )}
      </Button>

      {!session && (
        <p className="text-center text-sm text-gray-400">
          Please sign in to create a server subscription
        </p>
      )}
    </div>
  )
}
