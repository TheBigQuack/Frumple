
'use client'

import { useEffect, useState } from 'react'

export function CyberGrid() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="cyber-grid" />
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-purple-500/10 pointer-events-none z-0" />
      <div className="fixed inset-0 scan-lines pointer-events-none z-0" />
    </>
  )
}
