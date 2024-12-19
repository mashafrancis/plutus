import { useContext } from 'react'

import { ThemeContext } from '@/components/theme-provider/ThemeProvider'
import defaultTheme from './default-theme'

export default function styleHandler(target: string) {
  let {
    theme: { [target]: styles },
  }: any = useContext(ThemeContext)

  if (!styles) styles = defaultTheme.accordion
  styles = JSON.stringify(styles).replace(/\\n/g, '').replace(/\s\s+/g, ' ')
  styles = JSON.parse(styles)

  return styles
}
