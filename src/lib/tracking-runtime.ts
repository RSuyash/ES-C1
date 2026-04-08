type TrackingRuntimeConfig = {
  resolvedHost: string | null;
  projectId: string | null;
  projectName: string | null;
  siteId: string | null;
  siteSlug: string | null;
  hostSource: "PRIMARY_DOMAIN" | "PREVIEW_HOST" | null;
  liveUrl: string | null;
  previewUrl: string | null;
  ga4MeasurementId: string | null;
  gtmContainerId: string | null;
  metaPixelId: string | null;
  injectGtm: boolean;
  injectGa4: boolean;
  injectMetaPixel: boolean;
  suppressGa4PageView: boolean;
  leadEventTargets: {
    dataLayer: boolean;
    ga4: boolean;
    metaPixel: boolean;
  };
  warnings: string[];
};

type LeadTrackingPayload = {
  sourceCta: string;
  serviceInterest?: string;
  budgetRange?: string;
  projectName?: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((eventName: string, ...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      push?: unknown[];
      loaded?: boolean;
      queue?: unknown[];
      version?: string;
    };
    _fbq?: Window["fbq"];
    __NAYA_TRACKING_RUNTIME__?: TrackingRuntimeConfig | null;
    __NAYA_TRACKING_RUNTIME_PROMISE__?: Promise<TrackingRuntimeConfig | null>;
  }
}

const ENDPOINT = "/api/landing/runtime/tracking-config";

function ensureRuntimeConfigScript(config: TrackingRuntimeConfig) {
  const existing = document.getElementById("naya-tracking-runtime");
  const nextPayload = JSON.stringify(config, null, 2);

  if (existing) {
    existing.textContent = nextPayload;
    return;
  }

  const script = document.createElement("script");
  script.id = "naya-tracking-runtime";
  script.type = "application/json";
  script.textContent = nextPayload;
  document.head.appendChild(script);
}

function ensureGtm(containerId: string) {
  if (document.getElementById(`naya-gtm-${containerId}`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = `naya-gtm-${containerId}`;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  document.head.appendChild(script);

  const attachNoScriptIframe = () => {
    if (document.getElementById(`naya-gtm-noscript-${containerId}`)) {
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.id = `naya-gtm-noscript-${containerId}`;
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(containerId)}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    document.body.prepend(iframe);
  };

  if (document.body) {
    attachNoScriptIframe();
  } else {
    window.addEventListener("DOMContentLoaded", attachNoScriptIframe, { once: true });
  }
}

function ensureGa4(measurementId: string, suppressPageView: boolean) {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }

  if (!document.getElementById(`naya-ga4-${measurementId}`)) {
    const script = document.createElement("script");
    script.id = `naya-ga4-${measurementId}`;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: !suppressPageView,
  });
}

function ensureMetaPixel(pixelId: string) {
  if (!window.fbq) {
    const fbqShim = function (...args: unknown[]) {
      if (fbqShim.callMethod) {
        fbqShim.callMethod(...args);
      } else {
        fbqShim.queue = fbqShim.queue || [];
        fbqShim.queue.push(args);
      }
    } as NonNullable<Window["fbq"]>;

    fbqShim.queue = [];
    fbqShim.loaded = true;
    fbqShim.version = "2.0";
    window.fbq = fbqShim;
    window._fbq = fbqShim;

    const script = document.createElement("script");
    script.id = "naya-meta-pixel-loader";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
}

function wireProviders(config: TrackingRuntimeConfig) {
  if (config.injectGtm && config.gtmContainerId) {
    ensureGtm(config.gtmContainerId);
  }
  if (config.injectGa4 && config.ga4MeasurementId) {
    ensureGa4(config.ga4MeasurementId, config.suppressGa4PageView);
  }
  if (config.injectMetaPixel && config.metaPixelId) {
    ensureMetaPixel(config.metaPixelId);
  }
}

async function fetchRuntimeConfig(): Promise<TrackingRuntimeConfig | null> {
  const response = await fetch(ENDPOINT, {
    credentials: "same-origin",
    headers: {
      "Cache-Control": "no-store",
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as TrackingRuntimeConfig;
}

export function initializeLandingTrackingRuntime() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!window.__NAYA_TRACKING_RUNTIME_PROMISE__) {
    window.__NAYA_TRACKING_RUNTIME_PROMISE__ = fetchRuntimeConfig()
      .then((config) => {
        window.__NAYA_TRACKING_RUNTIME__ = config;
        if (config) {
          ensureRuntimeConfigScript(config);
          wireProviders(config);
        }
        return config;
      })
      .catch((error) => {
        console.error("[tracking-runtime] Failed to initialize landing tracking:", error);
        window.__NAYA_TRACKING_RUNTIME__ = null;
        return null;
      });
  }

  return window.__NAYA_TRACKING_RUNTIME_PROMISE__;
}

function emitLeadTracking(config: TrackingRuntimeConfig, payload: LeadTrackingPayload) {
  const eventPayload = {
    event: "naya_lead_submit",
    source_cta: payload.sourceCta,
    service_interest: payload.serviceInterest ?? null,
    budget_range: payload.budgetRange ?? null,
    page_location: window.location.href,
    page_title: document.title,
    host: window.location.host,
    project_id: config.projectId,
    project_name: payload.projectName ?? config.projectName,
    site_slug: config.siteSlug,
  };

  if (config.leadEventTargets.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventPayload);
  }

  if (config.leadEventTargets.ga4 && window.gtag) {
    window.gtag("event", "generate_lead", {
      currency: "INR",
      source_cta: payload.sourceCta,
      service_interest: payload.serviceInterest ?? undefined,
      budget_range: payload.budgetRange ?? undefined,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  if (config.leadEventTargets.metaPixel && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: payload.projectName ?? config.projectName ?? document.title,
      content_category: "Landing Page Enquiry",
      source_cta: payload.sourceCta,
      value: 1,
      currency: "INR",
    });
  }
}

export function trackLandingLeadSubmit(payload: LeadTrackingPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const config = window.__NAYA_TRACKING_RUNTIME__;
  if (config) {
    emitLeadTracking(config, payload);
    return;
  }

  window.__NAYA_TRACKING_RUNTIME_PROMISE__
    ?.then((resolvedConfig) => {
      if (resolvedConfig) {
        emitLeadTracking(resolvedConfig, payload);
      }
    })
    .catch(() => {});
}
