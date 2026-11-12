import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkStructureOptions: {
      // fumadocs-mdx 15.6+ keeps every JSX element as a raw tag in search
      // records (e.g. `<Card title=… />`). Returning false replaces each
      // element with its children, so Callout text stays searchable.
      filterElement: () => false,
    },
  },
});
