export type DocSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
};

export type DocCategory =
  | "Start"
  | "Build"
  | "Reference"
  | "Operate"
  | "Project";

export type DocPage = {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
  sections: DocSection[];
};

export const docs: DocPage[] = [
  {
    slug: "quick-start",
    title: "Quick start",
    description: "Generate and run a marketing product from source.",
    category: "Start",
    sections: [
      {
        heading: "Requirements",
        bullets: [
          "Node.js 24",
          "pnpm 9",
          "Docker Desktop or Docker Engine with Compose",
          "Git for cloning Stackiln and versioning the generated product",
        ],
        paragraphs: [
          "Stackiln is currently distributed from source while its package surface is prepared. On Windows PowerShell, use pnpm.cmd when the execution policy blocks pnpm.ps1.",
        ],
      },
      {
        heading: "Create a product",
        paragraphs: [
          "Clone Stackiln, install its pinned dependencies, and generate into a directory beside the framework checkout. The marketing preset is the implemented starting point.",
        ],
        code: "git clone https://github.com/Stackiln/stackiln.git\ncd stackiln\npnpm install --frozen-lockfile\npnpm stackiln create ../my-product \\\n  --preset marketing \\\n  --name \"My Product\" \\\n  --description \"A clear description\"",
      },
      {
        heading: "Configure and run",
        code: "cd ../my-product\ncp .env.example .env.local\npnpm install --frozen-lockfile\ndocker compose up -d --wait db\npnpm db:migrate\npnpm dev",
        paragraphs: [
          "Open http://localhost:3000. Review every environment value before deploying. The generated repository is independent and has no Stackiln runtime dependency.",
        ],
      },
      {
        heading: "Add accounts",
        paragraphs: [
          "Add the accounts module at creation time for verified email/password sign-up, sign-in, recovery, profile, session, export, and deletion foundations. Accounts requires the email module, which Stackiln resolves automatically.",
        ],
        code: "pnpm stackiln create ../my-product \\\n  --preset marketing \\\n  --module accounts \\\n  --name \"My Product\"",
      },
      {
        heading: "Check the result",
        code: "cd ../stackiln\npnpm stackiln inspect ../my-product\npnpm stackiln doctor ../my-product",
        paragraphs: [
          "Inspect reports the resolved preset, modules, framework version, deployment target, and changed managed files. Doctor exits non-zero when a managed file differs from its recorded checksum.",
        ],
      },
    ],
  },
  {
    slug: "concepts",
    title: "How Stackiln works",
    description: "The generation model, ownership rules, and safety boundaries.",
    category: "Start",
    sections: [
      {
        heading: "Build-time, not runtime",
        paragraphs: [
          "Stackiln copies a deployable base and selected module source into a new workspace. Production code does not import Stackiln. The generated product owns its source, lockfile, database migrations, tests, and deployment files.",
          "This keeps deployment conventional. You can continue without Stackiln, replace generated pieces, or move the repository to a different host.",
        ],
      },
      {
        heading: "Plan, stage, commit",
        paragraphs: [
          "Planning resolves the preset, optional modules, dependencies, files, routes, tables, environment variables, and package dependencies without writing the destination.",
          "Creation writes to a sibling staging directory. Stackiln validates that staged product and renames it into place only after the operation succeeds. A failed operation removes only its own staging directory.",
        ],
      },
      {
        heading: "Explicit ownership",
        paragraphs: [
          "Every module declares the surfaces it owns. The planner rejects undeclared copied files, dependency cycles, file collisions, route collisions, table collisions, environment-name collisions, and incompatible modules before generation.",
          "Ownership describes provenance; it does not prevent product developers from editing generated code.",
        ],
      },
      {
        heading: "Product changes are protected",
        paragraphs: [
          "The .stackiln/state.json file records SHA-256 checksums for managed files. Doctor compares the current workspace with that state so future tooling can distinguish unchanged generated code from product customisations.",
          "Automatic upgrade proposals are not implemented yet. Never copy a newer template over a customised product without reviewing the difference.",
        ],
      },
    ],
  },
  {
    slug: "project-structure",
    title: "Generated project",
    description: "What Stackiln creates and where product code lives.",
    category: "Build",
    sections: [
      {
        heading: "Workspace map",
        code: "my-product/\n├─ apps/web/              Next.js application\n├─ packages/db/           Drizzle schema and migrations\n├─ packages/ui/           Shared product UI\n├─ tests/e2e/             Playwright journeys\n├─ .stackiln/state.json   Ownership and checksums\n├─ stackiln.config.json   Resolved product configuration\n├─ docker-compose.yml     Local PostgreSQL\n├─ Dockerfile             Production container\n└─ STACKILN-LICENSE.md    Source attribution notice",
        paragraphs: [
          "The generated workspace uses pnpm. Root scripts delegate to the relevant application and package workspaces.",
        ],
      },
      {
        heading: "Common commands",
        code: "pnpm dev\npnpm build\npnpm typecheck\npnpm lint\npnpm test\npnpm test:e2e\npnpm verify\npnpm db:migrate\npnpm db:generate\npnpm db:studio",
        paragraphs: [
          "Use pnpm verify before merging product changes. Browser tests expect the local services and environment described by the generated repository.",
        ],
      },
      {
        heading: "Product-owned files",
        paragraphs: [
          "Everything in the generated repository belongs to the product. The ownership state records where a file came from, but Stackiln is not a package dependency and does not control edits.",
          "Keep stackiln.config.json and .stackiln/state.json in version control. Do not commit .env.local or secrets.",
        ],
      },
      {
        heading: "Database files",
        paragraphs: [
          "Database modules include checked-in SQL migrations, snapshots, journal entries, and schema exports. A fresh product should be able to run pnpm db:migrate without first generating a migration.",
        ],
      },
    ],
  },
  {
    slug: "configuration",
    title: "Configuration",
    description: "Product identity, modules, branding, tenancy, and deployment settings.",
    category: "Build",
    sections: [
      {
        heading: "Resolved configuration",
        paragraphs: [
          "Stackiln writes stackiln.config.json into the generated product. Defaults are resolved during creation, so the file represents the complete configuration used to generate the workspace.",
        ],
        code: "{\n  \"product\": {\n    \"name\": \"My Product\",\n    \"description\": \"A clear description\",\n    \"defaultLocale\": \"en-GB\",\n    \"timezone\": \"Europe/London\",\n    \"currencies\": [\"GBP\"]\n  },\n  \"preset\": \"marketing\",\n  \"tenancy\": \"personal\",\n  \"brand\": {\n    \"font\": \"system\",\n    \"radius\": \"medium\",\n    \"density\": \"comfortable\",\n    \"palette\": \"neutral\",\n    \"motion\": \"subtle\"\n  },\n  \"modules\": { \"accounts\": true },\n  \"deployment\": { \"target\": \"container\", \"region\": \"eu-west\" },\n  \"environment\": \"local\"\n}",
      },
      {
        heading: "Product and regional defaults",
        bullets: [
          "defaultLocale defaults to en-GB.",
          "timezone defaults to Europe/London.",
          "currencies defaults to GBP and accepts three-character currency codes.",
          "environment accepts local, preview, staging, or production.",
        ],
      },
      {
        heading: "Brand settings",
        bullets: [
          "font is a product-defined string and defaults to system.",
          "radius accepts small, medium, or large.",
          "density accepts compact or comfortable.",
          "palette is a product-defined string and defaults to neutral.",
          "motion accepts none or subtle.",
        ],
        paragraphs: [
          "These values are a stable product configuration surface. The current base does not promise a complete theme generator for every value.",
        ],
      },
      {
        heading: "Deployment and tenancy",
        paragraphs: [
          "tenancy accepts personal, organisation, or hybrid. deployment.target accepts container or managed, and deployment.region defaults to eu-west.",
          "Only implemented recipes should be treated as available product functionality. Reserved enum values are not completion claims.",
        ],
      },
    ],
  },
  {
    slug: "modules",
    title: "Modules and presets",
    description: "Choose capabilities and understand their boundaries.",
    category: "Build",
    sections: [
      {
        heading: "Available now",
        bullets: [
          "marketing preset: SEO, consent-gated analytics, contact email, local typed content, and legal-page starters",
          "accounts module: verified email/password authentication, recovery, profile, sessions, export, and deletion foundations",
        ],
      },
      {
        heading: "Marketing modules",
        bullets: [
          "seo owns metadata support, sitemap, robots, and not-found behavior.",
          "analytics owns the consent component, browser event adapter, and NEXT_PUBLIC_POSTHOG_KEY.",
          "email owns the contact routes, email adapter, test journey, and provider environment values.",
          "cms owns local typed page content and the features route.",
          "legal owns product-editable privacy and terms starters.",
        ],
      },
      {
        heading: "Accounts",
        paragraphs: [
          "Accounts requires email and adds Better Auth, account routes, four database tables, migrations, browser tests, and BETTER_AUTH_SECRET. Production secrets must be unique and at least 32 characters.",
          "The current account operations are foundations: export is synchronous and deletion is immediate after email confirmation. Staff controls, audit events, retention policy, and distributed rate-limit storage remain roadmap work.",
        ],
      },
      {
        heading: "Reserved presets",
        paragraphs: [
          "Personal SaaS, team SaaS, API product, marketplace, membership, and internal-tool names exist in the schema but are not complete presets. The roadmap and verification fixtures are the source of truth.",
        ],
      },
      {
        heading: "Authoring a module",
        paragraphs: [
          "Add a typed recipe in packages/generator/src/registry.ts and product files under modules/<id>/files. Declare every copied file plus routes, tables, environment names, permissions, events, dependencies, conflicts, suspension behavior, and removal strategy.",
          "Database modules must include a checked-in Drizzle migration, snapshot, journal entry, and schema export. Add a real fixture journey and run pnpm verify with Docker.",
        ],
      },
    ],
  },
  {
    slug: "cli",
    title: "CLI reference",
    description: "Create, inspect, diagnose, and describe Stackiln products.",
    category: "Reference",
    sections: [
      {
        heading: "create",
        code: "pnpm stackiln create <directory> \\\n  --preset marketing \\\n  --name \"Product name\" \\\n  [--description \"...\"] \\\n  [--module accounts] \\\n  [--plan] [--json]",
        bullets: [
          "directory is required and must not already contain a product.",
          "marketing is the default and currently implemented preset.",
          "Repeat --module to select multiple optional modules as they become available.",
          "--plan resolves and prints the operation without writing files.",
          "--json emits machine-readable output where supported.",
        ],
      },
      {
        heading: "inspect",
        code: "pnpm stackiln inspect [directory] [--json]",
        paragraphs: [
          "Reports the preset, installed modules, Stackiln version, deployment target, and changed managed files. The directory defaults to the current working directory.",
        ],
      },
      {
        heading: "doctor",
        code: "pnpm stackiln doctor [directory] [--json]",
        paragraphs: [
          "Checks state readability, managed-file hashes, DATABASE_URL, and APP_URL. It exits with code 1 when managed files have changed and code 2 for invalid commands or arguments.",
        ],
      },
      {
        heading: "context",
        code: "pnpm stackiln context [directory]\npnpm stackiln context [directory] --write",
        paragraphs: [
          "Prints a concise map of the product for maintainers and coding agents. --write saves the same snapshot as AGENT_CONTEXT.md.",
        ],
      },
      {
        heading: "verify",
        code: "pnpm stackiln verify",
        paragraphs: [
          "Runs the framework repository's canonical verification gate. It requires Docker and is distinct from pnpm verify inside a generated product.",
        ],
      },
    ],
  },
  {
    slug: "state-and-upgrades",
    title: "State and upgrades",
    description: "Managed-file checksums, conflict detection, and the current upgrade policy.",
    category: "Reference",
    sections: [
      {
        heading: "State file",
        paragraphs: [
          ".stackiln/state.json records the state format, Stackiln version, preset, manifest hash, installed recipe versions and statuses, applied operations, and every managed file's owner and SHA-256 checksum.",
          "Keep the state file committed. It contains no application secrets.",
        ],
      },
      {
        heading: "Changed managed files",
        code: "pnpm stackiln doctor ./my-product",
        paragraphs: [
          "A changed managed file is not automatically an error. It often means the product has correctly diverged from its generated starting point. The important rule is that later Stackiln operations must not silently overwrite it.",
        ],
      },
      {
        heading: "Upgrades today",
        paragraphs: [
          "Automatic upgrade and conflict-proposal commands are not implemented. To adopt a newer Stackiln change, back up the product, generate a separate reference product with the same options, and review the relevant differences manually.",
          "Do not replace a customised file solely because its owner is listed as base or a module.",
        ],
      },
      {
        heading: "Removing modules",
        paragraphs: [
          "Removal operations are not implemented. Recipe metadata still declares whether removal is stateless or requires archival so future tooling can produce a safe plan.",
        ],
      },
    ],
  },
  {
    slug: "local-development",
    title: "Local development",
    description: "Run the generated application, database, email, and checks.",
    category: "Operate",
    sections: [
      {
        heading: "Environment",
        code: "cp .env.example .env.local",
        bullets: [
          "DATABASE_URL connects the product to PostgreSQL.",
          "APP_URL is the canonical application origin, normally http://localhost:3000 locally.",
          "APP_ENV should be local for local development.",
          "LOCAL_MAILBOX_DIR enables filesystem email delivery outside application source.",
          "Provider keys may remain empty when their local adapters support it.",
        ],
      },
      {
        heading: "Database",
        code: "docker compose up -d --wait db\npnpm db:migrate\npnpm db:studio",
        paragraphs: [
          "Migrate before starting account-enabled products. Use db:generate only while intentionally changing the schema; a clean generated product already includes its migrations.",
        ],
      },
      {
        heading: "Application",
        code: "pnpm install --frozen-lockfile\npnpm dev",
        paragraphs: [
          "The root dev command starts the Next.js web workspace. The default URL is http://localhost:3000.",
        ],
      },
      {
        heading: "Verification",
        code: "pnpm typecheck\npnpm test\npnpm lint\npnpm build\npnpm test:e2e\npnpm verify",
        paragraphs: [
          "Use targeted checks while editing and the complete verify command before merging. Playwright covers desktop and mobile user journeys in the reference fixtures.",
        ],
      },
    ],
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Prepare a generated product for managed hosting or containers.",
    category: "Operate",
    sections: [
      {
        heading: "Before production",
        bullets: [
          "Set DATABASE_URL, APP_URL, APP_ENV, and every enabled provider secret.",
          "Use a unique BETTER_AUTH_SECRET of at least 32 characters when accounts are enabled.",
          "Configure RESEND_API_KEY, EMAIL_FROM, and CONTACT_EMAIL for production mail.",
          "Review legal-page starters, retention requirements, CSP, and rate limiting for the product.",
          "Back up PostgreSQL before destructive migrations.",
        ],
      },
      {
        heading: "Release order",
        code: "pnpm install --frozen-lockfile\npnpm build\npnpm db:migrate\npnpm start",
        paragraphs: [
          "Run database migrations once as a release step, not from every horizontally scaled application process. Keep the migration and application rollout observable and reversible.",
        ],
      },
      {
        heading: "Container",
        code: "docker build -t my-product .\ndocker run --rm -p 3000:3000 \\\n  -e DATABASE_URL=... \\\n  -e APP_URL=https://example.com \\\n  -e APP_ENV=production \\\n  my-product",
        paragraphs: [
          "The included multi-stage image runs as a non-root user and exposes live and ready health routes. Apply migrations before starting the release image.",
        ],
      },
      {
        heading: "Managed Next.js hosting",
        paragraphs: [
          "Build from the repository root using the checked-in lockfile. Configure runtime environment values in the host, provision PostgreSQL separately, and use a dedicated release command or job for migrations.",
        ],
      },
      {
        heading: "Security scope",
        paragraphs: [
          "The generated baseline includes same-origin contact submission, Zod validation, security headers, a non-root container, and account safeguards. Distributed rate limiting, full CSP tuning, provider validation, audit workflows, and retention policy remain product responsibilities.",
        ],
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Common setup, generation, database, and state problems.",
    category: "Operate",
    sections: [
      {
        heading: "PowerShell blocks pnpm",
        code: "pnpm.cmd install --frozen-lockfile\npnpm.cmd stackiln --help",
        paragraphs: [
          "Windows may block pnpm.ps1 under the current execution policy. Use pnpm.cmd without changing the machine policy.",
        ],
      },
      {
        heading: "Docker or PostgreSQL is unavailable",
        code: "docker version\ndocker compose up -d --wait db\ndocker compose ps",
        paragraphs: [
          "Start Docker Desktop or the Docker Engine first. Confirm the database is healthy and that DATABASE_URL uses the same host, port, database, user, and password as the compose service.",
        ],
      },
      {
        heading: "Doctor reports changed files",
        paragraphs: [
          "Run inspect or doctor with --json to get an exact list. Review the product's Git history and keep deliberate customisations. Do not regenerate over the destination or replace those files blindly.",
        ],
      },
      {
        heading: "Generation fails",
        bullets: [
          "Run the same create command with --plan first.",
          "Check that the destination does not already exist.",
          "Use only implemented presets and modules.",
          "Install with the repository lockfile before invoking the CLI.",
          "Use --json when integrating the planner with another tool.",
        ],
      },
      {
        heading: "Email does not arrive locally",
        paragraphs: [
          "Check LOCAL_MAILBOX_DIR and inspect the local mailbox outside application source. Production delivery requires the Resend provider values; never use a production key in a committed environment file.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contributing",
    description: "Work on Stackiln itself and verify framework changes.",
    category: "Project",
    sections: [
      {
        heading: "Before starting",
        paragraphs: [
          "Search issues and pull requests first. Open an issue before a large preset, module, dependency, or architecture change. Report vulnerabilities privately through GitHub Security Advisories.",
        ],
      },
      {
        heading: "Repository checks",
        code: "pnpm install --frozen-lockfile\npnpm typecheck\npnpm test\npnpm lint\npnpm verify",
        paragraphs: [
          "The complete gate requires Docker. It validates Stackiln, independent marketing and accounts fixtures, PostgreSQL migrations, production builds, browser journeys, managed-file state, and a live non-root container.",
        ],
      },
      {
        heading: "Contribution rules",
        bullets: [
          "Keep pull requests focused and explain compatibility, security, and migration impact.",
          "Add tests for observable behavior and documentation for user-visible changes.",
          "Plans remain read-only and writes go through staging.",
          "Disabled modules leave no routes, source, dependencies, environment requirements, schema, or navigation behind.",
          "Never overwrite a changed managed file without an explicit conflict report.",
        ],
      },
      {
        heading: "License",
        paragraphs: [
          "Contributions are distributed under the MIT License. Generated products include STACKILN-LICENSE.md so the required notice follows Stackiln-derived source. Product teams own their original code, content, branding, and configuration.",
        ],
      },
    ],
  },
];

export const docCategories: DocCategory[] = [
  "Start",
  "Build",
  "Reference",
  "Operate",
  "Project",
];

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
