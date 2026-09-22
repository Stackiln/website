import Link from "next/link";

export function Mark({ size = 36 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="mark"
      height={size}
      viewBox="0 0 44 44"
      width={size}
    >
      <path d="M5 6h27l7 6-7 6H5l7-6-7-6Z" fill="#ff9f1c" />
      <path d="M5 18h27l7 6-7 6H5l7-6-7-6Z" fill="#ff6436" />
      <path d="M5 30h27l7 6-7 6H5l7-6-7-6Z" fill="#e93f2c" />
    </svg>
  );
}

export function Logo({ docs = false }: { docs?: boolean }) {
  return (
    <Link className="logo" href={docs ? "https://stackiln.com" : "/"}>
      <Mark />
      <span>Stackiln</span>
    </Link>
  );
}
