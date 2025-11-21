import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { apiKey, organization } from "better-auth/plugins";
import { prisma } from "@/lib/db/client";

export function initAuth(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;

  githubClientId: string;
  githubClientSecret: string;
  googleClientId: string;
  googleClientSecret: string;
}) {
  const config = {
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    socialProviders: {
      github: {
        clientId: options.githubClientId,
        clientSecret: options.githubClientSecret,
      },
      google: {
        clientId: options.googleClientId,
        clientSecret: options.googleClientSecret,
      },
    },
    plugins: [organization(), apiKey()],
  } satisfies BetterAuthOptions;

  return betterAuth(config);
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
