
"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface CountUpCardProps {
  icon: LucideIcon
  title: string
  value: string
  subtitle: string
  description: string
  delay?: number
}

export function CountUpCard({ icon: Icon, title, value, subtitle, description, delay = 0 }: CountUpCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (inView) {
      // Simple animation for the value
      setTimeout(() => {
        setDisplayValue(value)
      }, delay * 1000)
    }
  }, [inView, value, delay])

  // Alternate between purple and green for visual variety
  const isEven = (title?.length ?? 0) % 2 === 0
  const primaryColor = isEven ? "neon-purple" : "neon-green"
  const secondaryColor = isEven ? "neon-green" : "neon-purple"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group"
    >
      <div className="gaming-card p-6 hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden
              ${isEven ? 'bg-gradient-to-br from-neon-purple to-neon-purple/70' : 'bg-gradient-to-br from-neon-green to-neon-green/70'}`}>
              <Icon className={`w-8 h-8 text-white animate-cyber-pulse group-hover:animate-pulse`} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold text-white mb-1 font-cyber tracking-wide
              ${isEven ? 'text-neon-purple' : 'text-neon-green'}`}>
              {title.toUpperCase()}
            </h3>
            <div className={`text-3xl font-bold mb-1 font-cyber animate-count-up
              ${isEven ? 'text-neon-purple neon-text' : 'text-neon-green neon-text-green'}`}>
              {displayValue}
            </div>
            <p className="text-sm text-gray-300 mb-2 font-gaming font-medium">{subtitle}</p>
            <p className="text-xs text-gray-400 font-gaming">{description}</p>
          </div>
        </div>
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`absolute inset-0 rounded-lg border-2 
            ${isEven ? 'border-neon-purple' : 'border-neon-green'}`}></div>
        </div>
        
        {/* Pulsing Dot Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 rounded-full animate-pulse
            ${isEven ? 'bg-neon-purple shadow-neon-purple' : 'bg-neon-green shadow-neon-green'}`}></div>
        </div>
      </div>
    </motion.div>
  )
}
