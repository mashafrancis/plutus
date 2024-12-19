import { ModalProvider } from '@/components/client-provider/modal-provider'
import type { ReactNode } from 'react'
import { Providers } from './providers'

type Params = Promise<{ locale: string }>

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: Params
}) {
  const { locale } = await params
  return (
    <Providers locale={locale}>
      <ModalProvider />
      {children}
    </Providers>
  )
}
