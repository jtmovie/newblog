import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Cloudflare Pages 静态导出配置
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // 图片优化配置 - 静态导出需要禁用
  images: {
    unoptimized: true, // 静态导出必须禁用图片优化
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
  // 构建优化
  distDir: '.next',
};

const withMDX = createMDX({
})

export default withContentCollections(withMDX(nextConfig));
