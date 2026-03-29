/**
 * Original Variant - Static design (baseline)
 */

import { SymbolIcon } from '../../SymbolIcon';

export function OriginalVariant() {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <SymbolIcon
        name="local_offer"
        className="h-4 w-4 -rotate-90 text-[var(--color-sandybrown-100)] lg:h-5 lg:w-5"
      />
      <p className="text-white/80 font-medium text-[12px] sm:text-sm lg:text-[15px] tracking-wide">
        Early Bird Benefit up to <span className="text-[var(--color-sandybrown-100)] font-bold">Rs. 5 Lakhs</span>
      </p>
    </div>
  );
}
