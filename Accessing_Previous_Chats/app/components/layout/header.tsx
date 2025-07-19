
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Gamepad2, Calendar } from 'lucide-react'
import { AuthButtons } from './auth-buttons'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Book Now', href: '/booking' },
    { name: 'Events', href: '/events' },
    { name: 'Community', href: '/community' },
    { name: 'Investor Info', href: '/investor' },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-green-400/30 shadow-lg shadow-green-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <Gamepad2 className="h-8 w-8 text-green-400" />
            <span className="text-xl font-bold text-green-400">
              FRUMPLE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-green-300 hover:text-green-400 transition-all duration-200 relative group"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons />
            <Link href="/booking">
              <Button className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-purple-600 hover:to-green-500 border border-green-400/50">
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-green-400 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md border-t border-green-400/30 shadow-lg shadow-green-400/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-green-300 hover:text-green-400 transition-all duration-200 hover:bg-green-400/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-purple-400/30 mt-4 pt-4 space-y-2">
                <AuthButtons mobile />
                <Link href="/booking">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-purple-600 hover:to-green-500 border border-green-400/50">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
