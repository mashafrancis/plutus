'use client'

import { useState } from 'react'

import { useUser } from '@/components/client-provider/auth-provider'
import CircleLoader from '@/components/loader/circle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { deleteUser } from '@/app/[locale]/(app)/settings/apis'
import { createClient } from '@/lib/supabase/client'
import Modal from '.'

export default function DeleteModal({
  show,
  onHide,
}: {
  show: boolean
  onHide: () => void
}) {
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [verify, setVerify] = useState('')
  const supabase = createClient()

  const onDelete = async () => {
    if (verify === user.email) {
      setLoading(true)
      await deleteUser()
      setLoading(false)
      await supabase.auth.signOut()
      window.location.href = '/signup'
    }
  }

  return (
    <Modal
      show={show}
      title="Delete Your Account"
      onHide={onHide}
      someRef={null}
    >
      <div className="text-sm text-primary dark:text-muted-foreground">
        Type this account email to delete your account and its data.
      </div>
      <Input
        className="mt-3"
        placeholder="Email"
        type="email"
        onChange={(event) => {
          setVerify(event.target.value)
        }}
      />
      <Button
        onClick={onDelete}
        variant={'destructive'}
        disabled={loading || verify !== user.email}
        className="user-select-none mt-4 w-full"
      >
        {loading ? <CircleLoader /> : 'Confirm delete'}
      </Button>
    </Modal>
  )
}
