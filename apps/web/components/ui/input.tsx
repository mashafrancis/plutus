import { SIZE_VARIANTS, SIZE_VARIANTS_DEFAULT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {}

const InputVariants = cva('aria-[]', {
  variants: {
    size: {
      ...SIZE_VARIANTS,
    },
  },
  defaultVariants: {
    size: SIZE_VARIANTS_DEFAULT,
  },
})

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'medium', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          'flex h-10 w-full rounded-md border bg-foreground/[.026] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-lighter',
          'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:bg-destructive-200 aria-invalid:border-destructive-400 aria-invalid:focus:border-destructive aria-invalid:focus-visible:border-destructive',
          InputVariants({ size }),
          className,
        )}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
