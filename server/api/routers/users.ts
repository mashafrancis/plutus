import { Effect } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { UsersService } from "@/server/data-access/users/users.service";

export const usersRouter = Effect.gen(function* () {
  const usersService = yield* UsersService;

  return {
    me: protectedProcedure
      .query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        return await usersService
          .getMe({ userId })
          .pipe(RuntimeServer.runPromise);
      }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
