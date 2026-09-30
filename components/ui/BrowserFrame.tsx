import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  /** Fake URL shown in the chrome bar. */
  url?: string;
  /** "contain" shows the full screenshot (no crop); "cover" fills, top-anchored. */
  fit?: "contain" | "cover";
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A macOS-style browser window mockup wrapping a website screenshot.
 * Default fit is "contain" so wide screenshots are shown in full, uncropped.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  fit = "contain",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-[#0f0f11] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-line/70 bg-[#161618] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#3a3a3e]" />
        <span className="h-2 w-2 rounded-full bg-[#3a3a3e]" />
        <span className="h-2 w-2 rounded-full bg-[#3a3a3e]" />
        {url && (
          <span className="ml-2.5 truncate rounded-md bg-black/40 px-2.5 py-0.5 font-mono text-[10px] text-txt-muted">
            {url}
          </span>
        )}
      </div>

      {/* Viewport */}
      <div className="relative aspect-[19/10] w-full bg-[#0b0b0d]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "cover" ? "object-cover object-top" : "object-contain"}
        />
      </div>
    </div>
  );
}
