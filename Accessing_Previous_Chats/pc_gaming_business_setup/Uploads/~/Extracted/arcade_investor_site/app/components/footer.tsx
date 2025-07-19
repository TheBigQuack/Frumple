
"use client"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-4">
            PixelPalace
          </div>
          <p className="text-gray-400 mb-6">
            Revolutionizing the arcade industry through the perfect blend of nostalgia, technology, and hospitality excellence.
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Top
            </button>
          </div>
          <div className="border-t border-slate-700 pt-6">
            <p className="text-gray-500 text-sm">
              © 2025 PixelPalace Holdings LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
