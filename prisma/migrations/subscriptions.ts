// This file was generated by prisma-field-encryption.

import type { PrismaClient, subscriptions } from '@prisma/client'
import {
  ProgressReportCallback,
  defaultProgressReport,
  visitRecords
} from 'prisma-field-encryption/dist/generator/runtime'

type Cursor = subscriptions['id']

export async function migrate(
  client: PrismaClient,
  reportProgress: ProgressReportCallback = defaultProgressReport
): Promise<number> {
  return visitRecords<PrismaClient, Cursor>({
    modelName: 'subscriptions',
    client,
    getTotalCount: client.subscriptions.count,
    migrateRecord,
    reportProgress,
  })
}

async function migrateRecord(client: PrismaClient, cursor: Cursor | undefined) {
  return await client.$transaction(async tx => {
    const record = await tx.subscriptions.findFirst({
      take: 1,
      skip: cursor === undefined ? undefined : 1,
      ...(cursor === undefined
        ? {}
        : {
            cursor: {
              id: cursor
            }
          }),
      orderBy: {
        id: 'asc'
      },
      select: {
        id: true,
        name: true,
        notes: true,
        price: true
      }
    })
    if (!record) {
      return cursor
    }
    await tx.subscriptions.update({
      where: {
        id: record.id
      },
      data: {
        name: record.name,
        notes: record.notes,
        price: record.price
      }
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
