export default function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fcmark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#fcmark)" />
      <path d="M23 15h12l8 8v23a2 2 0 0 1-2 2H23a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2z" fill="#fff" />
      <path d="M35 15v8h8" fill="none" stroke="url(#fcmark)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M27 33h10l-2.5-2.5" fill="none" stroke="url(#fcmark)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37 41H27l2.5 2.5" fill="none" stroke="url(#fcmark)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
