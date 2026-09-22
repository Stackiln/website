import Link from "next/link";
import { DocsNav } from "@/components/docs-nav";
import { docs } from "@/lib/docs";

export default function DocsHome() {
  return (
    <div className="docs-shell">
      <aside>
        <DocsNav />
      </aside>
      <article className="docs-content docs-overview">
        <span className="eyebrow">Stackiln documentation</span>
        <h1>Build from a verified foundation.</h1>
        <p className="lead">
          Learn how Stackiln plans, composes, generates, and verifies standalone
          Next.js products without becoming their runtime.
        </p>
        <div className="docs-grid">
          {docs.map((doc, index) => (
            <Link href={`/docs/${doc.slug}`} key={doc.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{doc.title}</h2>
              <p>{doc.description}</p>
              <strong>Read guide →</strong>
            </Link>
          ))}
        </div>
        <div className="docs-note">
          <strong>Current status</strong>
          <p>
            Stackiln is in alpha. Marketing and optional accounts are verified;
            reserved preset names are not promises of completed functionality.
          </p>
        </div>
      </article>
    </div>
  );
}
