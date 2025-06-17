import {PrismaClient} from "@/generated/prisma";
import {withAccelerate} from "@prisma/extension-accelerate";

import {env} from "@/env";
import {fieldEncryptionExtension} from "prisma-field-encryption";

const createPrismaClient = () =>
	new PrismaClient({
		log:
			env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	})
		.$extends(withAccelerate())
		.$extends(fieldEncryptionExtension());

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
