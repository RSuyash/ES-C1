import test from "node:test";
import assert from "node:assert/strict";

import {
  buildGoogleAdsSendTo,
  storePendingLeadTrackingForThankYou,
  takePendingLeadTrackingForThankYou,
  type LeadTrackingPayload,
} from "./tracking-runtime";

function createMemoryStorage() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
  };
}

test("buildGoogleAdsSendTo returns the canonical AW/label pair", () => {
  assert.equal(
    buildGoogleAdsSendTo({
      googleAdsTagId: "AW-18098571219",
      googleAdsLeadConversionLabel: "wagholiLeadPrimary_01",
    }),
    "AW-18098571219/wagholiLeadPrimary_01",
  );
});

test("buildGoogleAdsSendTo returns null when the conversion label is missing", () => {
  assert.equal(
    buildGoogleAdsSendTo({
      googleAdsTagId: "AW-18098571219",
      googleAdsLeadConversionLabel: null,
    }),
    null,
  );
});

test("pending lead tracking is consumed exactly once from session storage", () => {
  const storage = createMemoryStorage();
  const payload: LeadTrackingPayload = {
    sourceCta: "lead-wizard",
    serviceInterest: "Showroom",
    budgetRange: "₹75 Lakhs – ₹1.25 Cr",
    projectName: "Wagholi Highstreet",
  };

  const stored = storePendingLeadTrackingForThankYou(
    storage,
    payload,
    "https://wagholihighstreet.in/?utm_source=google",
  );

  assert.equal(stored.sourceCta, "lead-wizard");
  assert.equal(stored.sourcePage, "https://wagholihighstreet.in/?utm_source=google");

  const consumed = takePendingLeadTrackingForThankYou(storage);
  assert.equal(consumed?.sourceCta, "lead-wizard");
  assert.equal(consumed?.sourcePage, "https://wagholihighstreet.in/?utm_source=google");
  assert.equal(takePendingLeadTrackingForThankYou(storage), null);
});
