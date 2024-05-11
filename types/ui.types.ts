import { ButtonProps } from '@/components/ui/button'

export interface CTA {
  label: string
  href: string
  type?: ButtonProps['type']
  target?: HTMLAnchorElement['target']
}
