import { CopyCommand } from "@/components/copy-command";
import { Mark } from "@/components/logo";
import { SiteHeader } from "@/components/site-header";

const capabilities = [
  {
    number: "01",
    title: "Compose deliberately",
    body: "Presets resolve explicit modules with declared files, routes, tables, environment variables, dependencies, and conflicts.",
  },
  {
    number: "02",
    title: "Generate transactionally",
    body: "Inspect a read-only plan first. Stackiln writes through a sibling stage and commits only after the product validates.",
  },
  {
    number: "03",
    title: "Own every line",
    body: "The result is a standalone Next.js workspace. No generator runtime, private registry, or framework-shaped deployment lock-in.",
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <i /> Open source · MIT · Alpha
          </span>
          <h1>
            Build the stack.
            <br />
            <em>Own the product.</em>
          </h1>
          <p>
            Stackiln turns a verified base and composable modules into a
            production-oriented Next.js product—then gets out of the way.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://docs.stackiln.com/quick-start">
              Read the quick start
            </a>
            <a className="button secondary" href="https://github.com/Stackiln/stackiln">
              View on GitHub <span>↗</span>
            </a>
          </div>
          <CopyCommand />
        </div>

      </section>

      <section className="proof-strip" aria-label="Current verification coverage">
        <p>Verified against</p>
        <div>
          <span>Next.js 16</span>
          <span>React 19</span>
          <span>PostgreSQL 17</span>
          <span>Playwright</span>
          <span>Docker</span>
        </div>
      </section>

      <section className="section workflow" id="approach">
        <div className="section-heading">
          <span className="eyebrow">A calmer foundation</span>
          <h2>Scaffolding that respects what happens next.</h2>
          <p>
            Most starters optimise for minute one. Stackiln is designed for the
            months after generation—when products diverge, teams customise, and
            safe change matters.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section ownership">
        <div className="manifest-card">
          <div className="terminal-bar">
            <span />
            <span />
            <span />
            <p>stackiln — plan</p>
          </div>
          <pre>{`Product: Acme
Preset: marketing
Modules: analytics, cms, email, legal, seo
Template and module files: 59
Dependencies: resend`}</pre>
          <div className="plan-ok">
            <span>✓</span> No destination writes performed
          </div>
        </div>
        <div className="ownership-copy">
          <span className="eyebrow">Plan before mutation</span>
          <h2>See the product before Stackiln writes it.</h2>
          <p>
            The planner resolves dependencies, rejects collisions, and lists the
            exact output. Apply uses a sibling staging directory; managed-file
            hashes protect later customisation.
          </p>
          <a href="https://docs.stackiln.com/concepts">Understand the model →</a>
        </div>
      </section>

      <section className="section status-section">
        <div>
          <span className="eyebrow">Honest by default</span>
          <h2>Alpha, with a real quality gate.</h2>
        </div>
        <div className="status-card">
          <div className="status-line">
            <span>Available</span>
            <strong>Marketing + accounts</strong>
          </div>
          <div className="status-line">
            <span>Verified</span>
            <strong>DB · browser · container</strong>
          </div>
          <div className="status-line muted">
            <span>In progress</span>
            <strong>SaaS presets + upgrades</strong>
          </div>
          <a href="https://github.com/Stackiln/stackiln/blob/main/ROADMAP.md">
            Read the public roadmap ↗
          </a>
        </div>
      </section>

      <section className="cta">
        <Mark size={64} />
        <h2>Start with a product you can keep.</h2>
        <p>Open source, permissively licensed, and built to leave you in control.</p>
        <div className="hero-actions">
          <a className="button primary" href="https://docs.stackiln.com/quick-start">
            Get started
          </a>
          <a className="button secondary" href="https://github.com/Stackiln/stackiln">
            Star on GitHub
          </a>
        </div>
      </section>

      <footer>
        <div>
          <strong>Stackiln</strong>
          <span>Shape the stack. Own the outcome.</span>
        </div>
        <nav aria-label="Footer">
          <a href="https://docs.stackiln.com">Docs</a>
          <a href="https://github.com/Stackiln/stackiln">GitHub</a>
          <a href="https://github.com/Stackiln/stackiln/blob/main/LICENSE">MIT License</a>
          <a href="https://github.com/Stackiln/stackiln/blob/main/SECURITY.md">Security</a>
        </nav>
      </footer>
    </main>
  );
}
