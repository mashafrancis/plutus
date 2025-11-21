import { Data } from "effect";
import { Prisma } from "@/prisma/generated/prisma/client";

export type PrismaErrors =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError;

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
  readonly cause: PrismaErrors;
}> {
  public get message() {
    return this.cause.message;
  }

  public override toString() {
    return `DatabaseError: ${this.cause.message}`;
  }
}

export function isPrismaError(error: unknown): error is PrismaErrors {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientValidationError
  );
}
