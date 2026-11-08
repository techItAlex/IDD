// The idd wordmark: the "i" is topped by a map pin. Draws in the current text color.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 172 114"
      fill="none"
      stroke="currentColor"
      strokeWidth={18}
      strokeLinecap="round"
      role="img"
      aria-label="idd"
    >
      <path
        d="M22 50C14 41 6 33 6 23a16 16 0 0 1 32 0c0 10-8 18-16 27zM22 16a7 7 0 1 0 0 14 7 7 0 1 0 0-14z"
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
      <path d="M22 54v42" />
      <circle cx="68" cy="75" r="20" />
      <path d="M88 20v76" />
      <circle cx="135" cy="75" r="20" />
      <path d="M155 20v76" />
    </svg>
  );
}
