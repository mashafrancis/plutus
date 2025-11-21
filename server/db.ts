import { PrismaPg } from "@prisma/adapter-pg";
// import {env} from '../env';
import { PrismaClient } from "@/prisma/generated/prisma/client";

export type GetDbParams = {
  connectionString: string;
};

export function getDb({ connectionString }: GetDbParams) {
  const pool = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter: pool,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db = getDb({ connectionString: process.env.DIRECT_URL as string });
// export default db;

// const createPrismaClient = () =>
//   new PrismaClient({
//     log:
//       env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//   }).$extends(withAccelerate());
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof createPrismaClient> | undefined;
// };
//
// export const db = globalForPrisma.prisma ?? createPrismaClient();
//
// if (env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = db;
// }
