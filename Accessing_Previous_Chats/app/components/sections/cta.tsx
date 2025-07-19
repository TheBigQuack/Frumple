
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Phone } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Ready to Experience
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future of Gaming?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of gamers, creators, and esports enthusiasts who have made GameHub Elite their home.
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/booking">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
                <Calendar className="h-5 w-5 mr-2" />
                Book Your Session
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-black">
                <Phone className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="pt-8 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm mb-4">Special Launch Pricing - Limited Time Offer</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <span>• 20% off first month membership</span>
              <span>• Free VR session with gaming package</span>
              <span>• Complimentary technical setup</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
