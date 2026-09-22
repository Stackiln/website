import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>This page has not been fired yet.</h1>
      <p>The route may have moved, or it may still be on the roadmap.</p>
      <Link className="button primary" href="/">
        Return home
      </Link>
    </main>
  );
}
