type GsGroupLogoProps = {
  className?: string;
};

export function GsGroupLogo({ className = "" }: GsGroupLogoProps) {
  return (
    <img
      src="/wagholi_high_street.png"
      alt="GS Group"
      className={[
        "h-7 w-auto object-contain opacity-95 md:h-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ filter: "invert(1) hue-rotate(180deg) brightness(1.1)" }}
      loading="lazy"
      decoding="async"
    />
  );
}
