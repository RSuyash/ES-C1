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
    <div
      className={[
        "inline-flex items-center rounded-[1.25rem] border border-white/10 bg-white/[0.97] px-3 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        wrapperClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src="/wagholi_high_street.webp"
        alt="Wagholi Highstreet"
        width={1174}
        height={389}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={[
          "h-auto w-[168px] max-w-full object-contain sm:w-[210px] lg:w-[280px]",
          imageClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
