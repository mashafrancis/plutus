import { NextRequest, NextResponse } from 'next/server'

import messages from '@/constants/messages'
import { checkAuth } from '@/lib/auth'
import db from '@plutus/db'

export async function POST(_request: NextRequest) {
  return await checkAuth(async (user: any) => {
    try {
      await db.users.update({
        data: { usage: { increment: 1 } },
        where: { id: user.id },
      })
      return NextResponse.json('Done')
    } catch (error: any) {
      return NextResponse.json(
        { message: String(error) || messages.error },
        { status: 500 },
      )
    }
  })
}
