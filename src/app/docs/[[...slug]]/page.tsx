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
import {
  findPath,
  getPageTreePeers,
  type Folder,
  type Item,
  type Node,
  type Root,
} from 'fumadocs-core/page-tree';

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

function DocsCategory({ url }: { url: string }) {
  // Find the path to the current page
  const path = findPath(source.pageTree.children, (node) => {
    if (node.type === 'page') return node.url === url;
    if (node.type === 'folder' && node.index) return node.index.url === url;
    return false;
  });

  // Get the folder that contains the current page (or the folder itself if it's an index page)
  let folder: Folder | Root | undefined;
  if (path) {
    // Check if last node in path is a folder (meaning current page is the index)
    const lastNode = path[path.length - 1];
    if (lastNode?.type === 'folder') {
      folder = lastNode;
    } else {
      // Find the parent folder
      folder = path.find((node): node is Folder => node.type === 'folder');
    }
  }

  // Fall back to root if no folder found
  const children = folder?.children ?? source.pageTree.children;

  // Filter to only include pages and folders (not separators) at the current level
  const items = children.filter(
    (node): node is Item | Folder => node.type === 'page' || node.type === 'folder'
  );

  return (
    <Cards>
      {items.map((item) => {
        const itemUrl = item.type === 'folder' ? item.index?.url : item.url;
        const name = item.name;
        const description = item.description;
        const icon = item.icon;

        if (!itemUrl) return null;

        return (
          <Card key={itemUrl} title={name} href={itemUrl} icon={icon}>
            {description}
          </Card>
        );
      })}
    </Cards>
  );
}