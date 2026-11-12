import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

function getSiteUrl(): URL {
  const siteUrl = process.env.SITE_URL;

  if (!siteUrl) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[metadata] SITE_URL is not set; og:image URLs will point to http://localhost:3000. Set SITE_URL to the production origin (e.g. https://docs.example.org).',
      );
    }
    return new URL('http://localhost:3000');
  }

  try {
    return new URL(siteUrl);
  } catch {
    throw new Error(
      `SITE_URL must be an absolute URL such as https://docs.example.org (got "${siteUrl}")`,
    );
  }
}

export const metadata: Metadata = {
  // Makes OG image URLs absolute. Set SITE_URL in the production build
  // environment; see README "Deployment".
  metadataBase: getSiteUrl(),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
