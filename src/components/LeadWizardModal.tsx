import { useState, ChangeEvent, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SymbolIcon } from './SymbolIcon';
import { trackLandingLeadSubmit } from '../lib/tracking-runtime';

const spaceTypes = [
  { value: 'premium-shop', label: 'Premium Shop', icon: 'shopping_bag' },
  { value: 'showroom', label: 'Showroom', icon: 'storefront' },
  { value: 'office-space', label: 'Office Space', icon: 'business_center' },
  { value: 'exploring', label: 'Exploring the right option', icon: 'explore' },
];

const budgetRanges = [
  { value: 'upto-50l', label: 'Up to ₹50 Lakhs' },
  { value: '50l-75l', label: '₹50 Lakhs – ₹75 Lakhs' },
  { value: '75l-125cr', label: '₹75 Lakhs – ₹1.25 Cr' },
  { value: '125cr-above', label: '₹1.25 Cr & Above' },
];

type WizardValues = {
  spaceType: string;
  budget: string;
  fullName: string;
  phone: string;
  email: string;
  consent: boolean;
};

const initialValues: WizardValues = {
  spaceType: '',
  budget: '',
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

export default function LeadWizardModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<WizardValues>(initialValues);
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

  const handleClose = () => {
    onClose();
    // Reset after animation completes
    setTimeout(() => {
      setStep(0);
      setValues(initialValues);
      setStatus({ tone: 'idle', message: '' });
    }, 400);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const nextValue = target.type === 'checkbox' ? target.checked : target.value;
    setValues((c) => ({ ...c, [target.name]: nextValue }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus({ tone: 'idle', message: '' });

    const sourceHost = getLeadSourceHost();
    const spaceLabel = spaceTypes.find((s) => s.value === values.spaceType)?.label ?? values.spaceType;
    const budgetLabel = budgetRanges.find((b) => b.value === values.budget)?.label ?? values.budget;

    const payload = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      companyName: 'Wagholi Highstreet Enquiry',
      companyType: 'other' as const,
      websiteUrl: '',
      serviceInterest: [values.spaceType || 'general-enquiry'],
      budgetRange: budgetLabel || 'On Request',
      timeline: 'Immediate',
      problemSummary: `Space: ${spaceLabel}. Budget: ${budgetLabel}. Submitted from ${sourceHost}.`,
      consent: true,
      sourcePage: window.location.href,
      sourceCta: 'lead-wizard',
      ...utmValues,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json().catch(() => null);
      if (!response.ok) {
        const errorMessage =
          responseBody && typeof responseBody.error === 'string'
            ? responseBody.error
            : 'Something went wrong. Please try again or call our team directly.';
        throw new Error(errorMessage);
      }

      setValues(initialValues);
      trackLandingLeadSubmit({
        sourceCta: 'lead-wizard',
        serviceInterest: spaceLabel,
        budgetRange: budgetLabel,
        projectName: 'Wagholi Highstreet',
      });
      setStatus({
        tone: 'success',
        message: 'Your request is in. Our team will contact you shortly with pricing and availability.',
      });
      window.location.assign('/thank-you');
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong. Please try again or call our team directly.';
      setStatus({ tone: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedFromStep0 = values.spaceType !== '';
  const canProceedFromStep1 = values.budget !== '';

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] bg-[#0a0f18] border border-white/[0.08] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)]/60 to-transparent" />

            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 z-50 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <SymbolIcon name="close" className="h-5 w-5" />
            </button>

            {/* Progress bar */}
            <div className="px-8 pt-7 pb-3">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/5">
                    <motion.div
                      className="h-full bg-[var(--color-sandybrown-100)]"
                      initial={{ width: '0%' }}
                      animate={{ width: step > i ? '100%' : step === i ? '50%' : '0%' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className="px-8 pb-8 min-h-[420px] flex flex-col">
              <AnimatePresence mode="wait">
                {/* Step 0: Space Type */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    <h3 className="font-headline text-xl lg:text-2xl font-bold text-white mb-2 mt-2">
                      What type of space are you evaluating?
                    </h3>
                    <p className="text-white/40 text-sm mb-6">
                      Select the commercial space type that best fits your requirements.
                    </p>

                    <div className="grid grid-cols-2 gap-3 flex-1">
                      {spaceTypes.map((st) => {
                        const isSelected = values.spaceType === st.value;
                        return (
                          <button
                            key={st.value}
                            type="button"
                            onClick={() => setValues((c) => ({ ...c, spaceType: st.value }))}
                            className={`relative rounded-xl border p-5 text-left transition-all duration-300 flex flex-col gap-3 ${
                              isSelected
                                ? 'border-[var(--color-sandybrown-100)]/40 bg-[var(--color-sandybrown-100)]/10'
                                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                            }`}
                          >
                            <SymbolIcon
                              name={st.icon}
                              className={`h-5 w-5 ${
                                isSelected ? 'text-[var(--color-sandybrown-100)]' : 'text-white/30'
                              }`}
                            />
                            <span
                              className={`text-sm font-medium leading-tight ${
                                isSelected ? 'text-[var(--color-sandybrown-100)]' : 'text-white/70'
                              }`}
                            >
                              {st.label}
                            </span>
                            {isSelected && (
                              <motion.div
                                layoutId="selectedCheck"
                                className="absolute top-3 right-3"
                              >
                                <SymbolIcon name="check_circle" className="h-4 w-4 text-[var(--color-sandybrown-100)]" />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => canProceedFromStep0 && setStep(1)}
                      disabled={!canProceedFromStep0}
                      className="mt-6 w-full py-3.5 rounded-xl bg-[var(--color-sandybrown-100)] text-black font-bold text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors duration-300"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {/* Step 1: Budget */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    <h3 className="font-headline text-xl lg:text-2xl font-bold text-white mb-2 mt-2">
                      What budget range are you considering?
                    </h3>
                    <p className="text-white/40 text-sm mb-6">
                      This helps us match you with the most relevant inventory.
                    </p>

                    <div className="flex flex-col gap-3 flex-1">
                      {budgetRanges.map((br) => {
                        const isSelected = values.budget === br.value;
                        return (
                          <button
                            key={br.value}
                            type="button"
                            onClick={() => setValues((c) => ({ ...c, budget: br.value }))}
                            className={`relative rounded-xl border p-4 text-left transition-all duration-300 flex items-center gap-4 ${
                              isSelected
                                ? 'border-[var(--color-sandybrown-100)]/40 bg-[var(--color-sandybrown-100)]/10'
                                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? 'border-[var(--color-sandybrown-100)] bg-[var(--color-sandybrown-100)]'
                                  : 'border-white/20'
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full bg-black"
                                />
                              )}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                isSelected ? 'text-[var(--color-sandybrown-100)]' : 'text-white/70'
                              }`}
                            >
                              {br.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="px-6 py-3.5 rounded-xl border border-white/10 text-white/50 font-medium text-sm hover:text-white hover:border-white/20 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => canProceedFromStep1 && setStep(2)}
                        disabled={!canProceedFromStep1}
                        className="flex-1 py-3.5 rounded-xl bg-[var(--color-sandybrown-100)] text-black font-bold text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors duration-300"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Contact Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    <h3 className="font-headline text-xl lg:text-2xl font-bold text-white mb-2 mt-2">
                      Your Contact Details
                    </h3>
                    <p className="text-white/40 text-sm mb-6">
                      Fill in your details to access the latest pricing, available options, and the best booking advantage.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                      <input
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        minLength={2}
                        value={values.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--color-sandybrown-100)]/40 focus:ring-1 focus:ring-[var(--color-sandybrown-100)]/20 transition-all"
                      />
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={values.phone}
                        onChange={handleInputChange}
                        placeholder="Contact Number"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--color-sandybrown-100)]/40 focus:ring-1 focus:ring-[var(--color-sandybrown-100)]/20 transition-all"
                      />
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleInputChange}
                        placeholder="Email ID"
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--color-sandybrown-100)]/40 focus:ring-1 focus:ring-[var(--color-sandybrown-100)]/20 transition-all"
                      />

                      {/* Honeypot */}
                      <input
                        type="text"
                        name="website_url_extra"
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      {status.message && (
                        <p
                          className={`rounded-xl px-4 py-3 text-xs leading-relaxed ${
                            status.tone === 'success'
                              ? 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                              : 'border border-rose-400/30 bg-rose-500/10 text-rose-100'
                          }`}
                        >
                          {status.message}
                        </p>
                      )}

                      <div className="flex gap-3 mt-auto">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-3.5 rounded-xl border border-white/10 text-white/50 font-medium text-sm hover:text-white hover:border-white/20 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-3.5 rounded-xl bg-[var(--color-sandybrown-100)] text-black font-bold text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors duration-300"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
