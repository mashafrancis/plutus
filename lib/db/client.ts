import { PrismaPg } from "@prisma/adapter-pg";
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

export const prisma = getDb({
  connectionString: process.env.DIRECT_URL as string,
});
