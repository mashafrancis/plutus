import { NextRequest, NextResponse } from 'next/server'

import messages from '@/constants/messages'
import { checkAuth } from '@/lib/auth'
import db from '@plutus/db'

// type Where = {
//   user_id: string
//   date?: {
//     lte: string
//     gte: string
//   }
//   categories?: {
//     contains: string
//   }
// }

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const categories: any = searchParams.get('categories') || ''
  const OR = {
    OR: categories
      ?.split(',')
      .map((category: any) => ({ category: { contains: category } })),
  }

  return await checkAuth(async (user: any) => {
    try {
      const where = {
        user_id: user.id,
        ...(categories.length && OR),
        ...(to && from && { date: { lte: to, gte: from } }),
      }

      const data = await db.income.findMany({
        where,
        orderBy: { updated_at: 'desc' },
        select: {
          notes: true,
          name: true,
          price: true,
          category: true,
          id: true,
          date: true,
          created_at: true,
          updated_at: true,
        },
      })
      return NextResponse.json(
        data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      )
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 },
      )
    }
  })
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()
  return await checkAuth(async (_user: any) => {
    if (!id.length) {
      return NextResponse.json(messages.request.invalid, { status: 400 })
    }
    try {
      await db.income.delete({
        where: { id: id[0] },
      })
      return NextResponse.json('deleted', { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 },
      )
    }
  })
}

export async function PUT(request: NextRequest) {
  const { notes, name, price, category, id, date } = await request.json()

  return await checkAuth(async () => {
    if (!id) {
      return NextResponse.json(messages.request.invalid, { status: 400 })
    }
    try {
      await db.income.update({
        data: { notes, name, price, date, category },
        where: { id },
      })
      return NextResponse.json('updated', { status: 200 })
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 },
      )
    }
  })
}
