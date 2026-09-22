import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s · Stackiln docs",
  },
  description: "Learn how to create, understand, extend, and deploy Stackiln products.",
  metadataBase: new URL("https://docs.stackiln.com"),
  alternates: { canonical: "https://docs.stackiln.com" },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-site">
      <SiteHeader docs />
      {children}
    </div>
  );
}
