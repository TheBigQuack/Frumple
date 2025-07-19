
'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface StatProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedStat({ label, value, suffix = '', prefix = '', duration = 2000 }: StatProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let startCount = 0
      const endCount = value

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        const easeOutQuad = 1 - (1 - progress) * (1 - progress)
        const currentCount = Math.floor(easeOutQuad * (endCount - startCount) + startCount)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animateCount)
        }
      }
      
      requestAnimationFrame(animateCount)
    }
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="data-display text-3xl md:text-4xl font-bold mb-2 font-orbitron">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 text-lg">{label}</p>
    </div>
  )
}

export function StatsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const stats = [
    { label: 'Active Gamers', value: 15000, suffix: '+' },
    { label: 'Gaming Hours', value: 2500000, suffix: '+' },
    { label: 'Tournaments Hosted', value: 450, suffix: '+' },
    { label: 'Server Uptime', value: 99.9, suffix: '%' },
    { label: 'VR Sessions', value: 85000, suffix: '+' },
    { label: 'Streams Produced', value: 12000, suffix: '+' }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Gaming Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Trusted by the gaming community with proven track record of delivering exceptional experiences
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="cyber-card p-6">
              <AnimatedStat
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                duration={2000 + index * 200}
              />
            </div>
          ))}
        </div>

        {/* Background Animation */}
        <div className="relative mt-16 h-32 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-purple-500/20 to-cyan-500/20" />
          <div className="absolute inset-0 loading-scan" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-orbitron font-bold gradient-text">
              ELITE GAMING EXPERIENCE
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
