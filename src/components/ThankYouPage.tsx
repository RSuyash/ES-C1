import { useEffect } from 'react';

import { GsGroupLogo } from './GsGroupLogo';
import { SiteLogo } from './SiteLogo';
import { SymbolIcon } from './SymbolIcon';
import { consumePendingLeadTrackingForThankYou } from '../lib/tracking-runtime';

type ThankYouPageProps = {
  onReturnHome?: () => void;
};

const salesPhone = '+917742080757';
const salesPhoneDisplay = '+91 77420 80757';
const salesEmail = 'wagholihighstreet12@gmail.com';

export default function ThankYouPage({ onReturnHome }: ThankYouPageProps) {
  useEffect(() => {
    void consumePendingLeadTrackingForThankYou();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020408] px-4 py-8 sm:px-6 sm:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,165,84,0.16),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_20%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-3xl rounded-[2.25rem] border border-white/10 bg-white/[0.04] px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.36)] backdrop-blur-[28px] sm:px-10 sm:py-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex items-center justify-center gap-4 rounded-full border border-white/10 bg-black/20 px-5 py-3">
              <GsGroupLogo className="w-[62px] sm:w-[72px]" />
              <div className="h-8 w-px bg-white/12" />
              <SiteLogo imageClassName="w-[132px] sm:w-[156px]" />
            </div>

            <span className="mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#d6a554]/25 bg-[#d6a554]/10 text-[#d6a554]">
              <SymbolIcon name="check_circle" className="h-10 w-10" />
            </span>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d6a554]/82">
              Wagholi Highstreet
            </p>

            <h1 className="mt-4 font-headline text-[clamp(2.2rem,5vw,4.8rem)] font-black leading-[0.96] tracking-tight text-white">
              Thank You for
              <br />
              Showing Your Interest
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
              Your enquiry has been received successfully. Our team will reach out shortly with
              pricing details, availability updates, and site-visit coordination for Wagholi
              Highstreet.
            </p>

            <div className="mt-8 grid w-full gap-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:text-left">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#d6a554]/78">
                  What happens next
                </p>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  Expect a priority callback, inventory guidance, and a convenient site-visit
                  plan from the sales team.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                  Priority callback
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                  Site visit support
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${salesPhone}`}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 transition hover:border-[#d6a554]/36 hover:bg-white/8 hover:text-white"
              >
                Call {salesPhoneDisplay}
              </a>
              <a
                href={`mailto:${salesEmail}`}
                className="inline-flex items-center justify-center rounded-full border border-[#d6a554]/22 bg-[#d6a554]/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d7a0] transition hover:bg-[#d6a554]/18"
              >
                Email Sales Team
              </a>
              <a
                href="/"
                onClick={onReturnHome}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111318] transition hover:bg-[#f5d7a0]"
              >
                Back to Wagholi Highstreet
              </a>
            </div>

            <p className="mt-8 text-sm text-white/42">
              If you need immediate assistance, call{' '}
              <a href={`tel:${salesPhone}`} className="text-[#d6a554] hover:underline">
                {salesPhoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
