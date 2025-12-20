import "dotenv/config";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL as string;

export function getDb() {
  // const adapter = new PrismaPg({connectionString});
  return new PrismaClient({
    accelerateUrl: connectionString,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }).$extends(withAccelerate());
}

export const db = getDb();
