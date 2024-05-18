import { NextRequest, NextResponse } from 'next/server'

import messages from '@/constants/messages'
import { checkAuth } from '@/lib/auth'
import db from '@plutus/db'

export async function POST(request: NextRequest) {
  const { notes, name, price, paid, date, url } = await request.json()
  return await checkAuth(async (user: any) => {
    try {
      await db.subscriptions.create({
        data: { notes, name, price, paid, url, user_id: user.id, date },
      })
      return NextResponse.json('added', { status: 201 })
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 },
      )
    }
  }, false)
}
