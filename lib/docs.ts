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
    description: "Build and run a marketing product with Studio or the CLI.",
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
        heading: "Build visually with Studio",
        paragraphs: [
          "Start the local Studio from the Stackiln checkout, then open http://127.0.0.1:4173. Choose a page recipe, search the 60-block catalogue, arrange the page, and edit its content and theme before exporting.",
        ],
        code: "git clone https://github.com/Stackiln/stackiln.git\ncd stackiln\npnpm install --frozen-lockfile\npnpm stackiln studio ../my-product",
      },
      {
        heading: "Or create from the CLI",
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
    slug: "studio",
    title: "Studio builder",
    description: "A complete first-run guide to composing, exporting, and running a site.",
    category: "Start",
    sections: [
      {
        heading: "What you will make",
        paragraphs: [
          "This guide starts Stackiln Studio on your computer, lets you assemble a marketing site in the browser, and exports a complete Next.js repository named my-product. Nothing is uploaded to Stackiln, and the builder is not a hosted service.",
          "Studio is a generator, not a page editor attached to a live site. You design a new product, export it once, and continue working in the generated source code.",
        ],
        bullets: [
          "Studio runs at http://127.0.0.1:4173 on your computer.",
          "Your draft stays inside the Stackiln checkout until export.",
          "The exported product has no Stackiln runtime dependency.",
          "Expect about ten minutes for the first run, excluding software downloads.",
        ],
      },
      {
        heading: "Install the prerequisites",
        paragraphs: [
          "Install Node.js 24, Git, and pnpm 9 before continuing. Docker is not needed to open Studio, but it is needed after export to run the generated PostgreSQL database and complete the full verification gate.",
          "Open PowerShell on Windows or Terminal on macOS/Linux and run these checks. Each command should print a version instead of an error.",
        ],
        code: "node --version\ngit --version\npnpm --version\ndocker --version\ndocker compose version",
        bullets: [
          "Node should begin with v24.",
          "pnpm should begin with 9.",
          "If PowerShell blocks pnpm.ps1, use pnpm.cmd everywhere this guide says pnpm.",
          "Start Docker Desktop before the Run the exported site step.",
        ],
      },
      {
        heading: "Download Stackiln",
        paragraphs: [
          "Choose a folder where you keep development projects. The commands below download Stackiln, enter its repository, and install the exact dependency versions recorded by the project.",
          "Stay inside the stackiln directory for every Studio command in this guide.",
        ],
        code: "git clone https://github.com/Stackiln/stackiln.git\ncd stackiln\npnpm install --frozen-lockfile",
      },
      {
        heading: "Start the builder",
        paragraphs: [
          "Run the command below from the stackiln directory. The ../my-product argument means export into a new folder named my-product beside the Stackiln checkout. Pick a different name now if you want the generated folder to use a different name.",
          "The destination must not already exist. Do not point Studio at an existing application or a folder containing files.",
        ],
        code: "pnpm stackiln studio ../my-product",
        bullets: [
          "Leave this terminal window open while using Studio.",
          "Wait for the line Stackiln Studio: http://127.0.0.1:4173.",
          "Open http://127.0.0.1:4173 in your browser; Studio does not open it automatically.",
          "If port 4173 is busy, stop the command with Ctrl+C and run pnpm stackiln studio ../my-product --port 5000, then open http://127.0.0.1:5000.",
        ],
      },
      {
        heading: "Understand the workspace",
        paragraphs: [
          "Studio has three working areas and a top bar. If the right-hand inspector is missing, make the browser window wider than 1000 pixels or zoom out; it is hidden on narrow screens.",
        ],
        bullets: [
          "Left — Block library: search the 60 available page sections and drag them into the page.",
          "Centre — Canvas: preview the order, select sections, move them, or remove them.",
          "Right — Design and content: edit site-wide design choices and the selected section's copy.",
          "Top — Status and actions: confirm the export destination, watch save state, save immediately, or export.",
          "Composition — Switch between the marketing-classic, saas-launch, editorial, and waitlist starting recipes.",
        ],
      },
      {
        heading: "Build your page",
        paragraphs: [
          "First choose the closest composition from the dropdown above the canvas. This gives you a sensible ordered page instead of an empty screen. Warning: choosing another composition replaces your current custom block order with that recipe.",
          "Use the search box to find a block, then drag its card from the left library and drop it anywhere on the centre canvas. Clicking a library card does not add it. Each block can appear only once in the current page.",
        ],
        bullets: [
          "Reorder: drag a canvas section onto another section, or use its up and down arrow buttons.",
          "Remove: use the × button in the selected section's upper-right corner.",
          "Edit: click the body of a canvas section. An orange outline marks it as selected and its fields appear on the right.",
          "Reset to a recipe: switch to another composition, then choose the recipe you want. This deliberately discards your custom block order.",
        ],
      },
      {
        heading: "Change the design and words",
        paragraphs: [
          "Use Site name and Description at the top of the right panel for the product identity. Palette, Typeface, Radius, and Density affect the whole generated site and update the canvas immediately.",
          "After selecting a section on the canvas, edit its Eyebrow, Heading, Description, and Items fields. Enter one item per line. The canvas updates while you type.",
        ],
        bullets: [
          "Keep headings short enough to scan on a phone.",
          "Use the description to say what the product does, for whom, and why it is useful.",
          "Treat the canvas as a structural preview. The exported Next.js application is the final result to review in a browser.",
        ],
      },
      {
        heading: "Confirm the draft is saved",
        paragraphs: [
          "Every change schedules an automatic save after a short pause. Watch the top-right status move from Unsaved to Saving… and then Saved locally. You can also choose Save draft to write it immediately.",
          "Drafts live in .stackiln-studio inside the framework checkout. Stop Studio with Ctrl+C and start it later with the same destination to reopen that draft. A draft is not the generated website; export is still required.",
        ],
      },
      {
        heading: "Export the product",
        paragraphs: [
          "Check that the destination shown in the top bar is the new folder you intended to create, wait for Saved locally, and choose Export site. Keep the terminal open and do not refresh the browser while Exporting… is shown.",
          "A successful export displays Exported followed by the number of selected blocks and shows the destination in a confirmation dialog. Stackiln validates the configuration, plans every file, writes through a temporary sibling stage, and only then creates the destination.",
        ],
        bullets: [
          "If export reports that the destination exists, choose a different new destination and restart Studio. It does not overwrite existing products.",
          "If validation fails, read the message in the top bar or alert, correct the named field, wait for the draft to save, and export again.",
          "Only selected blocks are copied into the product. Their content and theme become ordinary product-owned source.",
        ],
      },
      {
        heading: "Run the exported site",
        paragraphs: [
          "Stop Studio with Ctrl+C. Enter the generated product, create its local environment file, install dependencies, start PostgreSQL, apply the checked-in migration, and start Next.js. Use the command set for your shell.",
        ],
        code: "# PowerShell\ncd ../my-product\nCopy-Item .env.example .env.local\npnpm.cmd install --frozen-lockfile\ndocker compose up -d --wait db\npnpm.cmd db:migrate\npnpm.cmd dev\n\n# macOS or Linux\ncd ../my-product\ncp .env.example .env.local\npnpm install --frozen-lockfile\ndocker compose up -d --wait db\npnpm db:migrate\npnpm dev",
        bullets: [
          "Wait until Next.js reports that it is ready.",
          "Open http://localhost:3000 and review every section at desktop and phone widths.",
          "Return to the terminal and press Ctrl+C to stop Next.js.",
          "Run docker compose down when you want to stop the local database.",
        ],
      },
      {
        heading: "Check and commit the result",
        paragraphs: [
          "Run the product verification before treating the export as complete. Then initialise Git if needed and make the generated product's first commit. Review .env.local before committing; it is ignored and must stay out of version control.",
        ],
        code: "pnpm verify\ngit init\ngit add .\ngit commit -m \"feat: create product with Stackiln\"",
        bullets: [
          "apps/web/src/blocks contains the selected page-section source.",
          "stackiln.config.json contains the resolved product, brand, recipe, and content configuration.",
          "docs/blocks.md lists the exported home-page composition.",
          ".stackiln/state.json records ownership and checksums for managed files.",
        ],
      },
      {
        heading: "Fix common problems",
        bullets: [
          "pnpm is not recognised — install pnpm 9, reopen the terminal, and rerun pnpm --version.",
          "PowerShell cannot run pnpm.ps1 — replace pnpm with pnpm.cmd in that command.",
          "The browser cannot reach Studio — confirm the Studio terminal is still running and use the exact URL it printed.",
          "Port 4173 is already in use — restart Studio with --port 5000 or another unused port.",
          "The right editing panel is gone — widen the browser beyond 1000 pixels or zoom out.",
          "A dragged block will not appear — drop the card onto the centre canvas, and check whether that block is already present.",
          "Export says the destination exists — Studio only creates new products; restart it with another destination name.",
          "Docker cannot connect — start Docker Desktop and wait until its engine reports that it is running.",
          "Port 3000 is busy — stop the other development server or follow the alternate URL printed by Next.js.",
        ],
      },
      {
        heading: "Know the current limits",
        paragraphs: [
          "Studio currently creates new marketing products. It does not reopen an exported product, deploy the site, or merge later visual changes into customised source. Module selection, including accounts, remains a CLI workflow.",
          "Automatic upgrade and conflict-proposal workflows are not implemented yet. After export, work in the generated repository and use its tests, state file, and normal Git history to protect your changes.",
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
    description: "Build, create, inspect, diagnose, and describe Stackiln products.",
    category: "Reference",
    sections: [
      {
        heading: "create",
        code: "pnpm stackiln create <directory> \\\n  --preset marketing \\\n  --name \"Product name\" \\\n  [--description \"...\"] \\\n  [--module accounts] \\\n  [--recipe saas-launch] \\\n  [--block hero.centered] \\\n  [--plan] [--json]",
        bullets: [
          "directory is required and must not already contain a product.",
          "marketing is the default and currently implemented preset.",
          "Repeat --module to select multiple optional modules as they become available.",
          "--recipe selects a predefined page composition. The default is marketing-classic.",
          "Repeat --block to replace the recipe with an exact ordered block selection.",
          "--plan resolves and prints the operation without writing files.",
          "--json emits machine-readable output where supported.",
        ],
      },
      {
        heading: "studio",
        code: "pnpm stackiln studio <directory> [--port 4173]",
        paragraphs: [
          "Starts the local visual builder for a new marketing product. The directory is the eventual export destination. Studio saves a validated local draft while you arrange blocks and edit design and content, then exports through the standard planner and staged creation path.",
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
