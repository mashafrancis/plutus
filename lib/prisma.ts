import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

declare global {
	// eslint-disable-next-line no-var
	// rome-ignore lint/style/noVar: <explanation>
	var cachedPrisma: PrismaClient;
}

let client: PrismaClient;
if (process.env.NODE_ENV === 'production') {
	client = new PrismaClient();
} else {
	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient();
	}
	client = global.cachedPrisma;
}

export const prisma = client.$extends(fieldEncryptionExtension());
