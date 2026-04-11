# Wagholi Brand Momentum Strip Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a subtle animated announcement strip to the Wagholi hero card that says `Many More Big Brands Coming`.

**Architecture:** Create a tiny dedicated hero component so the motion, spacing, and styling stay isolated from the rest of the hero markup. Mount it directly below the trust box and above the CTA in the existing glass card.

**Tech Stack:** React 19, Vite, Tailwind utility classes, `motion/react`, TypeScript.

---

### Task 1: Add the standalone strip component

**Files:**
- Create: `src/components/HeroBrandMomentumStrip.tsx`

**Steps:**

1. Create a small motion-powered strip component.
2. Add a low-contrast border, gold text, and a moving sheen overlay.
3. Keep the component self-contained and layout-safe.

### Task 2: Mount the strip in the hero card

**Files:**
- Modify: `src/App.tsx`

**Steps:**

1. Import the new component.
2. Render it directly below the trust box and above the CTA.
3. Keep spacing adjustments minimal so the rest of the card stays visually unchanged.

### Task 3: Validate and ship

**Files:**
- No new code files beyond the above

**Steps:**

1. Run `npm run lint`
2. Run `npm run build`
3. Commit and push the feature branch
4. Merge to `production`
5. Watch deploy workflow
6. Verify on VPS and live URL
