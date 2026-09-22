import Link from "next/link";
import { DocsNav } from "@/components/docs-nav";
import { docCategories, docs } from "@/lib/docs";

export default function DocsHome() {
  return (
    <div className="docs-shell">
      <aside>
        <DocsNav />
      </aside>
      <article className="docs-content docs-overview">
        <header className="docs-hero">
          <div className="docs-hero-labels">
            <span className="docs-kicker">Stackiln documentation</span>
            <span className="docs-status">Alpha · actively maintained</span>
          </div>
          <h1>Build with clarity.</h1>
          <p className="lead">
            Build visually with Studio or work directly from the CLI, then learn
            how to understand, operate, and extend the product you own.
          </p>
        </header>

        <div className="docs-entry-grid">
          <Link className="docs-entry docs-entry-primary" href="/docs/quick-start">
            <span>Start here</span>
            <strong>Quick start</strong>
            <small>Generate and run your first product.</small>
            <i aria-hidden="true">→</i>
          </Link>
          <Link className="docs-entry" href="/docs/studio">
            <span>Build visually</span>
            <strong>Studio builder</strong>
            <small>Compose, customise, preview, and export.</small>
            <i aria-hidden="true">→</i>
          </Link>
        </div>

        <div className="docs-meta-strip" aria-label="Documentation summary">
          <div>
            <strong>{docs.length}</strong>
            <span>Guides</span>
          </div>
          <div>
            <strong>{docCategories.length}</strong>
            <span>Sections</span>
          </div>
          <div>
            <strong>MIT</strong>
            <span>Open source</span>
          </div>
        </div>

        <div className="docs-index-heading">
          <span className="docs-kicker">Browse the manual</span>
          <p>From first run to production operation.</p>
        </div>
        <div className="docs-index">
          {docCategories.map((category) => (
            <section key={category}>
              <h2>{category}</h2>
              <div>
                {docs
                  .filter((doc) => doc.category === category)
                  .map((doc) => (
                    <Link href={`/docs/${doc.slug}`} key={doc.slug}>
                      <strong>{doc.title}</strong>
                      <span>{doc.description}</span>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <div className="docs-note">
          <strong>Current status</strong>
          <p>
            Stackiln is in alpha. Studio, marketing, and optional accounts are
            verified; reserved preset names are not promises of completed functionality.
          </p>
        </div>
      </article>
    </div>
  );
}
