import Link from "next/link";
import { docs } from "@/lib/docs";

export function DocsNav({ current }: { current?: string }) {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <p>Documentation</p>
      <Link className={!current ? "active" : undefined} href="/docs">
        Overview
      </Link>
      {docs.map((doc) => (
        <Link
          className={current === doc.slug ? "active" : undefined}
          href={`/docs/${doc.slug}`}
          key={doc.slug}
        >
          {doc.title}
        </Link>
      ))}
      <span className="docs-nav-separator" />
      <a href="https://github.com/Stackiln/stackiln">Source ↗</a>
      <a href="https://github.com/Stackiln/stackiln/issues">Issues ↗</a>
    </nav>
  );
}
