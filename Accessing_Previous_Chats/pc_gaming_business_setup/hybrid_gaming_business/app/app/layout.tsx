
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameHub Elite - Premium Gaming & Entertainment',
  description: 'Ultimate gaming destination combining high-end gaming stations, VR experiences, streaming studios, and server hosting services.',
  keywords: 'gaming lounge, VR arcade, streaming studio, game server hosting, esports',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Header />
            {children}
            <Toaster richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
