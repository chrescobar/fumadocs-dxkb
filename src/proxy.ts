import { NextRequest, NextResponse } from 'next/server';
import { rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

// /docs/foo.md -> /llms.mdx/docs/foo/content.md
// Serving Markdown at /docs/foo itself based on the Accept header is
// deliberately not supported: Next drops Vary on prerendered HTML, so shared
// caches could mix up the HTML and Markdown representations.
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Only `.md` docs URLs are rewritten; skip assets, API, OG and llms routes.
  matcher: ['/docs.md', '/docs/:path*'],
};
