// Constants shared by layouts, routes, and src/proxy.ts.
// Do not import '@/lib/source' here: proxy.ts imports this file, and it must
// not pull the whole content source into the proxy bundle.
import { createGetUrl } from 'fumadocs-core/source';

export const docsRoute = '/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'chrescobar',
  repo: 'fumadocs-dxkb',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

/** URL of a page's raw Markdown, served by app/llms.mdx/docs/[[...slug]]. */
export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}
