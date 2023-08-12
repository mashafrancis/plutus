// This file was generated by prisma-field-encryption.

import type { investments, PrismaClient } from '@prisma/client';
import {
	defaultProgressReport,
	ProgressReportCallback,
	visitRecords,
} from 'prisma-field-encryption/dist/generator/runtime';

type Cursor = investments['id'];

export async function migrate(
	client: PrismaClient,
	reportProgress: ProgressReportCallback = defaultProgressReport
): Promise<number> {
	return visitRecords<PrismaClient, Cursor>({
		modelName: 'investments',
		client,
		getTotalCount: client.investments.count,
		migrateRecord,
		reportProgress,
	});
}

async function migrateRecord(client: PrismaClient, cursor: Cursor | undefined) {
	return await client.$transaction(async (tx) => {
		const record = await tx.investments.findFirst({
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
		});
		if (!record) {
			return cursor;
		}
		await tx.investments.update({
			where: {
				id: record.id,
			},
			data: {
				id: record.id,
				name: record.name,
				notes: record.notes,
				price: record.price,
			},
		});
		return record.id;
	});
}

/**
 * Internal model:
 * {
 *   "cursor": "id",
 *   "fields": {
 *     "id": {
 *       "encrypt": true,
 *       "strictDecryption": false
 *     },
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
