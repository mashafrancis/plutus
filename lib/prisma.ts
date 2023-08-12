import { PrismaClient } from '@prisma/client';

const createPrismaClient = () => {
	return new PrismaClient({
		log: ['warn', 'query', 'error'],
	});
};

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
