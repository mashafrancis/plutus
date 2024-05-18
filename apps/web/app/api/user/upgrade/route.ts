import { NextRequest, NextResponse } from 'next/server'

import messages from '@/constants/messages'
import { checkAuth } from '@/lib/auth'
import db from '@plutus/db'

export async function POST(request: NextRequest) {
  const {
    order_identifier,
    billing_start_date,
    plan_status,
    order_status,
    order_store_id,
    order_number,
  } = await request.json()
  return await checkAuth(async (user: any) => {
    try {
      await db.users.update({
        data: {
          order_identifier,
          billing_start_date,
          plan_status,
          order_status,
          order_store_id,
          order_number,
        },
        where: { id: user.id },
      })
      return NextResponse.json('Successful', { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 },
      )
    }
  })
}
