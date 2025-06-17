import path from "node:path";
import type {PrismaConfig} from "prisma";

type Env = {
	DATABASE_URL: string;
};

export default {
	earlyAccess: true,
	schema: path.join("prisma", "schema"),
} satisfies PrismaConfig<Env>;
