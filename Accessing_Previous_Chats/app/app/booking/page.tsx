
import { BookingInterface } from '@/components/booking/booking-interface'
import { Footer } from '@/components/layout/footer'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Experience
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from our premium gaming stations, VR experiences, streaming studios, and more
            </p>
          </div>
          <BookingInterface />
        </div>
      </main>
      <Footer />
    </div>
  )
}
