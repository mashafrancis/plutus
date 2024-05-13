'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Moon, Sun } from 'react-feather'
import { type Theme, themes } from './themes'

interface ThemeToggleProps {
  forceDark?: boolean
}

const ThemeToggle = ({ forceDark = false }: ThemeToggleProps) => {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const currentTheme = forceDark ? 'dark' : theme

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)} modal={false}>
      <DropdownMenuTrigger asChild disabled={forceDark}>
        <button
          id="user-settings-dropdown"
          className="flex items-center justify-center h-7 w-7 text-foreground"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-30">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={currentTheme} // Use the currentTheme variable here
            onValueChange={(value) => {
              setTheme(value)
            }}
          >
            {themes
              .filter(
                (x) =>
                  x.value === 'dark' ||
                  x.value === 'light' ||
                  x.value === 'system',
              )
              .map((theme: Theme) => (
                <DropdownMenuRadioItem key={theme.value} value={theme.value}>
                  {theme.name}
                </DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
