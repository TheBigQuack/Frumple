
'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Eye, EyeOff, LogIn, ArrowLeft, Zap } from 'lucide-react'
import Link from 'next/link'

export function SignInClient() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    checkSession()
  }, [])

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      router.push('/dashboard')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        toast({
          title: "Sign In Failed",
          description: "Invalid email or password",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Welcome Back!",
          description: "Successfully signed in to FRUMPLE",
        })
        router.push('/dashboard')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center text-green-400 hover:text-green-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="cyber-card">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-2xl font-orbitron">F</span>
            </div>
            <CardTitle className="text-2xl font-orbitron gradient-text">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400">Sign in to your FRUMPLE account</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-green-400 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cyber-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-green-400 mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cyber-input pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full cyber-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Signing In...'
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-green-400 hover:text-green-300 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Account Info */}
            <div className="mt-6 p-4 holographic rounded-lg">
              <div className="flex items-center mb-2">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-medium text-sm">Demo Account</span>
              </div>
              <p className="text-gray-400 text-xs mb-2">
                Try the platform with our demo account:
              </p>
              <div className="text-xs text-gray-300 space-y-1">
                <p>Email: demo@frumple.com</p>
                <p>Password: demo123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
