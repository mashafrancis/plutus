import path from 'node:path';
import {defineConfig} from "prisma/config";

import 'dotenv/config';

type Env = {
	DATABASE_URL: string;
};

export default defineConfig({
	schema: path.join('prisma', 'schema'),
	experimental: {
		studio: true,
		adapter: true
	}
})
