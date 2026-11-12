// Constants shared by layouts, routes, and src/proxy.ts.
// Do not import '@/lib/source' here: proxy.ts imports this file, and it must
// not pull the whole content source into the proxy bundle.

export const gitConfig = {
  user: 'chrescobar',
  repo: 'fumadocs-dxkb',
  branch: 'main',
};
