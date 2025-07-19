
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CountUpCard } from "@/components/count-up-card"
import { TrendingUp, Users, MapPin, Zap, Target, Globe } from "lucide-react"

export function OpportunitySection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const marketStats = [
    {
      icon: Globe,
      title: "Market Size",
      value: "$13.61B",
      subtitle: "Global arcade gaming market",
      description: "4.5-8.5% CAGR through 2033"
    },
    {
      icon: Target,
      title: "Target Demographics",
      value: "88%",
      subtitle: "Millennial gaming engagement",
      description: "92% Gen Z participation rate"
    },
    {
      icon: MapPin,
      title: "Prime Location",
      value: "2,500+",
      subtitle: "Sq ft identified location",
      description: "High-traffic urban area"
    }
  ]

  return (
    <section id="opportunity" className="py-20 bg-gaming-bg relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      {/* Floating Gaming Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-neon-purple/20"
        >
          <Zap className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 text-neon-green/20"
        >
          <TrendingUp className="w-20 h-20" />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <Target className="w-16 h-16 text-neon-green mx-auto animate-cyber-pulse" />
            <div className="absolute inset-0 w-16 h-16 bg-neon-green/20 rounded-full animate-ping mx-auto"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-cyber">
            <span className="glitch-text neon-text" data-text="THE OPPORTUNITY">
              THE OPPORTUNITY
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-gaming leading-relaxed">
            The arcade gaming renaissance represents a{" "}
            <span className="text-neon-purple font-semibold">significant commercial opportunity</span>{" "}
            backed by compelling market fundamentals and{" "}
            <span className="text-neon-green font-semibold">powerful demographic trends</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gaming-card p-8"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-neon-green mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-white font-cyber">MARKET ANALYSIS</h3>
            </div>
            <div className="space-y-4 text-gray-300 font-gaming">
              <p className="leading-relaxed">
                The global arcade gaming market is experiencing{" "}
                <span className="text-neon-purple font-semibold">robust growth</span>, driven by 
                powerful demographic trends, particularly among{" "}
                <span className="text-neon-green font-semibold">Millennials</span> seeking nostalgic 
                experiences and <span className="text-neon-purple font-semibold">Gen Z</span> craving unique, social entertainment.
              </p>
              <div className="border-l-4 border-neon-green pl-4 py-2 bg-neon-green/5">
                <p className="text-neon-green font-semibold mb-2">KEY GROWTH DRIVERS:</p>
              </div>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 animate-pulse"></div>
                  <span><strong className="text-neon-purple">Nostalgia Economy:</strong> Millennials driving demand for authentic retro experiences</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-green rounded-full mt-2 mr-3 animate-pulse"></div>
                  <span><strong className="text-neon-green">Social Gaming Trend:</strong> Counter-movement to isolated online gaming</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 animate-pulse"></div>
                  <span><strong className="text-neon-purple">Technology Integration:</strong> VR/AR creating premium experience tiers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-green rounded-full mt-2 mr-3 animate-pulse"></div>
                  <span><strong className="text-neon-green">Experience Economy:</strong> Consumers prioritizing memorable experiences</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid gap-6"
          >
            {marketStats.map((stat, index) => (
              <CountUpCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                description={stat.description}
                delay={index * 0.2}
              />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="section-divider"></div>
    </section>
  )
}
