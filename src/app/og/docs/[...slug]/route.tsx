import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { generateOGImage } from 'fumadocs-ui/og';

export const revalidate = false;
// Only the prerendered `<page>/image.png` URLs exist; anything else is 404.
export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[...slug]'>,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: 'DXKB Documentation :)',
    // --color-fd-primary (oklch 71.57% 0.182 37.18) in sRGB
    primaryColor: 'rgba(255, 114, 72, 0.3)',
    primaryTextColor: '#ff7248',
    width: 1200,
    height: 630,
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
