// Placeholder ad slot. Replace the inner markup with your real ad network
// snippet (e.g. Google AdSense <ins className="adsbygoogle"> + push script).
// Keeping it as a labeled box avoids layout shift before ads load.

export default function AdSlot({ label = "Iklan" }: { label?: string }) {
  return (
    <div
      className="grid min-h-[90px] place-items-center rounded-xl border border-dashed border-black/15 bg-white/50 text-xs text-ink-500"
      aria-hidden="true"
    >
      {label}
    </div>
  );
}
