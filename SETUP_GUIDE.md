# Next.js 博客模板搭建指南

本指南将帮助你基于这个开源模板快速搭建自己的个人博客。

## 📋 准备工作

### 系统要求
- Node.js 18+ 
- npm 或 yarn
- Git
- GitHub 账号（用于部署和评论系统）

### 可选服务
- Cloudflare 账号（用于部署）
- 自定义域名（可选）

## 🚀 快速开始

### 1. 获取代码

**方法一：Fork 仓库（推荐）**
1. 访问 [原始仓库](https://github.com/guangzhengli/nextjs-blog-template)
2. 点击右上角 "Fork" 按钮
3. 克隆你的 Fork 版本：
```bash
git clone https://github.com/YOUR_USERNAME/nextjs-blog-template.git my-blog
cd my-blog
```

**方法二：直接下载**
```bash
git clone https://github.com/guangzhengli/nextjs-blog-template.git my-blog
cd my-blog
rm -rf .git  # 移除原有 git 历史
git init     # 重新初始化 git
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

## ⚙️ 基本配置

### 修改站点信息

编辑 `src/lib/config.ts` 文件：

```typescript
export const config = {
  site: {
    title: "你的博客标题",           // 网站标题
    name: "你的博客名称",            // 网站名称
    description: "你的博客描述",      // 网站描述
    keywords: ["技术", "博客", "编程"], // SEO 关键词
    url: "https://yourdomain.com",   // 你的域名
    baseUrl: "https://yourdomain.com",
    image: "https://yourdomain.com/og-image.png", // 分享预览图
    favicon: {
      ico: "/favicon.ico",
      png: "/favicon.png",
      svg: "/favicon.svg",
      appleTouchIcon: "/favicon.png",
    },
  },
  
  author: {
    name: "你的名字",
    email: "your.email@example.com",
    bio: "你的个人简介",
  },
  
  social: {
    github: "https://github.com/yourusername",
    x: "https://x.com/yourusername",
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/yourID",
    wechat: "你的微信二维码图片链接",
    buyMeACoffee: "https://www.buymeacoffee.com/yourusername",
  },
  
  navigation: {
    main: [
      { title: "文章", href: "/blog" },
      // 可以添加更多导航项
      // { title: "关于", href: "/about" },
    ],
  },
  
  seo: {
    metadataBase: new URL("https://yourdomain.com"),
    alternates: {
      canonical: './',
    },
    openGraph: {
      type: "website" as const,
      locale: "zh_CN", // 或 "en_US"
    },
    twitter: {
      card: "summary_large_image" as const,
      creator: "@yourtwitterusername",
    },
  },
};
```

### 更换网站图标

替换 `public/` 目录下的图标文件：
- `favicon.ico` - 浏览器标签页图标
- `favicon.png` - PNG 格式图标
- `favicon.svg` - SVG 格式图标
- `og-image.png` - 社交媒体分享预览图

## 📝 创建博客内容

### 删除示例文章
```bash
rm src/content/blog/hello-world.md
rm src/content/blog/intro.md
```

### 创建你的第一篇文章

在 `src/content/blog/` 目录下创建 `my-first-post.md`：

```markdown
---
title: "我的第一篇博客"
date: "2024-01-15"
updated: "2024-01-15"
summary: "这是我使用 Next.js 博客模板创建的第一篇文章"
keywords: ["博客", "Next.js", "开始"]
featured: true
---

# 欢迎来到我的博客

这是我的第一篇博客文章！

## 关于这个博客

我使用 Next.js 博客模板搭建了这个博客，主要用来分享：

- 技术学习心得
- 项目开发经验  
- 生活感悟

## 技术栈

这个博客使用了以下技术：

- **框架**: Next.js 15
- **样式**: Tailwind CSS
- **内容管理**: Content Collections
- **评论系统**: Giscus
- **部署**: Cloudflare Pages

希望你喜欢我的博客！
```

### 文章元数据说明

每篇文章开头的元数据（Front Matter）字段：

- `title`: 文章标题（必需）
- `date`: 发布日期（必需）
- `updated`: 更新日期（可选）
- `summary`: 文章摘要（可选，用于首页显示）
- `keywords`: 关键词数组（可选，用于 SEO）
- `featured`: 是否在首页突出显示（可选，默认 false）

## 💬 配置评论系统

博客使用 Giscus 作为评论系统，基于 GitHub Discussions。

### 1. 启用 GitHub Discussions
1. 进入你的博客仓库
2. 点击 Settings 标签
3. 滚动到 Features 部分
4. 勾选 "Discussions"

### 2. 安装 Giscus App
1. 访问 [Giscus App](https://github.com/apps/giscus)
2. 点击 "Install" 
3. 选择你的博客仓库

### 3. 生成配置
1. 访问 [giscus.app](https://giscus.app/zh-CN)
2. 填写你的仓库信息
3. 复制生成的配置信息
4. 更新 `src/lib/config.ts` 中的 giscus 配置：

```typescript
giscus: {
  repo: "yourusername/your-blog-repo",
  repoId: "R_kgDOxxxxxxx",        // 从 giscus.app 获取
  categoryId: "DIC_kwDOxxxxxxx",  // 从 giscus.app 获取
},
```

## 🌐 部署到 Cloudflare Pages

### 1. 修改配置以支持静态导出

编辑 `next.config.ts`：

```typescript
import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',        // 添加这行
  trailingSlash: true,     // 添加这行
  images: {
    unoptimized: true,     // 添加这行
  },
};

const withMDX = createMDX({})

export default withContentCollections(withMDX(nextConfig));
```

### 2. 测试构建
```bash
npm run build
```

确保构建成功并在 `out/` 目录生成文件。

### 3. 部署到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 "Pages" 部分
3. 点击 "Create a project"
4. 选择 "Connect to Git"
5. 连接你的 GitHub 账号并选择博客仓库
6. 配置构建设置：
   - **构建命令**: `npm run build`
   - **输出目录**: `out`
   - **Node.js 版本**: 18 或更高
7. 点击 "Save and Deploy"

### 4. 添加自定义域名（可选）

1. 在 Cloudflare Pages 项目页面点击 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入你的域名
4. 按提示配置 DNS 记录
5. 等待 SSL 证书生成

## 🔧 高级配置

### 生成 RSS 订阅

```bash
npm run generate-rss
```

这会在 `public/` 目录生成：
- `rss.xml` - RSS 2.0 格式
- `feed.json` - JSON Feed 格式  
- `atom.xml` - Atom 格式

### 生成网站地图

```bash
npm run generate-sitemap
```

在 `public/` 目录生成 `sitemap.xml`。

### 自定义样式

博客使用 Tailwind CSS，你可以：

1. 修改 `src/app/globals.css` 添加全局样式
2. 在 `tailwind.config.js` 中自定义主题
3. 修改组件样式文件

### 添加新页面

在 `src/app/` 目录下创建新的路由：

```bash
# 创建关于页面
mkdir src/app/about
echo "export default function About() { return <div>关于我</div> }" > src/app/about/page.tsx
```

然后在导航配置中添加链接。

## 📊 SEO 优化

### 1. 更新元数据
- 确保每篇文章都有合适的 `title` 和 `summary`
- 添加相关的 `keywords`
- 设置合适的 `featured` 文章

### 2. 生成结构化数据
博客自动生成 JSON-LD 结构化数据，有助于搜索引擎理解内容。

### 3. 提交搜索引擎
- Google Search Console
- Bing Webmaster Tools
- 百度站长平台

## 🎨 个性化定制

### 更换字体
当前使用 "LXGW WenKai Lite" 字体，可在 `src/app/layout.tsx` 中修改。

### 修改主题色彩
在 `tailwind.config.js` 中自定义颜色方案。

### 添加新组件
在 `src/components/` 目录下创建新组件。

## 📱 本地开发

### 常用命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
```

### 目录结构
```
src/
├── app/                 # Next.js App Router 页面
├── components/          # React 组件
│   ├── ui/             # Shadcn UI 组件
│   └── icons/          # 图标组件
├── content/blog/        # 博客文章 (Markdown)
├── lib/                # 工具函数和配置
└── hooks/              # 自定义 React Hooks
```

## ❓ 常见问题

### Q: 如何添加新的社交媒体链接？
A: 在 `src/lib/config.ts` 的 `social` 部分添加，然后在 `src/components/header/` 中添加对应图标。

### Q: 如何修改首页布局？
A: 编辑 `src/app/page.tsx` 文件。

### Q: 如何添加代码高亮主题？
A: 博客使用 highlight.js，可以在 `src/app/globals.css` 中引入不同主题的 CSS。

### Q: 部署后图片不显示？
A: 确保 `next.config.ts` 中设置了 `images: { unoptimized: true }`。

### Q: 如何备份博客内容？
A: 所有内容都在 `src/content/blog/` 目录下，定期备份 Git 仓库即可。

## 🆘 获取帮助

- 查看 [原项目 README](README.md)
- 提交 [GitHub Issues](https://github.com/guangzhengli/nextjs-blog-template/issues)
- 参考 [Next.js 官方文档](https://nextjs.org/docs)

## 📄 许可证

本项目基于原项目许可证使用。

---

🎉 恭喜！你已经成功搭建了自己的博客。开始写作吧！