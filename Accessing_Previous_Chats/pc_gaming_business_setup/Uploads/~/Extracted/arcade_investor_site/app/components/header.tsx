
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"
import { Gamepad2, Zap } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gaming-bg/95 backdrop-blur-md shadow-cyber-glow border-b border-neon-purple/20" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Gamepad2 className="w-8 h-8 text-neon-purple animate-cyber-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-neon-purple/20 rounded-full animate-ping"></div>
              </div>
              <div className="text-2xl font-bold font-cyber text-white neon-text">
                PixelPalace
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("opportunity")}
                className="text-gray-300 hover:text-neon-green transition-all duration-300 font-gaming font-semibold tracking-wide hover:shadow-neon-green/50 hover:shadow-md"
              >
                OPPORTUNITY
              </button>
              <button
                onClick={() => scrollToSection("model")}
                className="text-gray-300 hover:text-neon-purple transition-all duration-300 font-gaming font-semibold tracking-wide hover:shadow-neon-purple/50 hover:shadow-md"
              >
                MODEL
              </button>
              <button
                onClick={() => scrollToSection("financials")}
                className="text-gray-300 hover:text-neon-green transition-all duration-300 font-gaming font-semibold tracking-wide hover:shadow-neon-green/50 hover:shadow-md"
              >
                FINANCIALS
              </button>
              <button
                onClick={() => scrollToSection("investment")}
                className="text-gray-300 hover:text-neon-purple transition-all duration-300 font-gaming font-semibold tracking-wide hover:shadow-neon-purple/50 hover:shadow-md"
              >
                INVESTMENT
              </button>
            </nav>
            
            <Button
              onClick={() => setIsOpen(true)}
              className="cyber-button group relative overflow-hidden"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              <span className="font-gaming font-semibold tracking-wide">ACCESS FULL PLAN</span>
            </Button>
          </div>
        </div>
      </header>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
