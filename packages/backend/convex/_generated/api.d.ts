/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accounts from "../accounts.js";
import type * as activities from "../activities.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as cronHandlers from "../cronHandlers.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as goals from "../goals.js";
import type * as healthCheck from "../healthCheck.js";
import type * as http from "../http.js";
import type * as investments from "../investments.js";
import type * as lib_constants from "../lib/constants.js";
import type * as lib_currency from "../lib/currency.js";
import type * as lib_currentSession from "../lib/currentSession.js";
import type * as lib_dates from "../lib/dates.js";
import type * as lib_policies from "../lib/policies.js";
import type * as lib_runtime from "../lib/runtime.js";
import type * as lib_subscriptions from "../lib/subscriptions.js";
import type * as migrations_001_migrate_onboarding_fields from "../migrations/001_migrate_onboarding_fields.js";
import type * as notifications from "../notifications.js";
import type * as schemas_auth from "../schemas/auth.js";
import type * as schemas_errors from "../schemas/errors.js";
import type * as subscriptions from "../subscriptions.js";
import type * as transactions from "../transactions.js";
import type * as userProfiles from "../userProfiles.js";
import type * as userSettings from "../userSettings.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  accounts: typeof accounts;
  activities: typeof activities;
  auth: typeof auth;
  categories: typeof categories;
  cronHandlers: typeof cronHandlers;
  crons: typeof crons;
  dashboard: typeof dashboard;
  goals: typeof goals;
  healthCheck: typeof healthCheck;
  http: typeof http;
  investments: typeof investments;
  "lib/constants": typeof lib_constants;
  "lib/currency": typeof lib_currency;
  "lib/currentSession": typeof lib_currentSession;
  "lib/dates": typeof lib_dates;
  "lib/policies": typeof lib_policies;
  "lib/runtime": typeof lib_runtime;
  "lib/subscriptions": typeof lib_subscriptions;
  "migrations/001_migrate_onboarding_fields": typeof migrations_001_migrate_onboarding_fields;
  notifications: typeof notifications;
  "schemas/auth": typeof schemas_auth;
  "schemas/errors": typeof schemas_errors;
  subscriptions: typeof subscriptions;
  transactions: typeof transactions;
  userProfiles: typeof userProfiles;
  userSettings: typeof userSettings;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("@convex-dev/better-auth/_generated/component.js").ComponentApi<"betterAuth">;
};
