import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

type LeadCaptureFormProps = {
  className?: string;
};

type LeadFormValues = {
  fullName: string;
  phone: string;
  email: string;
  consent: boolean;
};

const initialFormValues: LeadFormValues = {
  fullName: '',
  phone: '',
  email: '',
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

export function LeadCaptureForm({ className = '' }: LeadCaptureFormProps) {
  const [values, setValues] = useState(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({ tone: 'idle', message: '' });

  const utmValues = useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      utmSource: params.get('utm_source') ?? undefined,
      utmMedium: params.get('utm_medium') ?? undefined,
      utmCampaign: params.get('utm_campaign') ?? undefined,
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const nextValue = target.type === 'checkbox' ? target.checked : target.value;

    setValues((current) => ({
      ...current,
      [target.name]: nextValue,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.consent) {
      setStatus({
        tone: 'error',
        message: 'Please confirm consent so our team can reach you with pricing and availability.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ tone: 'idle', message: '' });

    const sourceHost = getLeadSourceHost();
    const payload = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      companyName: 'Wagholi Highstreet Enquiry',
      companyType: 'other' as const,
      websiteUrl: '',
      serviceInterest: ['commercial-space-enquiry'],
      budgetRange: 'On Request',
      timeline: 'Immediate',
      problemSummary: `Commercial property enquiry submitted from ${sourceHost}.`,
      consent: values.consent,
      sourcePage: window.location.href,
      sourceCta: 'priority-access',
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

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => null);
        const errorMessage =
          errorResponse && typeof errorResponse.error === 'string'
            ? errorResponse.error
            : 'Lead capture is temporarily unavailable. Please call the sales team right away.';
        throw new Error(errorMessage);
      }

      setValues(initialFormValues);
      setStatus({
        tone: 'success',
        message: 'Your request is in. Our team will contact you shortly with pricing and availability.',
      });
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

  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
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
            Phone Number
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
            Email Address
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
      </div>
      <div className="mt-4 flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          checked={values.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-[#d6a554]"
        />
        <label className="text-sm leading-relaxed text-white/70" htmlFor="consent">
          I agree to be contacted about pricing, availability, and project updates.
        </label>
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
        className="mt-5 w-full rounded-full bg-[#d6a554] px-8 py-4 font-headline text-base font-bold text-black transition-colors hover:bg-[#d4a758] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:px-12 lg:text-lg"
      >
        {isSubmitting ? 'Submitting…' : 'Request Priority Access'}
      </button>
    </form>
  );
}
