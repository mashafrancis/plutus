import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import type { SettingsData } from "@/lib/types/settings";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { SettingsInputs } from "@/server/data-access/settings/settings.schema";
import { SettingsService } from "@/server/data-access/settings/settings.service";

export const settingsRouter = Effect.gen(function* () {
  const settingsService = yield* SettingsService;

  return {
    // Account procedures
    createAccount: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.createAccount))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .createAccount({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    getAccounts: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .getAccounts({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    updateAccount: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updateAccount))
      .mutation(
        async ({ input }) =>
          await settingsService
            .updateAccount(input)
            .pipe(RuntimeServer.runPromise)
      ),

    deleteAccount: protectedProcedure
      .input(Schema.String)
      .mutation(
        async ({ input }) =>
          await settingsService
            .deleteAccount({ id: input })
            .pipe(RuntimeServer.runPromise)
      ),

    archiveAccount: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.archiveAccount))
      .mutation(
        async ({ input }) =>
          await settingsService
            .archiveAccount(input)
            .pipe(RuntimeServer.runPromise)
      ),

    setDefaultAccount: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.setDefaultAccount))
      .mutation(
        async ({ input }) =>
          await settingsService
            .setDefaultAccount(input)
            .pipe(RuntimeServer.runPromise)
      ),

    updateAccountBalance: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updateAccountBalance))
      .mutation(
        async ({ input }) =>
          await settingsService
            .updateAccountBalance(input)
            .pipe(RuntimeServer.runPromise)
      ),

    // Category procedures
    createCategory: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.createCategory))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .createCategory({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    getCategories: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .getCategories({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    updateCategory: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updateCategory))
      .mutation(
        async ({ input }) =>
          await settingsService
            .updateCategory(input)
            .pipe(RuntimeServer.runPromise)
      ),

    deleteCategory: protectedProcedure
      .input(Schema.String)
      .mutation(
        async ({ input }) =>
          await settingsService
            .deleteCategory({ id: input })
            .pipe(RuntimeServer.runPromise)
      ),

    archiveCategory: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.archiveCategory))
      .mutation(
        async ({ input }) =>
          await settingsService
            .archiveCategory(input)
            .pipe(RuntimeServer.runPromise)
      ),

    // Tag procedures
    createTag: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.createTag))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .createTag({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    getTags: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .getTags({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    updateTag: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updateTag))
      .mutation(
        async ({ input }) =>
          await settingsService.updateTag(input).pipe(RuntimeServer.runPromise)
      ),

    deleteTag: protectedProcedure
      .input(Schema.String)
      .mutation(
        async ({ input }) =>
          await settingsService
            .deleteTag({ id: input })
            .pipe(RuntimeServer.runPromise)
      ),

    mergeTags: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.mergeTags))
      .mutation(
        async ({ input }) =>
          await settingsService.mergeTags(input).pipe(RuntimeServer.runPromise)
      ),

    // Budget procedures
    createBudget: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.createBudget))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .createBudget({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    getBudgets: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .getBudgets({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    updateBudget: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updateBudget))
      .mutation(
        async ({ input }) =>
          await settingsService
            .updateBudget(input)
            .pipe(RuntimeServer.runPromise)
      ),

    deleteBudget: protectedProcedure
      .input(Schema.String)
      .mutation(
        async ({ input }) =>
          await settingsService
            .deleteBudget({ id: input })
            .pipe(RuntimeServer.runPromise)
      ),

    // Preferences procedures
    getPreferences: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .getPreferences({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    updatePreferences: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updatePreferences))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .updatePreferences({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    // Profile procedures
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .getProfile({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    updateProfile: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.updateProfile))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .updateProfile({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    // Data management procedures
    exportData: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.exportData))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .exportData({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    importData: protectedProcedure
      .input(Schema.standardSchemaV1(SettingsInputs.importData))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await settingsService
          .importData({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),

    deleteAllData: protectedProcedure.mutation(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await settingsService
        .deleteAllData({ userId })
        .pipe(RuntimeServer.runPromise);
    }),

    // Composite endpoint to get all settings data
    getData: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      const [accounts, categories, tags, budgets, preferences, profile] =
        await Promise.all([
          settingsService
            .getAccounts({ userId })
            .pipe(RuntimeServer.runPromise),
          settingsService
            .getCategories({ userId })
            .pipe(RuntimeServer.runPromise),
          settingsService.getTags({ userId }).pipe(RuntimeServer.runPromise),
          settingsService.getBudgets({ userId }).pipe(RuntimeServer.runPromise),
          settingsService
            .getPreferences({ userId })
            .pipe(RuntimeServer.runPromise),
          settingsService.getProfile({ userId }).pipe(RuntimeServer.runPromise),
        ]);

      return {
        accounts,
        categories,
        tags,
        budgets,
        preferences,
        profile,
      } satisfies SettingsData;
    }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
