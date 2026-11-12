import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { findSiblings, type Folder, type Item } from 'fumadocs-core/page-tree';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            DocsCategory: ({ url }) => {
              return <DocsCategory url={url ?? page.url} />;
            },
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}

/**
 * Cards for the pages and folders that share a parent with `url`.
 * On a folder's index page, that is the folder's own children.
 */
function DocsCategory({ url }: { url: string }) {
  const items = findSiblings(source.pageTree, url).filter(
    (node): node is Item | Folder =>
      node.type === 'page' || node.type === 'folder',
  );

  return (
    <Cards>
      {items.map((item) => {
        const href = item.type === 'folder' ? item.index?.url : item.url;
        if (!href) return null;

        return (
          <Card key={href} title={item.name} href={href} icon={item.icon}>
            {item.description}
          </Card>
        );
      })}
    </Cards>
  );
}
