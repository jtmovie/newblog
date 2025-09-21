import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 优化构建配置
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // 图片优化配置
  images: {
    unoptimized: false, // Cloudflare Pages 支持图片优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wechatessence.com',
      },
    ],
  },
  // 生产环境优化
  compress: true,
  poweredByHeader: false,
};

const withMDX = createMDX({
})

export default withContentCollections(withMDX(nextConfig));
