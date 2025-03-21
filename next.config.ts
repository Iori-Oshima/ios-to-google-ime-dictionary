import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'ios-to-google-ime-dictionary';
const basePath = isProduction ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
};

export default nextConfig;
