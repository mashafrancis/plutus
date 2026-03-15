# Onboarding Fields Migration

This migration adds `onboardingCompleted` and `onboardingStep` fields to existing `userSettings` records.

## Steps

### 1. Relax

Make the new fields optional in the schema to allow deployment without breaking existing data.

**Action**: Update `schema.ts` to make `onboardingCompleted` and `onboardingStep` optional.

### 2. Migrate (001_migrate_onboarding_fields.ts)

Backfill default values for all existing records.

**Run**:

```bash
npx convex run migrations/002_migrate_onboarding_fields:migrateOnboardingFields
```

This will:

- Query all `userSettings` records
- Add `onboardingCompleted: false` and `onboardingStep: 0` to records missing these fields
- Return count of updated records

### 3. Restrict

Make the fields required again now that all records have values.

**Action**: Update `schema.ts` to make `onboardingCompleted` and `onboardingStep` required (remove `v.optional`).

## Current Status

✅ Step 1 (Relax): Schema updated with optional fields
⏳ Step 2 (Migrate): Ready to run migration
⏸️ Step 3 (Restrict): Run after migration completes

## Commands

```bash
# Deploy with relaxed schema
npx convex deploy

# Run migration
npx convex run migrations/002_migrate_onboarding_fields:migrateOnboardingFields

# Update schema to restrict (remove v.optional)
# Then deploy again
npx convex deploy
```
