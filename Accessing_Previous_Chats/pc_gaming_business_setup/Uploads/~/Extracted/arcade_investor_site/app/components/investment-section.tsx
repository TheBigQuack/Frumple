
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Rocket, DollarSign, TrendingUp, Zap, Star, Shield } from "lucide-react"

export function InvestmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <>
      <section id="investment" className="py-20 bg-gaming-surface relative overflow-hidden">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        
        {/* Floating Gaming Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 text-neon-purple/10"
          >
            <Rocket className="w-48 h-48" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360, scale: [1, 0.9, 1] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 text-neon-green/10"
          >
            <Star className="w-40 h-40" />
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="relative inline-block mb-8">
              <Rocket className="w-16 h-16 text-neon-purple mx-auto animate-cyber-pulse" />
              <div className="absolute inset-0 w-16 h-16 bg-neon-purple/20 rounded-full animate-ping mx-auto"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-cyber">
              <span className="glitch-text neon-text" data-text="JOIN US IN DEFINING THE NEXT GENERATION">
                JOIN US IN DEFINING THE NEXT GENERATION
              </span>
              <br />
              <span className="neon-text-green animate-cyber-pulse">OF ENTERTAINMENT</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-gaming">
              The convergence of <span className="text-neon-purple font-semibold">Millennial nostalgia</span>, Gen Z's desire for authentic social 
              experiences, and the broader shift toward <span className="text-neon-green font-semibold">location-based entertainment</span> creates 
              a substantial and growing market opportunity.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="gaming-card p-6 text-center group hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-neon-green animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-neon-green mb-2 font-cyber neon-text-green">$450,000</h3>
                <p className="text-gray-300 font-gaming font-semibold">Series A Investment</p>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse shadow-neon-green"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="gaming-card p-6 text-center group hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-neon-purple animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-neon-purple mb-2 font-cyber neon-text">25%</h3>
                <p className="text-gray-300 font-gaming font-semibold">Equity Offering</p>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse shadow-neon-purple"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="gaming-card p-6 text-center group hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-neon-green animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-neon-green mb-2 font-cyber neon-text-green">$1.6M</h3>
                <p className="text-gray-300 font-gaming font-semibold">Year 5 Revenue Target</p>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse shadow-neon-green"></div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="gaming-card p-8 mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-neon-purple mr-3 animate-pulse" />
                <h3 className="text-2xl font-bold text-neon-purple font-cyber tracking-wide">INVESTMENT HIGHLIGHTS</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <div className="flex items-center mb-4">
                    <Star className="w-6 h-6 text-neon-green mr-2 animate-pulse" />
                    <h4 className="text-neon-green font-semibold font-cyber">IMMEDIATE OPPORTUNITIES</h4>
                  </div>
                  <ul className="text-gray-300 space-y-3 font-gaming">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-green rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Proven business model with established market demand</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-green rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Technology-driven cost advantages over competitors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-green rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Legal compliance providing sustainable competitive moat</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-green rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Experienced management team with industry expertise</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <Rocket className="w-6 h-6 text-neon-purple mr-2 animate-pulse" />
                    <h4 className="text-neon-purple font-semibold font-cyber">GROWTH POTENTIAL</h4>
                  </div>
                  <ul className="text-gray-300 space-y-3 font-gaming">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Scalable technology platform for multi-location expansion</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Franchise opportunities in underserved markets</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Premium experience commanding higher margins</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 animate-pulse"></div>
                      <span>Strong demographic tailwinds supporting long-term growth</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6">
                <div className="flex items-center space-x-4 text-neon-green font-gaming font-semibold">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span>SECURE YOUR POSITION IN THE FUTURE</span>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                </div>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="cyber-button text-xl group relative overflow-hidden"
              >
                <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                <span className="font-gaming font-bold tracking-wide">REQUEST FULL BUSINESS PLAN & FINANCIALS</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Section Divider */}
        <div className="section-divider"></div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
