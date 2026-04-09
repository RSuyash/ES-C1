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

type TrackingDebugTone = "success" | "warning" | "neutral";

type TrackingDebugLogEntry = {
  id: number;
  label: string;
  detail: string | null;
  tone: TrackingDebugTone;
  at: string;
};

type TrackingDebugState = {
  enabled: boolean;
  config: TrackingRuntimeConfig | null;
  logs: TrackingDebugLogEntry[];
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
    __NAYA_TRACKING_DEBUG__?: TrackingDebugState;
  }
}

const ENDPOINT = "/api/landing/runtime/tracking-config";
const DEBUG_QUERY_KEY = "nayaTrackingDebug";
let debugLogSequence = 0;

function isTrackingDebugEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  return new URLSearchParams(window.location.search).get(DEBUG_QUERY_KEY) === "1";
}

function getTrackingDebugState(): TrackingDebugState {
  if (!window.__NAYA_TRACKING_DEBUG__) {
    window.__NAYA_TRACKING_DEBUG__ = {
      enabled: isTrackingDebugEnabled(),
      config: null,
      logs: [],
    };
  }

  return window.__NAYA_TRACKING_DEBUG__;
}

function escapeHtml(value: string | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDebugTime(date = new Date()) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function ensureTrackingDebugMeta(name: string, content: string | null) {
  const metaName = `naya-tracking-${name}`;
  let element = document.querySelector(`meta[name="${metaName}"]`) as HTMLMetaElement | null;

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.name = metaName;
    document.head.appendChild(element);
  }

  element.content = content;
}

function ensureTrackingDebugRoot() {
  if (!isTrackingDebugEnabled()) {
    return null;
  }

  if (!document.body) {
    window.addEventListener("DOMContentLoaded", () => renderTrackingDebugOverlay(), {
      once: true,
    });
    return null;
  }

  let root = document.getElementById("naya-tracking-debug") as HTMLElement | null;
  if (!root) {
    root = document.createElement("aside");
    root.id = "naya-tracking-debug";
    root.setAttribute(
      "style",
      [
        "position:fixed",
        "right:16px",
        "bottom:16px",
        "z-index:2147483000",
        "width:min(420px,calc(100vw - 24px))",
        "max-height:min(72vh,580px)",
        "overflow:auto",
        "border:1px solid rgba(15,23,42,0.12)",
        "background:rgba(255,255,255,0.98)",
        "border-radius:20px",
        "box-shadow:0 20px 48px rgba(15,23,42,0.18)",
        "backdrop-filter:blur(16px)",
        "padding:16px",
        "font:12px/1.5 Inter,system-ui,sans-serif",
        "color:#172132",
      ].join(";"),
    );
    document.body.appendChild(root);
  }

  return root;
}

function renderTrackingDebugOverlay() {
  const root = ensureTrackingDebugRoot();
  if (!root) {
    return;
  }

  const state = getTrackingDebugState();
  const config = state.config;
  const providerRows = [
    ["GA4", config?.ga4MeasurementId ?? null, config?.injectGa4 ?? false],
    ["GTM", config?.gtmContainerId ?? null, config?.injectGtm ?? false],
    ["Meta", config?.metaPixelId ?? null, config?.injectMetaPixel ?? false],
  ] as const;
  const toneColor: Record<TrackingDebugTone, string> = {
    success: "#117e5a",
    warning: "#b45309",
    neutral: "#526071",
  };
  const toneBackground: Record<TrackingDebugTone, string> = {
    success: "rgba(17,126,90,0.12)",
    warning: "rgba(180,83,9,0.12)",
    neutral: "rgba(82,96,113,0.12)",
  };

  const logMarkup = state.logs
    .slice(-8)
    .reverse()
    .map(
      (entry) => `
        <div style="border:1px solid rgba(15,23,42,0.08);border-radius:14px;padding:10px 12px;background:#f8fafc;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <strong style="font-size:12px;color:#172132;">${escapeHtml(entry.label)}</strong>
            <span style="font-size:10px;color:#607082;">${escapeHtml(entry.at)}</span>
          </div>
          ${
            entry.detail
              ? `<p style="margin:6px 0 0;color:${toneColor[entry.tone]};font-size:11px;">${escapeHtml(entry.detail)}</p>`
              : ""
          }
        </div>
      `,
    )
    .join("");

  root.innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
      <div>
        <p style="margin:0;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#607082;">Tracking debug</p>
        <h2 style="margin:6px 0 0;font-size:18px;line-height:1.2;color:#172132;">Runtime proof</h2>
      </div>
      <span style="display:inline-flex;align-items:center;border-radius:999px;padding:6px 10px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;background:${config ? "rgba(17,126,90,0.12)" : "rgba(82,96,113,0.12)"};color:${config ? "#117e5a" : "#526071"};">
        ${config ? "Resolved" : "Waiting"}
      </span>
    </div>

    <div style="margin-top:14px;display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr));">
      <div style="border:1px solid rgba(15,23,42,0.08);border-radius:16px;padding:12px;background:#f8fafc;">
        <p style="margin:0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#607082;">Host</p>
        <p style="margin:6px 0 0;font-weight:600;word-break:break-word;">${escapeHtml(config?.resolvedHost ?? window.location.host)}</p>
      </div>
      <div style="border:1px solid rgba(15,23,42,0.08);border-radius:16px;padding:12px;background:#f8fafc;">
        <p style="margin:0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#607082;">Project / site</p>
        <p style="margin:6px 0 0;font-weight:600;word-break:break-word;">${escapeHtml(config?.projectName ?? "Unknown")} · ${escapeHtml(config?.siteSlug ?? "Pending")}</p>
      </div>
    </div>

    <div style="margin-top:14px;display:grid;gap:8px;">
      ${providerRows
        .map(
          ([label, value, enabled]) => `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(15,23,42,0.08);border-radius:16px;padding:12px;background:#f8fafc;">
              <div>
                <p style="margin:0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#607082;">${label}</p>
                <p style="margin:6px 0 0;font-weight:600;word-break:break-word;">${escapeHtml(value || "Not configured")}</p>
              </div>
              <span style="display:inline-flex;align-items:center;border-radius:999px;padding:6px 10px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;background:${enabled ? "rgba(17,126,90,0.12)" : "rgba(82,96,113,0.12)"};color:${enabled ? "#117e5a" : "#526071"};">
                ${enabled ? "Injecting" : "Idle"}
              </span>
            </div>
          `,
        )
        .join("")}
    </div>

    <div style="margin-top:14px;">
      <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#607082;">Event log</p>
      <div style="display:grid;gap:8px;">
        ${
          logMarkup ||
          '<div style="border:1px dashed rgba(15,23,42,0.16);border-radius:14px;padding:12px;color:#607082;background:#f8fafc;">Waiting for runtime activity.</div>'
        }
      </div>
    </div>
  `;
}

function recordTrackingDebug(
  label: string,
  detail: string | null = null,
  tone: TrackingDebugTone = "neutral",
) {
  if (!isTrackingDebugEnabled()) {
    return;
  }

  const state = getTrackingDebugState();
  state.logs = [
    ...state.logs,
    {
      id: ++debugLogSequence,
      label,
      detail,
      tone,
      at: formatDebugTime(),
    },
  ].slice(-24);
  renderTrackingDebugOverlay();
}

function syncTrackingDebugArtifacts(config: TrackingRuntimeConfig) {
  if (!isTrackingDebugEnabled()) {
    return;
  }

  const state = getTrackingDebugState();
  state.config = config;
  document.documentElement.dataset.nayaTrackingDebug = "enabled";
  ensureTrackingDebugMeta("project-id", config.projectId);
  ensureTrackingDebugMeta("project-name", config.projectName);
  ensureTrackingDebugMeta("site-id", config.siteId);
  ensureTrackingDebugMeta("site-slug", config.siteSlug);
  ensureTrackingDebugMeta("ga4", config.ga4MeasurementId);
  ensureTrackingDebugMeta("gtm", config.gtmContainerId);
  ensureTrackingDebugMeta("meta", config.metaPixelId);
  renderTrackingDebugOverlay();
}

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
  recordTrackingDebug("GTM bootstrap queued", containerId, "neutral");

  const script = document.createElement("script");
  script.id = `naya-gtm-${containerId}`;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  script.addEventListener("load", () => {
    recordTrackingDebug("GTM script loaded", containerId, "success");
  });
  script.addEventListener("error", () => {
    recordTrackingDebug("GTM script failed", containerId, "warning");
  });
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
    script.addEventListener("load", () => {
      recordTrackingDebug("GA4 library loaded", measurementId, "success");
    });
    script.addEventListener("error", () => {
      recordTrackingDebug("GA4 library failed", measurementId, "warning");
    });
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: !suppressPageView,
  });
  recordTrackingDebug(
    "GA4 configured",
    `${measurementId}${suppressPageView ? " · page_view suppressed (GTM active)" : ""}`,
    "success",
  );
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
    script.addEventListener("load", () => {
      recordTrackingDebug("Meta Pixel library loaded", pixelId, "success");
    });
    script.addEventListener("error", () => {
      recordTrackingDebug("Meta Pixel library failed", pixelId, "warning");
    });
    document.head.appendChild(script);
  }

  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
  recordTrackingDebug("Meta PageView queued", pixelId, "success");
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

  if (isTrackingDebugEnabled()) {
    renderTrackingDebugOverlay();
    recordTrackingDebug("Debug mode enabled", window.location.href, "neutral");
  }

  if (!window.__NAYA_TRACKING_RUNTIME_PROMISE__) {
    window.__NAYA_TRACKING_RUNTIME_PROMISE__ = fetchRuntimeConfig()
      .then((config) => {
        window.__NAYA_TRACKING_RUNTIME__ = config;
        if (config) {
          ensureRuntimeConfigScript(config);
          syncTrackingDebugArtifacts(config);
          recordTrackingDebug(
            "Runtime config loaded",
            `${config.projectName ?? "Unknown"} · ${config.siteSlug ?? "site pending"}`,
            config.warnings.length ? "warning" : "success",
          );
          wireProviders(config);
        } else {
          recordTrackingDebug("Runtime config missing", "The tracking endpoint returned no config.", "warning");
        }
        return config;
      })
      .catch((error) => {
        console.error("[tracking-runtime] Failed to initialize landing tracking:", error);
        window.__NAYA_TRACKING_RUNTIME__ = null;
        recordTrackingDebug(
          "Runtime initialization failed",
          error instanceof Error ? error.message : "Unknown error",
          "warning",
        );
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
    recordTrackingDebug("dataLayer lead event queued", payload.sourceCta, "success");
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
    recordTrackingDebug("GA4 lead event queued", payload.sourceCta, "success");
  }

  if (config.leadEventTargets.metaPixel && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: payload.projectName ?? config.projectName ?? document.title,
      content_category: "Landing Page Enquiry",
      source_cta: payload.sourceCta,
      value: 1,
      currency: "INR",
    });
    recordTrackingDebug("Meta lead event queued", payload.sourceCta, "success");
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
