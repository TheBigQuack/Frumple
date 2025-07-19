
import Link from 'next/link'
import { Gamepad2, Mail, Phone, MapPin, Instagram, Twitter, Youtube, Twitch } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">GameHub Elite</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              The ultimate gaming destination combining cutting-edge technology with vibrant community experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Twitch className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/services/gaming" className="hover:text-white transition-colors">Gaming Stations</Link></li>
              <li><Link href="/services/vr" className="hover:text-white transition-colors">VR Experiences</Link></li>
              <li><Link href="/services/streaming" className="hover:text-white transition-colors">Streaming Studios</Link></li>
              <li><Link href="/services/hosting" className="hover:text-white transition-colors">Server Hosting</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/booking" className="hover:text-white transition-colors">Book Now</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Downtown Entertainment District</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-GAME</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@gamehubelite.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 GameHub Elite. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/investor" className="text-sm text-gray-400 hover:text-white transition-colors">
              Investor Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
