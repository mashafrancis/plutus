'use client'

import { SizeVariantProps } from '@/lib/common-cva'
import { createContext } from 'react'

interface ContextValue {
  contextSize?: SizeVariantProps
  className?: string
}

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const IconContext = createContext<ContextValue>({
  contextSize: 'small',
  className: '',
})
