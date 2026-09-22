import { Logo } from "./logo";

export function SiteHeader({ docs = false }: { docs?: boolean }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo docs={docs} />
        <nav aria-label="Primary navigation">
          <a href="https://docs.stackiln.com">Docs</a>
          <a href="https://github.com/Stackiln/stackiln">GitHub</a>
          <a href="https://github.com/Stackiln/stackiln/blob/main/ROADMAP.md">
            Roadmap
          </a>
        </nav>
      </div>
    </header>
  );
}
