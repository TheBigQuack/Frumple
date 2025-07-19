
'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Gamepad2, 
  Headset, 
  Video, 
  Server, 
  Coffee,
  BarChart3,
  TrendingUp,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/gaming-stations', label: 'Gaming Stations', icon: Gamepad2 },
  { href: '/vr-experiences', label: 'VR Experiences', icon: Headset },
  { href: '/streaming-studios', label: 'Streaming', icon: Video },
  { href: '/server-hosting', label: 'Server Hosting', icon: Server },
  { href: '/food-beverages', label: 'F&B', icon: Coffee },
]

export function Navigation() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="sticky top-0 z-50 holographic border-b border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg font-orbitron">F</span>
              </div>
              <span className="text-xl font-bold font-orbitron gradient-text">FRUMPLE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                >
                  <Icon className="w-4 h-4 group-hover:text-green-400" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                {session.user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Admin</span>
                  </Link>
                )}
                {session.user?.role === 'investor' && (
                  <Link
                    href="/investor"
                    className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Investor Portal</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{session.user?.email}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="cyber-border text-green-400 hover:bg-green-500/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="cyber-button" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-green-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm border-t border-green-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  {session.user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <TrendingUp className="w-5 h-5" />
                      <span>Admin</span>
                    </Link>
                  )}
                  {session.user?.role === 'investor' && (
                    <Link
                      href="/investor"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <TrendingUp className="w-5 h-5" />
                      <span>Investor Portal</span>
                    </Link>
                  )}
                  <div className="px-3 py-2 text-sm text-gray-400">
                    Signed in as: {session.user?.email}
                  </div>
                  <Button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    variant="outline"
                    size="sm"
                    className="mx-3 border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full cyber-border text-green-400">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full cyber-button" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
