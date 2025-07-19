
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Alex "ProGamer" Chen',
    role: 'Professional Esports Player',
    company: 'Team Velocity',
    content: 'FRUMPLE has completely revolutionized my training routine. The RTX 4090 setups and 144Hz monitors give me the competitive edge I need. The streaming studios are perfect for content creation too.',
    rating: 5,
    image: 'https://billelafros.b-cdn.net/wp-content/uploads/2021/04/Photo-of-a-gaming-headset-in-a-matte-black-finish-with-subtle-RGB-lighting-positioned-prominently-on-a-plain-light-colored-desk-showcasing-its-fea.png'
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Content Creator',
    company: '2.3M Followers',
    content: 'The VR experiences at FRUMPLE are absolutely mind-blowing! My viewers love the immersive content I create here. The staff is incredibly helpful and the equipment is always top-notch.',
    rating: 5,
    image: 'https://img.freepik.com/premium-psd/happy-content-woman-vr-headset-smiling-camera_978137-10991.jpg'
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    role: 'Gaming Community Leader',
    company: 'Local Gaming Guild',
    content: 'We host all our tournaments at FRUMPLE now. The facilities are amazing, the food is actually good, and the tournament management tools make organizing events a breeze.',
    rating: 5,
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mxguQhJYmPcge6XvnbC_EoAe4L8tHjKedmOY7M66lc3kU=s900-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Casual Gamer',
    company: 'Weekend Warrior',
    content: 'As someone who games casually, I love that FRUMPLE caters to all skill levels. The atmosphere is welcoming, and I\'ve made so many gaming friends here. The VR experiences are incredible!',
    rating: 5,
    image: 'https://thumbs.dreamstime.com/b/young-woman-playing-video-games-nerd-geek-young-adult-woman-playing-video-console-holding-game-pad-sitting-sofa-gaming-133166322.jpg'
  },
  {
    id: 5,
    name: 'Ryan Kim',
    role: 'Streamer',
    company: '500K Twitch Followers',
    content: 'The streaming studios at FRUMPLE are professional-grade. Multi-camera setups, perfect lighting, and all the tech I need. My stream quality has never been better!',
    rating: 5,
    image: 'https://i.pinimg.com/originals/5b/2e/af/5b2eafcf631ee795661a5b78668201fd.jpg'
  },
  {
    id: 6,
    name: 'Lisa Zhang',
    role: 'VR Enthusiast',
    company: 'Tech Reviewer',
    content: 'FRUMPLE has the most advanced VR setup I\'ve ever experienced. Full body tracking, haptic feedback, and experiences you can\'t get anywhere else. It\'s like stepping into the future.',
    rating: 5,
    image: 'https://thumbs.dreamstime.com/b/woman-wearing-virtual-reality-headset-fully-immersed-digital-environment-glowing-circuitry-symbolizing-advanced-vr-331957151.jpg'
  }
]

export function TestimonialsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Gamer Testimonials
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hear from our community of gamers, streamers, and esports professionals
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="cyber-card h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-green-400 mb-4" />
                
                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-purple-600 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-black font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-green-400">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="cyber-card p-6">
            <div className="data-display text-2xl font-bold mb-2">4.9/5</div>
            <p className="text-gray-400">Average Rating</p>
          </div>
          <div className="cyber-card p-6">
            <div className="data-display text-2xl font-bold mb-2">2,500+</div>
            <p className="text-gray-400">Happy Gamers</p>
          </div>
          <div className="cyber-card p-6">
            <div className="data-display text-2xl font-bold mb-2">95%</div>
            <p className="text-gray-400">Return Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
