import Image from "next/image";
import Link from "next/link";

export function Logo({ docs = false }: { docs?: boolean }) {
  return (
    <Link className="logo" href={docs ? "https://stackiln.com" : "/"}>
      <Image
        src="/stackiln-mark.png"
        alt=""
        width={42}
        height={42}
        priority
      />
      <span>Stackiln</span>
    </Link>
  );
}
