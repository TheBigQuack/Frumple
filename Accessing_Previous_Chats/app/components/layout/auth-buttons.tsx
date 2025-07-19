
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'

export function AuthButtons({ mobile = false }: { mobile?: boolean }) {
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (mobile) {
    return (
      <>
        {session ? (
          <>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => signOut()}
              className="w-full justify-start"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => signIn()}
            className="w-full justify-start"
          >
            Sign In
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      {session ? (
        <>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </>
  )
}
