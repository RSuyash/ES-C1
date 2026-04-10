type SiteLogoProps = {
  wrapperClassName?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export function SiteLogo({
  wrapperClassName = "",
  imageClassName = "",
  loading = "lazy",
  fetchPriority = "auto",
}: SiteLogoProps) {
  return (
    <div className={["inline-flex items-center", wrapperClassName].filter(Boolean).join(" ")}>
      <img
        src="/wagholi_high_street_light.webp"
        alt="Wagholi Highstreet"
        width={1174}
        height={389}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={[
          "h-auto w-[136px] max-w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.38)] sm:w-[162px] lg:w-[210px]",
          imageClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
