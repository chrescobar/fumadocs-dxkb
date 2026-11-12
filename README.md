# fumadocs-dxkb

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Requires Node.js 24 or newer (`.nvmrc` pins 26; run `nvm use`).

Run development server:

```bash
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

## Deployment

Set these environment variables at build time:

| Variable   | Example                    | Purpose                                                    |
| ---------- | -------------------------- | ---------------------------------------------------------- |
| `SITE_URL` | `https://docs.example.org` | Base URL for absolute Open Graph image links (`metadataBase`). |

The "Last updated" date on each page comes from git history, so the build
environment needs the `git` executable and the repository's `.git` directory
with full history:

- Without `git` installed, `pnpm build` fails (`spawn git ENOENT`).
- Without `.git` (e.g. excluded by `.dockerignore`), pages show no date.
- In a shallow clone, every page shows the latest commit's date.

In CI, use `fetch-depth: 0` (GitHub Actions) or run
`git fetch --unshallow || true` before `pnpm build`.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |
| `app/llms.txt`            | Index of all pages for LLMs (`/llms.txt`).             |
| `app/llms-full.txt`       | Every page as Markdown in one file (`/llms-full.txt`). |
| `app/llms.mdx/docs`       | One page as Markdown; also served at `/docs/<page>.md` via `src/proxy.ts`. |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
