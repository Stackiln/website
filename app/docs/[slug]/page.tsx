import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsNav } from "@/components/docs-nav";
import { docs, getDoc } from "@/lib/docs";

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `https://stackiln.com/docs/${doc.slug}` },
  };
}

export default async function DocumentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  const currentIndex = docs.findIndex((item) => item.slug === doc.slug);
  const previous = currentIndex > 0 ? docs[currentIndex - 1] : undefined;
  const next = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : undefined;

  return (
    <div className="docs-shell">
      <aside>
        <DocsNav current={doc.slug} />
      </aside>
      <article className="docs-content docs-guide">
        <header className="docs-guide-head">
          <div className="docs-hero-labels">
            <span className="docs-kicker">{doc.category}</span>
            <span className="docs-position">
              Guide {String(currentIndex + 1).padStart(2, "0")} / {docs.length}
            </span>
          </div>
          <h1>{doc.title}</h1>
          <p className="lead">{doc.description}</p>
        </header>

        <nav className="docs-on-this-page" aria-label="On this page">
          <span>On this page</span>
          <div>
            {doc.sections.map((section, index) => (
              <a href={`#${sectionId(section.heading)}`} key={section.heading}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                {section.heading}
              </a>
            ))}
          </div>
        </nav>

        {doc.sections.map((section, index) => (
          <section
            className="docs-guide-section"
            id={sectionId(section.heading)}
            key={section.heading}
          >
            <div className="docs-section-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
            </div>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.code && <pre>{section.code}</pre>}
          </section>
        ))}

        <nav className="docs-pagination" aria-label="Guide pagination">
          {previous ? (
            <Link href={`/docs/${previous.slug}`}>
              <span>← Previous</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <Link href="/docs">
              <span>← Back to</span>
              <strong>Documentation</strong>
            </Link>
          )}
          {next && (
            <Link className="next" href={`/docs/${next.slug}`}>
              <span>Next →</span>
              <strong>{next.title}</strong>
            </Link>
          )}
        </nav>
        <div className="edit-link">
          <a href={`https://github.com/Stackiln/website/edit/main/lib/docs.ts`}>
            Edit this page on GitHub ↗
          </a>
        </div>
      </article>
    </div>
  );
}
