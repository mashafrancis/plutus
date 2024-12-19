'use client'

import type { DialogContentProps, DialogProps } from '@radix-ui/react-dialog'
import { type ComponentType, useEffect, useState } from 'react'

type WrapperProps = DialogProps
type ContentProps = Omit<DialogContentProps, 'onAnimationEnd'> & {
  onAnimationEnd?: (...args: any[]) => void
}
type Options = {
  mobile: {
    Wrapper: ComponentType<WrapperProps>
    Content: ComponentType<ContentProps>
  }
  desktop: {
    Wrapper: ComponentType<WrapperProps>
    Content: ComponentType<ContentProps>
  }
  breakpoint?: number
}

export function createResponsiveWrapper({
  mobile,
  desktop,
  breakpoint = 640,
}: Options) {
  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkDevice = (event: MediaQueryList | MediaQueryListEvent) => {
        setIsMobile(event.matches)
      }

      // Initial detection
      const mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`)
      checkDevice(mediaQueryList)

      // Listener for media query change
      mediaQueryList.addEventListener('change', checkDevice)

      // Cleanup listener
      return () => {
        mediaQueryList.removeEventListener('change', checkDevice)
      }
    }, [breakpoint])

    return isMobile
  }

  function Wrapper(props: WrapperProps) {
    const isMobile = useIsMobile()
    return isMobile ? (
      <mobile.Wrapper {...props} />
    ) : (
      <desktop.Wrapper {...props} />
    )
  }
  function Content(props: ContentProps) {
    const isMobile = useIsMobile()
    return isMobile ? (
      <mobile.Content {...props} />
    ) : (
      <desktop.Content {...props} />
    )
  }

  return {
    Wrapper,
    Content,
  }
}
