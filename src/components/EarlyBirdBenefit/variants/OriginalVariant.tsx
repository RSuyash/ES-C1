/**
 * Original Variant - Static design (baseline)
 */

export function OriginalVariant() {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <span className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-sm lg:text-lg transform -rotate-90">local_offer</span>
      <p className="text-white/80 font-medium text-[12px] sm:text-sm lg:text-[15px] tracking-wide">
        Early Bird Benefit up to <span className="text-[var(--color-sandybrown-100)] font-bold">₹5 Lakhs</span>
      </p>
    </div>
  );
}
