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
  // Cloudflare Pages 优化 - 避免大文件
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 生产环境禁用某些缓存以减小文件大小
      config.cache = false;
    }
    return config;
  },
  // 构建优化 - swcMinify 在 Next.js 15 中默认启用，不需要显式设置
  distDir: '.next',
};

const withMDX = createMDX({
})

export default withContentCollections(withMDX(nextConfig));
