'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [show404, setShow404] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setShow404(true)
    }, 500)
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute">
        <h1
          className={`text-foreground select-none text-[14rem] opacity-[5%] filter transition duration-200 sm:text-[18rem] lg:text-[28rem] ${
            show404 ? 'blur-sm' : 'blur-none'
          }`}
        >
          404
        </h1>
      </div>
      <div
        className={`flex flex-col items-center justify-center space-y-6 transition ${
          show404 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-foreground flex flex-col items-center justify-center space-y-3">
          <h1 className="m-2 text-2xl">Hmm...this page doesn’t exist.</h1>
          <p className="text-center text-sm text-muted-foreground">
            We couldn't find the page that you're looking for!
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild size="small" className="text-white">
            <Link href="/">Head back home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
