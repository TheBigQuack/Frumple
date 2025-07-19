
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Download, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function InvestorCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'investor',
          subject: 'Investment Inquiry - GameHub Elite'
        }),
      })

      if (response.ok) {
        toast.success('Thank you for your interest! We will contact you soon.')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Ready to Invest in
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future of Gaming?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join us in revolutionizing the gaming and entertainment industry with GameHub Elite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Our Investment Team</CardTitle>
                <CardDescription className="text-gray-400">
                  Get in touch to discuss this exciting opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 bg-gray-800 border-gray-700 text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 bg-gray-800 border-gray-700 text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-gray-300">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                      placeholder="Your company or investment firm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                      placeholder="Tell us about your investment interests and timeline..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Inquiry
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investment Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Access Protected Materials */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Protected Investor Materials
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Access detailed business plan and financial models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/investor/protected">
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    Access Detailed Business Plan
                  </Button>
                </Link>
                <Link href="/investor/financials">
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    View Interactive Financial Dashboard
                  </Button>
                </Link>
                <p className="text-xs text-gray-500">
                  Password required for access to confidential materials
                </p>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Investment Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Investment:</span>
                    <span className="text-white font-semibold">$875,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Break-even Period:</span>
                    <span className="text-white font-semibold">18 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">5-Year ROI:</span>
                    <span className="text-white font-semibold">312%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year 5 Revenue:</span>
                    <span className="text-white font-semibold">$3.57M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Size:</span>
                    <span className="text-white font-semibold">$45M Local</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Direct Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-300">investors@gamehubelite.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span className="text-gray-300">(555) 123-INVEST</span>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Our investment team typically responds within 24 hours during business days.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Don't miss this opportunity to be part of the next big thing in gaming and entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Schedule a Meeting
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Request Full Presentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
