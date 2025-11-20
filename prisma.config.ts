import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join('prisma', 'schema'),
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url:
      (process.env.DIRECT_URL as string) ||
      (process.env.DATABASE_URL as string),
    directUrl: process.env.DIRECT_URL as string,
  },
});
