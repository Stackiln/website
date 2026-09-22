# Stackiln website

The public website and documentation for [Stackiln](https://github.com/Stackiln/stackiln).

- `stackiln.com` serves the product site.
- `stackiln.com/docs` serves the documentation.
- GitHub Pages publishes the statically exported Next.js application.

## Local development

Requires Node.js 24 and pnpm 9.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm build && pnpm start`. The product site is available at `http://localhost:3000`; the documentation is under `http://localhost:3000/docs`.

## Verify

```bash
pnpm verify
```

This runs TypeScript, ESLint, and a production Next.js build.

## Deploy

Pushes to `main` are built and deployed with `.github/workflows/pages.yml`. GitHub Pages is configured with `stackiln.com` as its custom domain. The domain's apex DNS records must point to GitHub Pages before HTTPS can be enforced.

## Editing documentation

Documentation content is defined in `lib/docs.ts`. Add a page to the `docs` array and the route, navigation, and sitemap are generated automatically.

## License

[MIT](LICENSE)
