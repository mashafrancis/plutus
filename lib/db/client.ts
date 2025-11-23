import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const connectionString = process.env.DATABASE_URL;

export function getDb() {
  // const adapter = new PrismaPg({connectionString});
  return new PrismaClient({
      log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }).$extends(withAccelerate());
}

export const db = getDb();
