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
        <span className="docs-kicker">Stackiln documentation</span>
        <h1>Documentation</h1>
        <p className="lead">
          Learn how to generate, understand, operate, and extend a Stackiln
          product. Start with the quick start, then use the guides as a reference.
        </p>
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
            Stackiln is in alpha. Marketing and optional accounts are verified;
            reserved preset names are not promises of completed functionality.
          </p>
        </div>
      </article>
    </div>
  );
}
