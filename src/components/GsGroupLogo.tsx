type GsGroupLogoProps = {
  className?: string;
};

export function GsGroupLogo({ className = "" }: GsGroupLogoProps) {
  return (
    <img
      src="/logo-light-text.webp"
      alt="GS Group"
      width={380}
      height={268}
      className={[
        "h-auto w-[68px] max-w-full object-contain opacity-95 drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)] sm:w-[78px] md:w-[88px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      loading="lazy"
      decoding="async"
    />
  );
}
