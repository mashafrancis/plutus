import { Effect } from "effect";
import { DatabaseError, isPrismaError } from "./schema";

export const execute = <T>(fn: Promise<T>) =>
  Effect.tryPromise({
    try: () => fn,
    catch: (error) => {
      if (isPrismaError(error)) {
        return new DatabaseError({
          cause: error,
        });
      }

      throw error;
    },
  });
