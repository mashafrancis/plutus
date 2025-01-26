'use client'

import { Icons } from '@/components/icons'
import SectionContainer from '@/components/layout/section-container'
import { Button } from '@/components/ui/button'
import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <SectionContainer className="flex gap-8 mt-24 border rounded-lg">
      <div className="space-y-4">
        <NextError statusCode={0} />
        {/*<p className="text-foreground-lighter">{error?.message}</p>*/}
        <div>
          <Button
            size="medium"
            icon={<Icons.reload className="h-4 w-4" />}
            onClick={() => reset()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </SectionContainer>
  )
}
