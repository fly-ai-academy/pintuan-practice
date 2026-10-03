import { resolve } from 'node:path';
import type { NextConfig } from 'next';

const repositoryRoot = resolve(import.meta.dirname, '../..');

const nextConfig: NextConfig = {
  turbopack: { root: repositoryRoot },
  outputFileTracingRoot: repositoryRoot,
};

export default nextConfig;
