
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { InvestmentChart } from "@/components/charts/investment-chart"
import { ProfitabilityChart } from "@/components/charts/profitability-chart"
import { BarChart3, TrendingUp, DollarSign, Calculator } from "lucide-react"

export function FinancialsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="financials" className="py-20 bg-gaming-bg relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      {/* Floating Gaming Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360, y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-20 text-neon-green/15"
        >
          <BarChart3 className="w-40 h-40" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-20 text-neon-purple/15"
        >
          <TrendingUp className="w-36 h-36" />
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
            <Calculator className="w-16 h-16 text-neon-green mx-auto animate-cyber-pulse" />
            <div className="absolute inset-0 w-16 h-16 bg-neon-green/20 rounded-full animate-ping mx-auto"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-cyber">
            <span className="glitch-text neon-text-green" data-text="FINANCIAL PROJECTIONS">
              FINANCIAL PROJECTIONS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-gaming leading-relaxed">
            <span className="text-neon-green font-semibold">Strong financial fundamentals</span> with diversified revenue streams, 
            proven unit economics, and <span className="text-neon-purple font-semibold">attractive returns</span> for investors.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gaming-card p-8 group"
          >
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-neon-green mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-neon-green font-cyber tracking-wide">
                5-YEAR REVENUE PROJECTIONS
              </h3>
            </div>
            <RevenueChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="gaming-card p-8 group"
          >
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="w-8 h-8 text-neon-purple mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-neon-purple font-cyber tracking-wide">
                INVESTMENT FUND ALLOCATION
              </h3>
            </div>
            <InvestmentChart />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="gaming-card p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-neon-green mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-neon-green font-cyber tracking-wide">
                PROFITABILITY TIMELINE & KEY METRICS
              </h3>
            </div>
            <ProfitabilityChart />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="gaming-card p-6 text-center group hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105"
            >
              <div className="text-4xl font-bold text-neon-purple mb-2 font-cyber neon-text animate-count-up">28%</div>
              <div className="text-gray-300 font-gaming font-semibold">Internal Rate of Return</div>
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse shadow-neon-purple"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="gaming-card p-6 text-center group hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105"
            >
              <div className="text-4xl font-bold text-neon-green mb-2 font-cyber neon-text-green animate-count-up">3.3</div>
              <div className="text-gray-300 font-gaming font-semibold">Years to Payback</div>
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse shadow-neon-green"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="gaming-card p-6 text-center group hover:shadow-cyber-glow transition-all duration-500 transform hover:scale-105"
            >
              <div className="text-4xl font-bold text-neon-purple mb-2 font-cyber neon-text animate-count-up">25%</div>
              <div className="text-gray-300 font-gaming font-semibold">Cash-on-Cash Return (Y3)</div>
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse shadow-neon-purple"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Section Divider */}
      <div className="section-divider"></div>
    </section>
  )
}
