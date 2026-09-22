import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsNav } from "@/components/docs-nav";
import { docs, getDoc } from "@/lib/docs";

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
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
    alternates: { canonical: `https://docs.stackiln.com/${doc.slug}` },
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

  return (
    <div className="docs-shell">
      <aside>
        <DocsNav current={doc.slug} />
      </aside>
      <article className="docs-content">
        <span className="eyebrow">Guide</span>
        <h1>{doc.title}</h1>
        <p className="lead">{doc.description}</p>
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
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
        <div className="edit-link">
          <a href={`https://github.com/Stackiln/website/edit/main/lib/docs.ts`}>
            Edit this page on GitHub ↗
          </a>
        </div>
      </article>
    </div>
  );
}
