
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Gamepad2, GlassWater, Calendar, Cpu, Zap } from "lucide-react"

export function BusinessModelSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const businessModels = [
    {
      icon: Gamepad2,
      title: "Premium Gaming",
      description: "State-of-the-art and retro arcade experiences with authentic hardware and legally owned game library. Advanced Proxmox virtualization technology ensures scalable, cost-effective operations.",
      revenue: "20-30% of revenue",
      color: "neon-purple"
    },
    {
      icon: GlassWater,
      title: "Elevated F&B",
      description: "Craft cocktails, local craft beers, and chef-driven menu items. Premium beverage program rivaling dedicated cocktail bars drives primary revenue stream.",
      revenue: "60-70% of revenue",
      color: "neon-green"
    },
    {
      icon: Calendar,
      title: "Private & Corporate Events",
      description: "Corporate team building, birthday parties, gaming tournaments, and private bookings. High-margin revenue driver with strong growth potential.",
      revenue: "10-20% of revenue",
      color: "neon-purple"
    }
  ]

  return (
    <section id="model" className="py-20 bg-gaming-surface relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      {/* Floating Gaming Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 text-neon-green/10"
        >
          <Cpu className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 text-neon-purple/10"
        >
          <Zap className="w-28 h-28" />
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
            <Cpu className="w-16 h-16 text-neon-purple mx-auto animate-cyber-pulse" />
            <div className="absolute inset-0 w-16 h-16 bg-neon-purple/20 rounded-full animate-ping mx-auto"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-cyber">
            <span className="glitch-text neon-text" data-text="THE BUSINESS MODEL">
              THE BUSINESS MODEL
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-gaming leading-relaxed">
            Diversified revenue streams with beverage sales as the primary driver, 
            supported by premium gaming experiences and high-margin event hosting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {businessModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="gaming-card p-8 h-full hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 relative">
                <div className={`flex items-center justify-center w-20 h-20 rounded-lg mb-6 relative overflow-hidden transition-all duration-300
                  ${model.color === 'neon-purple' 
                    ? 'bg-gradient-to-br from-neon-purple to-neon-purple/70 group-hover:from-neon-purple/80 group-hover:to-neon-purple' 
                    : 'bg-gradient-to-br from-neon-green to-neon-green/70 group-hover:from-neon-green/80 group-hover:to-neon-green'}`}>
                  <model.icon className="w-10 h-10 text-white animate-cyber-pulse group-hover:animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 font-cyber tracking-wide
                  ${model.color === 'neon-purple' ? 'text-neon-purple' : 'text-neon-green'}`}>
                  {model.title.toUpperCase()}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed font-gaming">
                  {model.description}
                </p>
                
                <div className={`font-semibold text-lg font-cyber
                  ${model.color === 'neon-purple' ? 'text-neon-purple neon-text' : 'text-neon-green neon-text-green'}`}>
                  {model.revenue}
                </div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 rounded-lg border-2 
                    ${model.color === 'neon-purple' ? 'border-neon-purple' : 'border-neon-green'}`}></div>
                </div>
                
                {/* Pulsing Corner Indicators */}
                <div className="absolute top-4 right-4">
                  <div className={`w-4 h-4 rounded-full animate-pulse
                    ${model.color === 'neon-purple' ? 'bg-neon-purple shadow-neon-purple' : 'bg-neon-green shadow-neon-green'}`}></div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className={`w-2 h-2 rounded-full animate-pulse
                    ${model.color === 'neon-purple' ? 'bg-neon-purple shadow-neon-purple' : 'bg-neon-green shadow-neon-green'}`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="section-divider"></div>
    </section>
  )
}
