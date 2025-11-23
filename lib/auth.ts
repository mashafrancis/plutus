import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { cache } from "react";
import { Resend } from "resend";
import WelcomeEmail from "@/components/email/welcome-email";
import { env } from "@/env";
import { db } from "@/lib/db/client";

const baseUrl =
  env.VERCEL_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.VERCEL_ENV === "preview"
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000";

export const auth = betterAuth({
  appName: "plutus",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  baseURL: baseUrl,
  secret: env.BETTER_AUTH_SECRET,
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const resend = new Resend(process.env.RESEND_API_KEY as string);
          await resend.emails.send({
            from: "Plutus <noreply@plutus.com>",
            to: user.email,
            subject: "Welcome to Plutus",
            react: WelcomeEmail({
              username: user.name,
              url: process.env.BETTER_AUTH_URL as string,
            }),
          });
        },
      },
    },
  },
  onAPIError: {
    throw: false,
    onError: (error) => {
      console.error(error);
    },
    errorURL: "/auth/error",
  },
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);
