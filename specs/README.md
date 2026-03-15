# Plans Documentation Standard

This directory contains implementation plans for features and migrations. To ensure consistency, transparency, and high-quality handoffs, every major plan must reference and maintain three key markdown files.

## Required Files

For a plan named `FEATURE_NAME` (e.g., `FSD_MIGRATION`), you must maintain:

1.  `FEATURE_NAME_PROGRESS.md` (Active Tracker)
2.  `FEATURE_NAME_SUMMARY.md` (Executive Overview)
3.  `FEATURE_NAME_HANDOFF.md` (Technical Detail)

---

### 1. Progress Tracker (`_PROGRESS.md`)

**Purpose:** A living document updated _during_ development to track the status of tasks. It serves as the source of truth for what has been done and what remains.

**Structure:**

- **Header:** Title, Current Status (%), Last Updated Date.
- **Phases/Milestones:** Breakdown the work into logical phases.
  - For each phase, list specific tasks.
  - Mark tasks as completed (✅) as you go.
  - **Detailed Logs:** For completed items, list specific files created, bugs fixed, or refactors made.
- **Impact:** Briefly note the impact of completed phases (e.g., "Reduced X lines of code").

**Example Snippet:**

```markdown
# [Feature] Progress

**Status:** 45% | **Updated:** 2024-03-20

## Phase 1: Setup - 100%

- [x] Create feature folder
- [x] Define types
  - Created `types/index.ts`
```

---

### 2. Executive Summary (`_SUMMARY.md`)

**Purpose:** A concise, high-level overview finalized at the end of the project. It allows stakeholders to quickly understand what was achieved without getting bogged down in code details.

**Structure:**

- **Header:** Title, Date, Final Status.
- **Major Accomplishments:** Bullet points highlighting the biggest wins (e.g., "Migrated 10 components", "Improved load time by 200ms").
- **Visual Progress:** (Optional) ASCII progress bars for visual impact.
- **Final Structure:** A high-level view of the file structure or architecture key parts.
- **Key Metrics (High Level):** e.g., "86% Code Reduction", "10 New Features".
- **Quick Links:** Links to the other documents or external resources.

**Example Snippet:**

```markdown
# [Feature] Summary

**Progress:** 100% Complete

## 🎉 Major Accomplishments

- Implemented core logic
- Added 5 new UI components

## 📊 Final Structure

- `src/features/new-feature`
```

---

### 3. Handoff Document (`_HANDOFF.md`)

**Purpose:** A detailed technical report designed for the next developer (or future self). It provides deep context, "before vs. after" comparisons, and explains _why_ changes were made.

**Structure:**

- **Header:** Title, Date, Status.
- **Detailed Results:** Go through each phase/section and explain the _technical outcome_.
  - Show directory trees.
  - List specific changes in logic or architecture.
- **Key Metrics (Technical):** Specifics like "Eliminated duplicate types in X files", "Centralized API calls".
- **Final Directory Structure:** A complete, commented tree of the relevant files.
- **References:** Links to design docs, rules used, or external libraries.

**Example Snippet:**

```markdown
# [Feature] Handoff

## ✅ What's Been Accomplished

### Phase 1: Core Logic

**Result:** Created a reusable hook `useFeature.ts` that handles X, Y, Z.
**Structure:**
```

features/
├── logic/
│ └── useFeature.ts # Handles state

```

## 🎯 Key Metrics
- **Refactor:** `old-file.ts` (500 lines) → `new-file.ts` (150 lines)
```
