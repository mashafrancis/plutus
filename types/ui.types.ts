import { ButtonProps } from '@/components/ui/button'

export interface CTA {
  label: string
  href: string
  type?: ButtonProps['type']
  target?: HTMLAnchorElement['target']
}

export interface DatetimeHelper {
  text: string
  calcTo: () => string
  calcFrom: () => string
  default?: boolean
  disabled?: boolean
}
