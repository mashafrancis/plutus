import { useContext } from 'react'

import { ThemeContext } from '../../components/theme-provider/ThemeProvider'
import defaultTheme from './default-theme'

export default function styleHandler(target: string) {
  let {
    theme: { [target]: __styles },
  }: any = useContext(ThemeContext)

  if (!__styles) __styles = defaultTheme.accordion

  // console.log(__styles)

  // __styles.replace(/\s+/g, ' ')

  // console.log('before string', __styles)

  // __styles = JSON.stringify(JSON.parse(__styles))
  __styles = JSON.stringify(__styles).replace(/\\n/g, '').replace(/\s\s+/g, ' ')

  // console.log('string', __styles)

  __styles = JSON.parse(__styles)

  // console.log('string', __styles)

  return __styles
}
