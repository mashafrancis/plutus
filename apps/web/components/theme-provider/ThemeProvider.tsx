'use client'

import defaultTheme from '@/components/theme/default-theme'
import { mergeDeep } from '@/lib/merge-deep'
import type React from 'react'
import { createContext, useMemo } from 'react'

interface ThemeContextInterface {
  theme?: any
  // mode?: 'light' | 'dark'
  // toggleMode?: any
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: defaultTheme,
  // mode: 'light',
  // toggleMode: true,
})

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /**
   * Defines the styles used throughout the library
   */
  theme?: object
  /**
   * Defines dark mode as the default theme
   */
  // dark?: boolean
  /**
   * Allows the change of theme, reading user's preferences and saving them
   */
  // usePreferences?: boolean
}

const ThemeProvider: React.FC<Props> = ({
  children,
  theme: customTheme,
  // dark,
  // usePreferences = false,
}) => {
  const mergedTheme = mergeDeep(defaultTheme, customTheme)
  // const [mode, setMode, toggleMode] = useDarkMode(usePreferences)

  // useLayoutEffect(() => {
  //   if (dark) {
  //     if (setMode != null) {
  //       setMode('dark')
  //     }
  //     document.documentElement.classList.add(`dark`)
  //   }
  // }, [dark])

  const value = useMemo(
    () => ({
      theme: mergedTheme,
      // mode,
      // toggleMode,
    }),
    [],
  )

  // console.log('defaultTheme', defaultTheme)
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
