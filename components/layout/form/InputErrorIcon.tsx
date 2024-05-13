import styleHandler from '@/components/theme/style-handler'
import type React from 'react'
import { AlertCircle } from 'react-feather'

interface Props {
  style?: React.CSSProperties
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
}

export default function InputErrorIcon({ style, size }: Props) {
  const __styles = styleHandler('inputErrorIcon')

  return (
    <div className={__styles.base} style={style}>
      <AlertCircle size={size} strokeWidth={2} className="" />
    </div>
  )
}
