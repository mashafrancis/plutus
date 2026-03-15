import { internalMutation } from "../_generated/server";

// Step 2: MIGRATE - Add default values to existing records
export const migrateOnboardingFields = internalMutation({
  handler: async (ctx) => {
    // Get all userSettings records
    const allSettings = await ctx.db.query("userSettings").collect();

    let updated = 0;

    for (const setting of allSettings) {
      // Only update if fields are missing
      if (
        setting.onboardingCompleted === undefined ||
        setting.onboardingStep === undefined
      ) {
        await ctx.db.patch(setting._id, {
          onboardingCompleted: setting.onboardingCompleted ?? false,
          onboardingStep: setting.onboardingStep ?? 0,
        });
        updated++;
      }
    }

    return {
      success: true,
      step: "migrate",
      recordsUpdated: updated,
      totalRecords: allSettings.length,
    };
  },
});
