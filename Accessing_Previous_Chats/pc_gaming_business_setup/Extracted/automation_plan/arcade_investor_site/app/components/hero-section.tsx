
"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Play, Zap, Gamepad2, Trophy } from "lucide-react"

export function HeroSection() {
  const scrollToOpportunity = () => {
    const element = document.getElementById("opportunity")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Gaming Background with Cyber Grid */}
      <div className="absolute inset-0 bg-gaming-gradient">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gaming-bg/50 to-gaming-bg/90"></div>
      </div>
      
      {/* Floating Gaming Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 text-neon-purple/30"
        >
          <Gamepad2 className="w-16 h-16 animate-pulse" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 text-neon-green/30"
        >
          <Trophy className="w-12 h-12 animate-pulse" />
        </motion.div>
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 text-neon-purple/20"
        >
          <Play className="w-14 h-14 animate-pulse" />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <Zap className="w-20 h-20 text-neon-green mx-auto mb-4 animate-cyber-pulse" />
            <div className="absolute inset-0 w-20 h-20 bg-neon-green/20 rounded-full animate-ping mx-auto"></div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold mb-6 tracking-wide font-cyber"
        >
          <span className="glitch-text neon-text" data-text="THE FUTURE OF">
            THE FUTURE OF
          </span>
          <br />
          <span className="neon-text-green animate-cyber-pulse">
            GAMING ENTERTAINMENT
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed font-gaming"
        >
          An investment opportunity in the nexus of{" "}
          <span className="text-neon-purple font-semibold">premium gaming</span>, 
          <span className="text-neon-green font-semibold"> craft beverages</span>, and{" "}
          <span className="text-neon-purple font-semibold">authentic experiences</span>.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToOpportunity}
            size="lg"
            className="cyber-button group relative overflow-hidden text-lg"
          >
            <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            <span className="font-gaming font-bold tracking-wide">EXPLORE THE OPPORTUNITY</span>
          </Button>
          
          <div className="flex items-center space-x-4 text-neon-green font-gaming font-semibold">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span>LIVE INVESTMENT PORTAL</span>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          </div>
        </motion.div>
        
        {/* Gaming Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-neon-purple font-cyber">$2.7B</div>
            <div className="text-sm text-gray-400 font-gaming">Market Size</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-neon-green font-cyber">156%</div>
            <div className="text-sm text-gray-400 font-gaming">Growth Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-neon-purple font-cyber">24/7</div>
            <div className="text-sm text-gray-400 font-gaming">Gaming Access</div>
          </div>
        </motion.div>
      </div>
      
      {/* Animated Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider"></div>
      </div>
    </section>
  )
}
