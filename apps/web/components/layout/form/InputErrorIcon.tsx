import { IconAlertTriangle } from '@/components/icon/IconAlertTriangle'
import styleHandler from '@/components/theme/style-handler'
import type React from 'react'

interface Props {
  style?: React.CSSProperties
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
}

export default function InputErrorIcon({ style, size }: Props) {
  const __styles = styleHandler('inputErrorIcon')

  return (
    <div className={__styles.base} style={style}>
      <IconAlertTriangle size={size} strokeWidth={2} className="" />
    </div>
  )
}
