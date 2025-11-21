import { Schema } from "effect";

export const UserId = Schema.String.pipe(Schema.brand("UserId"));

export type UserId = Schema.Schema.Type<typeof UserId>;

export const GetUserSchema = Schema.Struct({});

export type GetUserSchema = Schema.Schema.Type<typeof GetUserSchema>;

export const UserInputs = {
  get: GetUserSchema,
};
