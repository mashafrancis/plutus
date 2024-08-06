'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type Props = {
  hasFilters?: boolean
}

export function NoResults({ hasFilters }: Props) {
  const router = useRouter()

  return (
    <div className="h-[calc(100vh-300px)] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Icons.chart className="mb-4" />
        <div className="text-center mb-6 space-y-2">
          <h2 className="font-medium text-lg">No results</h2>
          <p className="text-[#606060] text-sm">
            {hasFilters
              ? 'Try another search, or adjusting the filters'
              : 'There are no transactions imported yet'}
          </p>
        </div>

        {hasFilters && (
          <Button type="outline" onClick={() => router.push('/expenses')}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
