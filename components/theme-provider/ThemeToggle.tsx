'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'react-feather'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        })
      }}
    >
      {!theme ? null : theme === 'dark' ? (
        <Moon size={16} className="transition-all" />
      ) : (
        <Sun size={16} className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
