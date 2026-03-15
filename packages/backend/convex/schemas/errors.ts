import { Data } from "effect";
import type { Id, TableNames } from "../_generated/dataModel";

export class NotFoundError extends Data.TaggedError("NotFoundError")<{
  docId?: Id<TableNames>;
  handle?: string;
}> {}

export class ForbiddenError extends Data.TaggedError("ForbiddenError")<{
  message?: string | undefined;
}> {}

export class UnknownError extends Data.TaggedError("UnknownError")<{
  error: unknown;
  docId?: Id<TableNames>;
}> {}

export class InvalidCtxError extends Data.TaggedError("InvalidCtxError") {}

export class GetUserIdentityError extends Data.TaggedError(
  "GetUserIdentityError"
)<{
  error: unknown;
}> {}
