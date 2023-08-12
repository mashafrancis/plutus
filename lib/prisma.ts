import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

const createPrismaClient = () => {
	const globalClient = new PrismaClient({
		log: ['warn', 'query', 'error'],
	});
	return globalClient.$extends(fieldEncryptionExtension());
};

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
