import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";

export class UsersService extends Effect.Service<UsersService>()(
  "UsersService",
  {
    effect: Effect.gen(function* () {
      return {
        getMe: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.user.findUnique({
                where: { id: userId },
                select: {
                  currency: true,
                  locale: true,
                  billing_start_date: true,
                  trial_start_date: true,
                  order_status: true,
                  usage: true,
                  email: true,
                  plan_status: true,
                  new_signup_email: true,
                },
              })
            );
          }),
      };
    }),
  }
) {}
