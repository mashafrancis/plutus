// This file was generated by prisma-field-encryption.

import type { PrismaClient, expenses } from '@prisma/client'
import {
  ProgressReportCallback,
  defaultProgressReport,
  visitRecords,
} from 'prisma-field-encryption/dist/generator/runtime'

type Cursor = expenses['id']

export async function migrate(
  client: PrismaClient,
  reportProgress: ProgressReportCallback = defaultProgressReport,
): Promise<number> {
  return visitRecords<PrismaClient, Cursor>({
    modelName: 'expenses',
    client,
    getTotalCount: client.expenses.count,
    migrateRecord,
    reportProgress,
  })
}

async function migrateRecord(client: PrismaClient, cursor: Cursor | undefined) {
  return await client.$transaction(async (tx) => {
    const record = await tx.expenses.findFirst({
      take: 1,
      skip: cursor === undefined ? undefined : 1,
      ...(cursor === undefined
        ? {}
        : {
            cursor: {
              id: cursor,
            },
          }),
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        name: true,
        notes: true,
        price: true,
      },
    })
    if (!record) {
      return cursor
    }
    await tx.expenses.update({
      where: {
        id: record.id,
      },
      data: {
        name: record.name,
        notes: record.notes,
        price: record.price,
      },
    })
    return record.id
  })
}

/**
 * Internal model:
 * {
 *   "cursor": "id",
 *   "fields": {
 *     "name": {
 *       "encrypt": true,
 *       "strictDecryption": false
 *     },
 *     "notes": {
 *       "encrypt": true,
 *       "strictDecryption": false
 *     },
 *     "price": {
 *       "encrypt": true,
 *       "strictDecryption": false
 *     }
 *   },
 *   "connections": {
 *     "user": {
 *       "modelName": "users",
 *       "isList": false
 *     }
 *   }
 * }
 */
