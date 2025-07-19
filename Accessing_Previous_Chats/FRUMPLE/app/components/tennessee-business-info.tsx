
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Building2, 
  MapPin, 
  Users, 
  Shield,
  Award,
  Gamepad2,
  Trophy
} from 'lucide-react'

export function TennesseeBusinessInfo() {
  const businessLicenses = [
    {
      name: 'Business License',
      authority: 'City of Red Bank',
      requirement: 'Required for all businesses operating in Red Bank',
      status: 'Obtained',
      icon: FileText
    },
    {
      name: 'Food Service License',
      authority: 'Hamilton County Health Department',
      requirement: 'Required for food and beverage service',
      status: 'Obtained',
      icon: Shield
    },
    {
      name: 'State Sales Tax License',
      authority: 'Tennessee Department of Revenue',
      requirement: 'Required for retail sales and services',
      status: 'Obtained',
      icon: Building2
    },
    {
      name: 'Entertainment Venue Permit',
      authority: 'City of Red Bank',
      requirement: 'Required for entertainment and gaming venues',
      status: 'Obtained',
      icon: Award
    }
  ]

  const localCompetitors = [
    {
      name: 'GameTime',
      location: 'Chattanooga, TN',
      type: 'Arcade & Entertainment',
      distance: '8 miles',
      differentiator: 'Limited PC gaming options',
      icon: Gamepad2
    },
    {
      name: "Dave & Buster's",
      location: 'Hamilton Place Mall',
      type: 'Restaurant & Arcade',
      distance: '12 miles',
      differentiator: 'Focus on casual games, no VR',
      icon: Trophy
    },
    {
      name: 'TopGolf',
      location: 'Nashville, TN',
      type: 'Golf Entertainment',
      distance: '120 miles',
      differentiator: 'Golf-focused, different market',
      icon: MapPin
    }
  ]

  return (
    <div className="space-y-8">
      {/* Tennessee Business Licensing */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-xl font-orbitron text-white flex items-center">
            <Building2 className="w-5 h-5 text-green-400 mr-2" />
            Tennessee Business Compliance
          </CardTitle>
          <p className="text-gray-400 text-sm">
            FRUMPLE operates in full compliance with all Tennessee state and Red Bank city requirements
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessLicenses.map((license, index) => (
              <div key={license.name} className="border-l-2 border-green-500/30 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <license.icon className="w-4 h-4 text-green-400 mr-2" />
                    <span className="font-medium text-white">{license.name}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {license.status}
                  </Badge>
                </div>
                <p className="text-gray-400 text-xs mb-1">{license.authority}</p>
                <p className="text-gray-500 text-xs">{license.requirement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Local Competition Analysis */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-xl font-orbitron text-white flex items-center">
            <MapPin className="w-5 h-5 text-purple-400 mr-2" />
            Red Bank Market Position
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Strategic analysis of the local entertainment and gaming market in the Greater Chattanooga area
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {localCompetitors.map((competitor, index) => (
              <div key={competitor.name} className="flex items-center justify-between border border-gray-800 rounded-lg p-4">
                <div className="flex items-center">
                  <competitor.icon className="w-5 h-5 text-purple-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-white">{competitor.name}</h4>
                    <p className="text-gray-400 text-sm">{competitor.location} • {competitor.distance}</p>
                    <p className="text-gray-500 text-xs">{competitor.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-green-400/50 text-green-400 text-xs">
                    Advantage
                  </Badge>
                  <p className="text-gray-400 text-xs mt-1 max-w-32">{competitor.differentiator}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-lg p-4 border border-green-500/20">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Trophy className="w-4 h-4 text-green-400 mr-2" />
              FRUMPLE's Competitive Advantage
            </h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Only dedicated PC gaming hub with RTX 40-series hardware in Red Bank area</li>
              <li>• First VR experience center with full-body tracking in Hamilton County</li>
              <li>• Professional streaming studios not available at local competitors</li>
              <li>• Competitive Red Bank market pricing ($8-12/hour vs. Nashville $15-25)</li>
              <li>• Modern cyberpunk aesthetic targeting younger demographics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
