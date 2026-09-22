import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://stackiln.com"),
  title: {
    default: "Stackiln — Build the stack. Own the product.",
    template: "%s · Stackiln",
  },
  description:
    "An open-source TypeScript framework for generating production-ready, standalone Next.js products from composable modules.",
  openGraph: {
    title: "Stackiln",
    description: "Shape a product from composable modules. Ship code you own.",
    url: "https://stackiln.com",
    siteName: "Stackiln",
    type: "website",
    images: [{ url: "/og.png", width: 1774, height: 887, alt: "Stackiln" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackiln",
    description: "Build the stack. Own the product.",
    images: ["/og.png"],
  },
  alternates: { canonical: "https://stackiln.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
