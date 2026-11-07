import type { NextConfig } from 'next';

// Static export: `npm run build` writes a self-contained site to /out that can be
// hosted anywhere (GitHub Pages, Netlify, school server). Set NEXT_PUBLIC_BASE_PATH
// (e.g. "/history") if the site is served from a sub-folder.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default config;
