import Link from "next/link";
import { docCategories, docs } from "@/lib/docs";

export function DocsNav({ current }: { current?: string }) {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <Link className={!current ? "active" : undefined} href="/docs">
        Overview
      </Link>
      {docCategories.map((category) => (
        <div className="docs-nav-group" key={category}>
          <p>{category}</p>
          {docs
            .filter((doc) => doc.category === category)
            .map((doc) => (
              <Link
                className={current === doc.slug ? "active" : undefined}
                href={`/docs/${doc.slug}`}
                key={doc.slug}
              >
                {doc.title}
              </Link>
            ))}
        </div>
      ))}
      <span className="docs-nav-separator" />
      <a href="https://github.com/Stackiln/stackiln">Source ↗</a>
      <a href="https://github.com/Stackiln/stackiln/issues">Issues ↗</a>
    </nav>
  );
}
