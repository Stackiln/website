import Image from "next/image";
import Link from "next/link";

export function Mark({ size = 36 }: { size?: number }) {
  return (
    <Image
      alt=""
      className="mark"
      height={size}
      priority
      src="/stackiln-mark.png"
      width={size}
    />
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
