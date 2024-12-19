'use client'

import { fetchStatus } from '@/actions/fetch-status'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function StatusWidget() {
  const [status, setStatus] = useState('operational')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchStatus()

        if (response) {
          setStatus(response)
        }
      } catch {}
    }

    fetchData()
  }, [])

  const getStatusLevel = (level: string) => {
    return {
      operational: {
        label: 'Operational',
        color: 'bg-green-900',
        color2: 'bg-green-800',
      },
      degraded_performance: {
        label: 'Degraded Performance',
        color: 'bg-yellow-900',
        color2: 'bg-yellow-800',
      },
      partial_outage: {
        label: 'Partial Outage',
        color: 'bg-yellow-900',
        color2: 'bg-yellow-800',
      },
      major_outage: {
        label: 'Major Outage',
        color: 'bg-red-900',
        color2: 'bg-red-800',
      },
      unknown: {
        label: 'Unknown',
        color: 'bg-gray-900',
        color2: 'bg-gray-800',
      },
      incident: {
        label: 'Incident',
        color: 'bg-yellow-900',
        color2: 'bg-yellow-800',
      },
      under_maintenance: {
        label: 'Under Maintenance',
        color: 'bg-gray-900',
        color2: 'bg-gray-800',
      },
    }[level]
  }

  const level = getStatusLevel(status)

  if (!level) {
    return null
  }

  return (
    <a
      className="flex justify-between space-x-2 items-center w-full border border-border rounded-full px-3 py-1.5"
      href="https://heimdall.openstatus.dev/"
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <p className="text-xs font-mono">{level.label}</p>
      </div>

      <span className="relative ml-auto flex h-1.5 w-1.5">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            level.color2,
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-1.5 w-1.5',
            level.color,
          )}
        />
      </span>
    </a>
  )
}
