import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { NAYA_PUBLIC_LEAD_KEY, trackLandingLeadSubmit } from './lib/tracking-runtime';
import { navigateToLandingPath } from './lib/landing-navigation';

type LeadCaptureFormProps = {
  className?: string;
  sourceCta?: string;
};

type LeadFormValues = {
  fullName: string;
  phone: string;
  email: string;
  spaceType: string;
  budget: string;
  consent: boolean;
};

const initialFormValues: LeadFormValues = {
  fullName: '',
  phone: '',
  email: '',
  spaceType: '',
  budget: '',
  consent: false,
};

type SubmissionStatus = {
  tone: 'idle' | 'success' | 'error';
  message: string;
};

function getLeadSourceHost() {
  const currentHost = window.location.hostname.trim();

  if (currentHost && currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return currentHost;
  }

  return 'wagholihighstreet.in';
}

const spaceOptions = [
  { value: '', label: 'Select space type...' },
  { value: 'premium-shop', label: 'Premium Shop' },
  { value: 'showroom', label: 'Showroom' },
  { value: 'office-space', label: 'Office Space' },
  { value: 'exploring', label: 'Exploring the right option' },
];

const budgetOptions = [
  { value: '', label: 'Select budget range...' },
  { value: 'upto-50l', label: 'Up to ₹50 Lakhs' },
  { value: '50l-75l', label: '₹50 Lakhs – ₹75 Lakhs' },
  { value: '75l-125cr', label: '₹75 Lakhs – ₹1.25 Cr' },
  { value: '125cr-above', label: '₹1.25 Cr & Above' },
];

export function LeadCaptureForm({ className = '', sourceCta = 'bottom-form' }: LeadCaptureFormProps) {
  const [values, setValues] = useState(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({ tone: 'idle', message: '' });
  const [isQrEnlarged, setIsQrEnlarged] = useState(false);
  const bTowerReraUrl =
    'https://maharera.maharashtra.gov.in/projects-search-result?certificate_no=P52100056495';
  const cTowerReraUrl =
    'https://maharera.maharashtra.gov.in/projects-search-result?certificate_no=P52100079202';

  const utmValues = useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      utmSource: params.get('utm_source') ?? undefined,
      utmMedium: params.get('utm_medium') ?? undefined,
      utmCampaign: params.get('utm_campaign') ?? undefined,
      utmContent: params.get('utm_content') ?? undefined,
      utmTerm: params.get('utm_term') ?? undefined,
      gclid: params.get('gclid') ?? undefined,
      gbraid: params.get('gbraid') ?? undefined,
      wbraid: params.get('wbraid') ?? undefined,
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.currentTarget;
    const nextValue = (target as HTMLInputElement).type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;

    setValues((current) => ({
      ...current,
      [target.name]: nextValue,
    }));
  };

  const toggleQr = () => {
    setIsQrEnlarged(!isQrEnlarged);
    if (!isQrEnlarged) {
      setTimeout(() => setIsQrEnlarged(false), 5000);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ tone: 'idle', message: '' });

    const sourceHost = getLeadSourceHost();
    const spaceLabel = spaceOptions.find((s) => s.value === values.spaceType)?.label ?? values.spaceType;
    const budgetLabel = budgetOptions.find((b) => b.value === values.budget)?.label ?? values.budget;

    const payload = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      companyName: 'Wagholi Highstreet Enquiry',
      companyType: 'other' as const,
      websiteUrl: '',
      serviceInterest: [values.spaceType || 'commercial-space-enquiry'],
      budgetRange: budgetLabel || 'On Request',
      timeline: 'Immediate',
      problemSummary: `Space: ${spaceLabel}. Budget: ${budgetLabel}. Submitted from ${sourceHost}.`,
      consent: true,
      sourcePage: window.location.href,
      sourceCta,
      ...utmValues,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json().catch(() => null);
      if (!response.ok) {
        const errorMessage =
          responseBody && typeof responseBody.error === 'string'
            ? responseBody.error
            : 'Lead capture is temporarily unavailable. Please call the sales team right away.';
        throw new Error(errorMessage);
      }

      setValues(initialFormValues);
      setStatus({
        tone: 'success',
        message: 'Your request is in. Our team will contact you shortly with pricing and availability.',
      });
      trackLandingLeadSubmit({
        leadId:
          responseBody && typeof responseBody.leadId === 'string'
            ? responseBody.leadId
            : undefined,
        publicLeadKey: NAYA_PUBLIC_LEAD_KEY,
        sourceCta,
        serviceInterest: spaceLabel,
        budgetRange: budgetLabel,
        projectName: 'Wagholi Highstreet',
        sourcePage: window.location.href,
      });
      navigateToLandingPath('/thank-you');
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Lead capture is temporarily unavailable. Please call the sales team right away.';

      setStatus({
        tone: 'error',
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClasses = "w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white outline-none transition-all focus:border-[#d6a554] focus:ring-1 focus:ring-[#d6a554] appearance-none";

  return (
    <form id={"lead-capture-form"} className={`lead-capture-form ${className}`} onSubmit={handleSubmit} noValidate>
      {/* Headline */}
      <p className="text-white/60 text-sm leading-relaxed mb-6 text-center">
        Fill in your details to access the latest pricing, available shop and showroom options, and the best booking advantage currently available at Wagholi Highstreet.
      </p>

      <div className="grid gap-4 text-left md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="mb-2 block text-sm font-semibold text-white/80" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={values.fullName}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-white/35 focus:border-[#d6a554] focus:ring-1 focus:ring-[#d6a554]"
            placeholder="Your name"
          />
        </div>
        <div className="md:col-span-1">
          <label className="mb-2 block text-sm font-semibold text-white/80" htmlFor="phone">
            Contact Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-white/35 focus:border-[#d6a554] focus:ring-1 focus:ring-[#d6a554]"
            placeholder="+91 98765 43210"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-white/80" htmlFor="email">
            Email ID
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white outline-none transition-all placeholder:text-white/35 focus:border-[#d6a554] focus:ring-1 focus:ring-[#d6a554]"
            placeholder="Professional Email Address"
          />
        </div>

        {/* NEW: Space Type Dropdown */}
        <div className="md:col-span-1">
          <label className="mb-2 block text-sm font-semibold text-white/80" htmlFor="spaceType">
            Type of Commercial Space
          </label>
          <select
            id="spaceType"
            name="spaceType"
            value={values.spaceType}
            onChange={handleChange}
            className={`${selectClasses} ${!values.spaceType ? 'text-white/35' : ''}`}
          >
            {spaceOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0a0f18] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* NEW: Budget Dropdown */}
        <div className="md:col-span-1">
          <label className="mb-2 block text-sm font-semibold text-white/80" htmlFor="budget">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={handleChange}
            className={`${selectClasses} ${!values.budget ? 'text-white/35' : ''}`}
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0a0f18] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RERA Trust Seal */}
      <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-4 text-center sm:text-left relative">
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={bTowerReraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-3 text-left transition hover:border-[#d6a554]/30 hover:bg-white/[0.06] min-w-0"
            onClick={(event) => {
              event.preventDefault();
              toggleQr();
            }}
          >
            <div className="relative shrink-0 rounded-lg bg-white p-1">
              <img 
                src="/qr-code.jpeg" 
                alt="B Tower MahaRERA QR code" 
                className="w-14 h-14 object-contain transition-transform duration-300 md:group-hover:scale-110" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1 leading-tight">B Tower MahaRERA</p>
              <p className="text-white/80 font-mono text-[11px] tracking-wider leading-tight break-all">P52100056495</p>
            </div>
          </a>
          <a
            href={cTowerReraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-3 text-left transition hover:border-[#d6a554]/30 hover:bg-white/[0.06] min-w-0"
          >
            <div className="relative shrink-0 rounded-lg bg-white p-1">
              <img 
                src="/qr-code-c-tower.png" 
                alt="C Tower MahaRERA QR code" 
                className="w-14 h-14 object-contain transition-transform duration-300 md:group-hover:scale-110" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1 leading-tight">C Tower MahaRERA</p>
              <p className="text-white/80 font-mono text-[11px] tracking-wider leading-tight break-all">P52100079202</p>
            </div>
          </a>
        </div>
        <p className="text-[11px] text-white/30 leading-tight text-balance">Scan either tower QR or click the registration number to verify project details.</p>
        
        {/* QR Enlarged Overlay (Mobile & Desktop) */}
        {isQrEnlarged && (
          <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
            onClick={(e) => { e.stopPropagation(); setIsQrEnlarged(false); }}
          >
            <div className="relative bg-white p-4 rounded-3xl animate-in zoom-in-95 duration-300 max-w-xs w-full shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <button 
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                onClick={() => setIsQrEnlarged(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <img src="/qr-code.jpeg" alt="MahaRERA QR Code Large" className="w-full h-auto rounded-xl shadow-inner" />
              
              <div className="mt-6 flex flex-col gap-3">
                <p className="text-black text-center text-xs font-bold uppercase tracking-tight">Scan to verify registration</p>
                
                <a 
                  href="https://maharerait.mahaonline.gov.in/ProjectSummaryView/ProjectSummaryQRCodeView?id=Q2VydGlmaWNhdGVObz1QNTIxMDAwNTY0OTUmU2NhbnR5cGU9UHJvbW90ZXJMb2dpblFSQ29kZQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-xl text-center hover:bg-neutral-800 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Verify on MahaRERA Website
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <input type="text" name="website_url_extra" className="hidden" tabIndex={-1} autoComplete="off" />
      {status.message ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-3xl px-5 py-4 text-sm leading-relaxed ${
            status.tone === 'success'
              ? 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
              : 'border border-rose-400/30 bg-rose-500/10 text-rose-100'
          }`}
        >
          {status.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-full bg-[#d6a554] px-8 py-4 font-headline text-base font-bold text-black transition-colors hover:bg-[#d4a758] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:px-12 lg:text-lg uppercase"
      >
        {isSubmitting ? 'Submitting...' : 'Schedule a Site Visit'}
      </button>
    </form>
  );
}
