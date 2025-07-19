
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, Wifi, Shield, Cloud, Zap } from 'lucide-react'

const technicalSpecs = [
  {
    category: 'Gaming Infrastructure',
    icon: Cpu,
    items: [
      { spec: 'RTX 4090 Graphics Cards', value: '50 Units', highlight: true },
      { spec: 'Intel i9-14900K Processors', value: '50 Units', highlight: true },
      { spec: '32GB DDR5 Memory', value: 'Per Station', highlight: false },
      { spec: '4K Gaming Monitors', value: '144Hz+', highlight: false }
    ]
  },
  {
    category: 'VR Technology',
    icon: HardDrive,
    items: [
      { spec: 'HTC Vive Pro 2 Headsets', value: '8 Units', highlight: true },
      { spec: 'Room-Scale Tracking', value: '3.5m x 3.5m', highlight: false },
      { spec: 'Lighthouse Base Stations', value: '16 Units', highlight: false },
      { spec: '5K Resolution Display', value: 'Per Headset', highlight: false }
    ]
  },
  {
    category: 'Streaming Equipment',
    icon: Cloud,
    items: [
      { spec: '4K Professional Cameras', value: '16 Units', highlight: true },
      { spec: 'Professional Lighting Rigs', value: '4 Studios', highlight: false },
      { spec: 'Audio Production Suite', value: 'Full Setup', highlight: false },
      { spec: 'Live Streaming Capability', value: '4K60fps', highlight: false }
    ]
  },
  {
    category: 'Network Infrastructure',
    icon: Wifi,
    items: [
      { spec: 'Fiber Internet Connection', value: '10Gbps', highlight: true },
      { spec: 'Low-Latency Gaming Network', value: '<5ms', highlight: true },
      { spec: 'Dedicated Gaming VLANs', value: 'Segmented', highlight: false },
      { spec: 'Enterprise Wi-Fi 6E', value: 'Full Coverage', highlight: false }
    ]
  },
  {
    category: 'Server Hosting',
    icon: Shield,
    items: [
      { spec: 'Proxmox Virtualization', value: 'GPU Passthrough', highlight: true },
      { spec: 'Enterprise Hardware', value: '24/7 Operation', highlight: false },
      { spec: 'DDoS Protection', value: 'Enterprise Grade', highlight: false },
      { spec: 'Automated Provisioning', value: 'Terraform/Ansible', highlight: false }
    ]
  },
  {
    category: 'Automation & Software',
    icon: Zap,
    items: [
      { spec: 'Booking Management System', value: 'Real-time', highlight: true },
      { spec: 'Payment Processing', value: 'Integrated', highlight: false },
      { spec: 'Customer Dashboard', value: 'Web & Mobile', highlight: false },
      { spec: 'Analytics Platform', value: 'Business Intelligence', highlight: false }
    ]
  }
]

export function TechnicalCapabilities() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Industry-leading infrastructure designed for performance, reliability, and scalability
          </p>
        </motion.div>

        {/* Technical Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technicalSpecs.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.spec} className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{item.spec}</span>
                        <Badge 
                          variant={item.highlight ? "default" : "secondary"}
                          className={item.highlight ? "bg-blue-600 hover:bg-blue-700" : ""}
                        >
                          {item.value}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Technology Advantages */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Cpu className="h-6 w-6 mr-3 text-blue-500" />
                Performance Leadership
              </CardTitle>
              <CardDescription className="text-gray-400">
                Best-in-class hardware specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Gaming Performance</span>
                  <span className="text-white font-semibold">4K Ultra Settings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VR Capability</span>
                  <span className="text-white font-semibold">5K per Eye</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Streaming Quality</span>
                  <span className="text-white font-semibold">4K60 Broadcast</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network Latency</span>
                  <span className="text-white font-semibold">&lt;5ms Response</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Shield className="h-6 w-6 mr-3 text-green-500" />
                Reliability & Security
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enterprise-grade infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">System Uptime</span>
                  <span className="text-white font-semibold">99.9% SLA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Protection</span>
                  <span className="text-white font-semibold">Enterprise Backup</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DDoS Protection</span>
                  <span className="text-white font-semibold">Multi-layer Defense</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monitoring</span>
                  <span className="text-white font-semibold">24/7 Automated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Investment in Technology */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Technology Investment Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">$485K</div>
              <div className="text-white font-semibold mb-1">Technology Infrastructure</div>
              <div className="text-sm text-gray-400">55% of total investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$225K</div>
              <div className="text-white font-semibold mb-1">Gaming Hardware</div>
              <div className="text-sm text-gray-400">50 premium stations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$100K</div>
              <div className="text-white font-semibold mb-1">Streaming Studios</div>
              <div className="text-sm text-gray-400">4 professional setups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">$68K</div>
              <div className="text-white font-semibold mb-1">VR Systems</div>
              <div className="text-sm text-gray-400">8 complete stations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
