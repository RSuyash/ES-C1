import test from "node:test";
import assert from "node:assert/strict";

import {
  buildClarityTagUrl,
  buildPublicLeadTrackingEventEndpoint,
  buildThankYouTrackingEventPayload,
  ensureClarityScript,
  buildGoogleAdsSendTo,
  NAYA_PUBLIC_LEAD_KEY,
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
      googleAdsConversionMode: "DIRECT_LABEL",
      googleAdsLeadConversionLabel: "wagholiLeadPrimary_01",
    }),
    "AW-18098571219/wagholiLeadPrimary_01",
  );
});

test("buildGoogleAdsSendTo returns null when the conversion label is missing", () => {
  assert.equal(
    buildGoogleAdsSendTo({
      googleAdsTagId: "AW-18098571219",
      googleAdsConversionMode: "DIRECT_LABEL",
      googleAdsLeadConversionLabel: null,
    }),
    null,
  );
});

test("buildGoogleAdsSendTo returns null when Google Ads imports conversions from GA4", () => {
  assert.equal(
    buildGoogleAdsSendTo({
      googleAdsTagId: "AW-18098571219",
      googleAdsConversionMode: "GA4_IMPORTED",
      googleAdsLeadConversionLabel: "wagholiLeadPrimary_01",
    }),
    null,
  );
});

test("pending lead tracking is consumed exactly once from session storage", () => {
  const storage = createMemoryStorage();
  const payload: LeadTrackingPayload = {
    leadId: "cmo_test_lead",
    publicLeadKey: NAYA_PUBLIC_LEAD_KEY,
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
  assert.equal(stored.leadId, "cmo_test_lead");
  assert.equal(stored.sourcePage, "https://wagholihighstreet.in/?utm_source=google");

  const consumed = takePendingLeadTrackingForThankYou(storage);
  assert.equal(consumed?.sourceCta, "lead-wizard");
  assert.equal(consumed?.leadId, "cmo_test_lead");
  assert.equal(consumed?.sourcePage, "https://wagholihighstreet.in/?utm_source=google");
  assert.equal(takePendingLeadTrackingForThankYou(storage), null);
});

test("buildPublicLeadTrackingEventEndpoint targets the project proof endpoint", () => {
  assert.equal(
    buildPublicLeadTrackingEventEndpoint({
      leadId: "lead_123",
      publicLeadKey: NAYA_PUBLIC_LEAD_KEY,
    }),
    "/api/landing/public/lead_wagholi_highstreet/leads/lead_123/tracking-events",
  );
  assert.equal(buildPublicLeadTrackingEventEndpoint({ leadId: "" }), null);
});

test("buildThankYouTrackingEventPayload includes source proof context without PII", () => {
  const storage = createMemoryStorage();
  const pending = storePendingLeadTrackingForThankYou(
    storage,
    {
      leadId: "lead_123",
      sourceCta: "lead-wizard",
      serviceInterest: "Showroom",
      budgetRange: "₹75 Lakhs – ₹1.25 Cr",
      projectName: "Wagholi Highstreet",
    },
    "https://wagholihighstreet.in/?utm_source=google",
  );

  assert.deepEqual(
    buildThankYouTrackingEventPayload(
      pending,
      "https://wagholihighstreet.in/thank-you",
      "https://wagholihighstreet.in/",
    ),
    {
      eventType: "THANK_YOU_PAGE_VIEW",
      pageUrl: "https://wagholihighstreet.in/thank-you",
      referrer: "https://wagholihighstreet.in/",
      source: "thank_you_page",
      sourceCta: "lead-wizard",
      serviceInterest: "Showroom",
      configuration: null,
      budgetRange: "₹75 Lakhs – ₹1.25 Cr",
      projectName: "Wagholi Highstreet",
      sourcePage: "https://wagholihighstreet.in/?utm_source=google",
      queuedAt: pending.queuedAt,
      trackingEnvelopeId: pending.id,
    },
  );
});

test("buildClarityTagUrl returns the canonical Microsoft Clarity tag URL", () => {
  assert.equal(buildClarityTagUrl("wgqhjnwnmi"), "https://www.clarity.ms/tag/wgqhjnwnmi");
});

test("ensureClarityScript appends the Clarity loader only once", () => {
  const appended: Array<{ id?: string; async?: boolean; src?: string }> = [];
  const documentLike = {
    head: {
      appendChild(node: { id?: string; async?: boolean; src?: string }) {
        appended.push(node);
      },
    },
    createElement() {
      return {
        addEventListener() {},
        async: false,
        id: "",
        src: "",
      };
    },
    getElementById(id: string) {
      return appended.find((node) => node.id === id) ?? null;
    },
  };

  ensureClarityScript("wgqhjnwnmi", {
    document: documentLike as unknown as Document,
    window: {} as Window,
  });
  ensureClarityScript("wgqhjnwnmi", {
    document: documentLike as unknown as Document,
    window: {} as Window,
  });

  assert.equal(appended.length, 1);
  assert.equal(appended[0]?.id, "naya-clarity-loader");
  assert.equal(appended[0]?.async, true);
  assert.equal(appended[0]?.src, "https://www.clarity.ms/tag/wgqhjnwnmi");
});
