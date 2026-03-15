import { Schema } from "effect";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Email = Schema.String.pipe(
  Schema.pattern(EMAIL_REGEX, { message: () => "Invalid email address" })
);
