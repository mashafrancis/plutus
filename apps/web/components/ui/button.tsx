'use client'

import { IconLoader } from '@/components/icon/IconLoader'
import { SIZE_VARIANTS, SIZE_VARIANTS_DEFAULT } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cloneElement, forwardRef, isValidElement } from 'react'

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
const buttonVariants = cva(
  `relative
  flex items-center justify-center
  cursor-pointer
  inline-flex
  items-center
  space-x-2
  text-center
  font-regular
  ease-out
  duration-200
  rounded-md
  outline-none
  transition-all
  outline-0
  focus-visible:outline-4
  focus-visible:outline-offset-1
  border
  `,
  {
    variants: {
      type: {
        primary: `
            hover:bg-primary-60/80 border-primary bg-primary text-white
            shadow-sm
            focus-visible:outline-primary/60 dark:border-primary
            dark:bg-primary/70
            dark:hover:bg-primary`,
        secondary: `
            hover:text-border-stronger
            focus-visible:text-border-control hover:border-muted-background
            border-muted
            bg-foreground text-background
            shadow-sm
            focus-visible:outline-border`,
        default: `
            text-foreground
            bg-button hover:bg-selection
            border hover:border-button-hover
            focus-visible:outline-brand/60
            data-[state=open]:bg-selection
            data-[state=open]:outline-primary/60
            data-[state=open]:border-button-hover
            shadow-sm`,
        alternative: `
            border-primary/20
            bg-primary/10 text-primary
            shadow-sm
            hover:bg-primary/20
            focus-visible:border-primary/30
            focus-visible:outline-primary/60`,
        outline: `
            border
            bg-card
            text-foreground
            shadow-sm hover:border hover:text-accent-foreground
            focus-visible:outline-border`,
        dashed: `
            border-strong
            hover:border-stronger
            focus-visible:outline-border-strong
            border border-dashed
            bg-transparent
            text-foreground
            shadow-sm`,
        link: `
            focus-visible:outline-border-strong
            border
            border-transparent
            border-opacity-0
            bg-opacity-0
            text-primary/60 shadow-none
            hover:bg-primary/40
            dark:bg-opacity-0`,
        text: `
            focus-visible:outline-border-strong
            border-transparent
            text-foreground
            shadow-none
            hover:bg-muted/30`,
        danger: `
            border-destructive/70
            bg-destructive/20 text-destructive
            shadow-sm
            hover:border-destructive/90
            hover:bg-destructive/90
            hover:text-white
            focus-visible:outline-destructive/70`,
        warning: `
            text-amber
            hover:text-hi-contrast
            border-amber-700 bg-amber-200
            shadow-sm
            hover:border-amber-900
            hover:bg-amber-900
            focus-visible:outline-amber-700`,
      },
      block: {
        true: 'w-full flex items-center justify-center',
      },
      size: {
        ...SIZE_VARIANTS,
      },
      overlay: {
        base: `absolute inset-0 bg-background opacity-50`,
        container: `fixed inset-0 transition-opacity`,
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
      rounded: {
        true: 'rounded-full',
      },
      defaultVariants: {
        //   variant: 'default',
        //   size: 'default',
        size: {
          SIZE_VARIANTS_DEFAULT,
        },
      },
    },
  },
)

const IconContainerVariants = cva('', {
  variants: {
    size: {
      tiny: '[&_svg]:h-[14px] [&_svg]:w-[14px]',
      small: '[&_svg]:h-[18px] [&_svg]:w-[18px]',
      medium: '[&_svg]:h-[20px] [&_svg]:w-[20px]',
      large: '[&_svg]:h-[20px] [&_svg]:w-[20px]',
      xlarge: '[&_svg]:h-[24px] [&_svg]:w-[24px]',
      xxlarge: '[&_svg]:h-[30px] [&_svg]:w-[30px]',
      xxxlarge: '[&_svg]:h-[42px] [&_svg]:w-[42px]',
    },
    type: {
      primary: 'text-brand/60',
      default: 'text-foreground-muted',
      secondary: 'text-border-muted',
      alternative: 'text-foreground-muted',
      outline: 'text-foreground-muted',
      dashed: 'text-foreground-muted',
      link: 'text-brand/60',
      text: 'text-foreground-muted',
      danger: 'text-destructive/60',
      warning: 'text-warning/60',
    },
  },
})

export type LoadingVariantProps = VariantProps<typeof loadingVariants>
const loadingVariants = cva('', {
  variants: {
    type: {
      primary: 'text-brand/60',
      default: 'text-foreground-muted',
      secondary: 'text-border-muted',
      alternative: 'text-foreground-muted',
      outline: 'text-foreground-muted',
      dashed: 'text-foreground-muted',
      link: 'text-brand/60',
      text: 'text-foreground-muted',
      danger: 'text-destructive/60',
      warning: 'text-warning/60',
    },
    loading: {
      default: '',
      true: `animate-spin`,
    },
  },
})

export interface ButtonProps
  // omit `type` as we use it to change type of button
  // replaced with `htmlType`
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    // omit 'disabled' as it is included in HTMLButtonElement
    Omit<ButtonVariantProps, 'disabled'>,
    Omit<LoadingVariantProps, 'type'> {
  asChild?: boolean
  type?: ButtonVariantProps['type']
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  icon?: React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  rounded?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      size = 'tiny',
      type = 'primary',
      children,
      loading,
      block,
      icon,
      iconRight,
      iconLeft,
      htmlType = 'button',
      rounded,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const { className } = props
    const showIcon = loading || icon
    // decrecating 'showIcon' for rightIcon
    const _iconLeft: React.ReactNode = icon ?? iconLeft
    // if loading, button is disabled
    const disabled = loading === true || props.disabled

    return (
      <Comp
        ref={ref}
        data-size={size}
        type={htmlType}
        {...props}
        disabled={disabled}
        className={cn(
          buttonVariants({ type, size, disabled, block, rounded }),
          className,
        )}
      >
        {asChild ? (
          isValidElement(children) ? (
            cloneElement(
              children,
              undefined,
              showIcon &&
                (loading ? (
                  <div className={cn(IconContainerVariants({ size, type }))}>
                    <IconLoader
                      className={cn(loadingVariants({ loading, type }))}
                    />
                  </div>
                ) : _iconLeft ? (
                  <div className={cn(IconContainerVariants({ size, type }))}>
                    {_iconLeft}
                  </div>
                ) : null),
              children.props.children && (
                <span className={'truncate'}>{children.props.children}</span>
              ),
              iconRight && !loading && (
                <div className={cn(IconContainerVariants({ size, type }))}>
                  {iconRight}
                </div>
              ),
            )
          ) : null
        ) : (
          <>
            {showIcon &&
              (loading ? (
                <div className={cn(IconContainerVariants({ size, type }))}>
                  <IconLoader
                    className={cn(loadingVariants({ loading, type }))}
                  />
                </div>
              ) : _iconLeft ? (
                <div className={cn(IconContainerVariants({ size, type }))}>
                  {_iconLeft}
                </div>
              ) : null)}{' '}
            {children && <span className={'truncate'}>{children}</span>}{' '}
            {iconRight && !loading && (
              <div className={cn(IconContainerVariants({ size, type }))}>
                {iconRight}
              </div>
            )}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
