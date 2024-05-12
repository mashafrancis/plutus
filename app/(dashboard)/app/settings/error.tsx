'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui-elements/button'

export default function AppError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-sm">{error?.message}</p>
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
  )
}
