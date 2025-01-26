'use client'

import { useTheme } from 'next-themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ComponentProps, useEffect } from 'react'
import { Toaster as Sonner, toast } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const status = searchParams.get('status')
    const status_description = searchParams.get('status_description')
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')

    if (status) {
      toast(status ?? 'Alright!', { description: status_description })
    }

    if (error) {
      toast.error(error ?? 'Hmm... Something went wrong.', {
        description: error_description,
      })
    }

    const newSearchParams = new URLSearchParams(searchParams.toString())
    const paramsToRemove = [
      'error',
      'status',
      'status_description',
      'error_description',
    ]
    paramsToRemove.forEach((param) => newSearchParams.delete(param))
    const redirectPath = `${pathname}?${newSearchParams.toString()}`
    router.replace(redirectPath, { scroll: false })
  }, [searchParams])

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-foreground-lighter',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-foreground-lighter',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
