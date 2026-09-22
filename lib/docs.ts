export type DocSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
};

export type DocPage = {
  slug: string;
  title: string;
  description: string;
  sections: DocSection[];
};

export const docs: DocPage[] = [
  {
    slug: "quick-start",
    title: "Quick start",
    description: "Generate and run a verified marketing product from source.",
    sections: [
      {
        heading: "Requirements",
        bullets: [
          "Node.js 24",
          "pnpm 9",
          "Docker Desktop or Docker Engine with Compose",
        ],
      },
      {
        heading: "Create a product",
        paragraphs: [
          "Stackiln is currently distributed from source while its compiled package surface is prepared. Clone the framework, install its pinned dependencies, and create a standalone product.",
        ],
        code: `git clone https://github.com/Stackiln/stackiln.git
cd stackiln
pnpm install --frozen-lockfile
pnpm stackiln create ../my-product \\
  --preset marketing \\
  --name "My Product" \\
  --description "A clear description"`,
      },
      {
        heading: "Run it",
        code: `cd ../my-product
cp .env.example .env.local
pnpm install --frozen-lockfile
docker compose up -d --wait db
pnpm db:migrate
pnpm dev`,
        paragraphs: [
          "Open http://localhost:3000. The generated repository has no Stackiln runtime dependency and can be moved, deployed, and maintained independently.",
        ],
      },
      {
        heading: "Add accounts",
        paragraphs: [
          "Pass --module accounts during creation to include verified email/password accounts, recovery, profile, session, export, and deletion foundations.",
        ],
        code: `pnpm stackiln create ../my-product \\
  --preset marketing \\
  --module accounts \\
  --name "My Product"`,
      },
    ],
  },
  {
    slug: "concepts",
    title: "Core concepts",
    description: "How Stackiln keeps generated products composable and ownable.",
    sections: [
      {
        heading: "Build-time, not runtime",
        paragraphs: [
          "Stackiln copies a deployable base and selected module source into a new workspace. Production code does not import Stackiln. The generated product owns its source, dependencies, database migrations, tests, and deployment files.",
        ],
      },
      {
        heading: "Explicit module ownership",
        paragraphs: [
          "Every module declares the files, routes, tables, environment variables, permissions, events, dependencies, and conflicts it owns. The planner rejects dependency cycles, ownership mismatches, and collisions before writing a destination.",
        ],
      },
      {
        heading: "Plan, stage, commit",
        paragraphs: [
          "Planning is read-only. Creation writes to a sibling staging directory, validates the result, and renames it into place only after success. Failed work removes only its own staging area.",
        ],
      },
      {
        heading: "Managed-file state",
        paragraphs: [
          "The .stackiln/state.json file records the framework version, recipe versions, manifest hash, file owners, and SHA-256 checksums. Doctor compares those checksums so future upgrade work can report customisations instead of silently overwriting them.",
        ],
      },
    ],
  },
  {
    slug: "cli",
    title: "CLI reference",
    description: "Create, inspect, diagnose, and describe Stackiln products.",
    sections: [
      {
        heading: "create",
        code: `pnpm stackiln create <directory> \\
  --preset marketing \\
  --name "Product name" \\
  [--description "..."] \\
  [--module accounts] \\
  [--plan] [--json]`,
        paragraphs: [
          "Use --plan to inspect the exact modules, files, and dependencies without writing anything. Repeat --module to select multiple optional modules as they become available.",
        ],
      },
      {
        heading: "inspect and doctor",
        code: `pnpm stackiln inspect [directory] [--json]
pnpm stackiln doctor [directory] [--json]`,
        paragraphs: [
          "Inspect reports the resolved preset, modules, framework version, deployment target, and changed managed files. Doctor also checks required runtime environment values and exits non-zero when managed files differ.",
        ],
      },
      {
        heading: "context and verify",
        code: `pnpm stackiln context [directory] [--write]
pnpm stackiln verify`,
        paragraphs: [
          "Context prints a concise product map for maintainers and coding agents. Pass --write to save AGENT_CONTEXT.md. Verify runs Stackiln's canonical repository gate.",
        ],
      },
    ],
  },
  {
    slug: "modules",
    title: "Modules and presets",
    description: "Compose only the capabilities a product needs.",
    sections: [
      {
        heading: "Available today",
        bullets: [
          "marketing preset: SEO, analytics consent, contact email, local content, and legal-page starters",
          "accounts module: verified email/password auth, recovery, profile, sessions, export, and deletion foundations",
        ],
      },
      {
        heading: "Authoring a module",
        paragraphs: [
          "Add a typed recipe in packages/generator/src/registry.ts and place product-owned files under modules/<id>/files. List every copied file in owns.files and declare all other owned surfaces. Database modules must include a checked-in migration, snapshot, journal entry, and schema export.",
        ],
      },
      {
        heading: "Quality bar",
        bullets: [
          "A disabled module must leave no source, route, dependency, environment requirement, schema, or navigation behind.",
          "A module must declare dependencies, conflicts, suspension behaviour, and removal strategy.",
          "Fixture tests must exercise the real user journey and pnpm verify must pass with Docker.",
        ],
      },
      {
        heading: "Roadmap",
        paragraphs: [
          "Personal SaaS, team SaaS, API product, marketplace, membership, and internal-tool preset names are reserved but not yet complete. The public roadmap is the source of truth; schema presence is not a production-readiness claim.",
        ],
      },
    ],
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Take the generated product to managed hosting or a container platform.",
    sections: [
      {
        heading: "Prepare production",
        bullets: [
          "Set DATABASE_URL, APP_URL, APP_ENV, and every enabled provider secret.",
          "Use a unique BETTER_AUTH_SECRET of at least 32 characters when accounts are enabled.",
          "Review legal-page starters, retention policies, email delivery, CSP, and rate limiting for your product.",
          "Back up PostgreSQL before destructive migrations.",
        ],
      },
      {
        heading: "Managed Next.js hosting",
        paragraphs: [
          "Install from the root lockfile, build the web workspace, run pnpm db:migrate once as a release step, and start the application. Keep migrations separate from horizontally scaled application startup.",
        ],
      },
      {
        heading: "Container",
        code: `docker build -t my-product .
docker run --rm -p 3000:3000 \\
  -e DATABASE_URL=... \\
  -e APP_URL=https://example.com \\
  -e APP_ENV=production \\
  my-product`,
        paragraphs: [
          "The included multi-stage image runs as a non-root user and exposes live and ready health routes. Apply migrations before starting the release image.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contributing",
    description: "Help make Stackiln safer, clearer, and more capable.",
    sections: [
      {
        heading: "Start with the repository",
        paragraphs: [
          "Search issues and pull requests before starting. Open an issue before a large feature, preset, dependency, or architectural change. Security vulnerabilities must be reported privately through GitHub Security Advisories.",
        ],
      },
      {
        heading: "Local verification",
        code: `pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm lint
pnpm verify`,
        paragraphs: [
          "The complete gate requires Docker. It verifies the framework, independent fixtures, PostgreSQL migrations, production builds, browser journeys, managed-file state, and a live non-root container.",
        ],
      },
      {
        heading: "Contribution principles",
        bullets: [
          "Keep pull requests focused and explain compatibility, security, and migration impact.",
          "Add tests for observable behaviour and documentation for user-visible changes.",
          "Never overwrite a changed managed file without an explicit conflict report.",
          "Contributions are distributed under the MIT License and governed by the Code of Conduct.",
        ],
      },
    ],
  },
];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
