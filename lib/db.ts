import { env } from '@/env.mjs';
import { PrismaClient } from '@prisma/client/extension';

const logThreshold = 500;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		errorFormat: env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
		log:
			env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

function getClient(): PrismaClient {
	// NOTE: during development, if you change anything in this function, remember
	// that this only runs once per server restart and won't automatically be
	// re-run per request like everything else is.
	const client = new PrismaClient({
		log: [
			{ level: 'query', emit: 'event' },
			{ level: 'error', emit: 'stdout' },
			{ level: 'info', emit: 'stdout' },
			{ level: 'warn', emit: 'stdout' },
		],
	});
	client.$on('query', async (e: any) => {
		if (e.duration < logThreshold) return;
		const { default: chalk } = await import('chalk');

		const color =
			e.duration < logThreshold * 1.1
				? 'green'
				: e.duration < logThreshold * 1.2
				? 'blue'
				: e.duration < logThreshold * 1.3
				? 'yellow'
				: e.duration < logThreshold * 1.4
				? 'redBright'
				: 'red';
		const dur = chalk[color](`${e.duration}ms`);
		console.log(`prisma:query - ${dur} - ${e.query}`);
	});
	// make the connection eagerly so the first request doesn't have to wait
	void client.$connect();
	return client;
}
