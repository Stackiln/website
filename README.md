# Stackiln website

The public website and documentation for [Stackiln](https://github.com/Stackiln/stackiln).

- `stackiln.com` serves the product site.
- `docs.stackiln.com` serves the documentation with clean paths such as `/quick-start`.
- One Next.js deployment serves both hosts. Host-aware routing lives in `proxy.ts`.

## Local development

Requires Node.js 24 and pnpm 9.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The product site is available at `http://localhost:3000`; the documentation routes are available under `http://localhost:3000/docs`.

## Verify

```bash
pnpm verify
```

This runs TypeScript, ESLint, and a production Next.js build.

## Deploy

Deploy the repository as a single Next.js project, then attach these domains:

- `stackiln.com`
- `www.stackiln.com` (redirect to `stackiln.com` at the hosting layer)
- `docs.stackiln.com`

Configure the DNS records shown by the hosting provider. Requests for `docs.stackiln.com` are rewritten to the internal `/docs` tree, while duplicated `/docs/...` URLs on that host redirect to their clean equivalent.

## Editing documentation

Documentation content is defined in `lib/docs.ts`. Add a page to the `docs` array and the route, navigation, and sitemap are generated automatically.

## License

[MIT](LICENSE)
