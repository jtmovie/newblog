# Cloudflare Pages 部署教程

本教程将指导你如何将 Next.js 博客部署到 Cloudflare Pages。

## 方法一：GitHub 自动部署（推荐）

### 步骤 1：准备 Git 仓库

1. **初始化 Git 仓库**（如果还没有）：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到 GitHub**：
   - 在 GitHub 创建新仓库
   - 添加远程仓库并推送：
   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```

### 步骤 2：配置 Cloudflare Pages

1. **登录 Cloudflare Dashboard**：
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 选择左侧菜单中的 "Pages"

2. **创建新项目**：
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **连接 GitHub**：
   - 授权 Cloudflare 访问你的 GitHub 账户
   - 选择你的博客仓库

4. **配置构建设置**：
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: (留空)
   Environment variables: (暂时留空)
   ```

5. **点击 "Save and Deploy"**

### 步骤 3：配置环境变量（如果需要）

如果你的项目需要环境变量，在 Cloudflare Pages 项目设置中添加：

```
NODE_VERSION=18
NEXT_TELEMETRY_DISABLED=1
```

### 步骤 4：自定义域名（可选）

1. 在 Cloudflare Pages 项目中点击 "Custom domains"
2. 添加你的域名
3. 按照提示更新 DNS 记录

---

## 方法二：直接上传部署

### 步骤 1：构建项目

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 导出静态文件（需要配置）
npm run export  # 如果有这个命令
```

### 步骤 2：配置 Next.js 静态导出

在项目根目录创建或修改 `next.config.js`：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 步骤 3：重新构建

```bash
npm run build
```

### 步骤 4：上传到 Cloudflare Pages

1. 在 Cloudflare Dashboard 中选择 Pages
2. 点击 "Create a project"
3. 选择 "Upload assets"
4. 上传 `out` 目录（或 `.next` 目录）

---

## 推荐配置

### package.json 脚本优化

在 `package.json` 中添加部署相关脚本：

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export",
    "deploy": "npm run build && npx wrangler pages publish .next",
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "generate-rss": "node scripts/generate-rss.js"
  }
}
```

### 自动部署配置

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build project
      run: npm run build

    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: your-project-name
        directory: .next
        gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

---

## 常见问题解决

### 1. 构建失败

**问题**：Node.js 版本不兼容
**解决**：在 Cloudflare Pages 环境变量中设置：
```
NODE_VERSION=18
```

### 2. 静态资源 404

**问题**：图片或其他静态资源无法加载
**解决**：确保在 `next.config.js` 中配置：
```javascript
const nextConfig = {
  images: {
    unoptimized: true
  }
}
```

### 3. 路由问题

**问题**：动态路由 404
**解决**：在 `public` 目录下创建 `_redirects` 文件：
```
/*    /index.html   200
```

### 4. 环境变量问题

**问题**：某些功能在生产环境不工作
**解决**：检查并在 Cloudflare Pages 中设置所需的环境变量

---

## 性能优化建议

### 1. 启用 Cloudflare 优化

在 Cloudflare Dashboard 中启用：
- Auto Minify（CSS, JS, HTML）
- Brotli 压缩
- 缓存设置

### 2. 图片优化

使用 Cloudflare Images 或在 `next.config.js` 中配置：

```javascript
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  }
}
```

### 3. 缓存策略

在项目中添加 `public/_headers` 文件：

```
/
  Cache-Control: public, max-age=0, must-revalidate

/static/*
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## 监控和维护

### 1. 分析工具

在 Cloudflare Dashboard 中查看：
- Web Analytics
- Performance insights
- Security events

### 2. 自动更新

设置 GitHub Actions 实现：
- 自动构建和部署
- 依赖更新检查
- 安全扫描

### 3. 备份策略

定期备份：
- 源代码（GitHub）
- 内容文件
- 配置文件

---

## 快速部署检查清单

- [ ] 代码推送到 GitHub
- [ ] Cloudflare Pages 项目创建
- [ ] 构建设置正确配置
- [ ] 环境变量设置（如需要）
- [ ] 域名配置（如需要）
- [ ] SSL 证书自动配置
- [ ] 测试所有页面功能
- [ ] 检查移动端兼容性
- [ ] 验证 SEO 设置

---

## 总结

1. **推荐使用 GitHub 自动部署**：更稳定，支持持续集成
2. **注意 Next.js 配置**：确保兼容 Cloudflare Pages
3. **测试充分**：部署后全面测试功能
4. **监控性能**：使用 Cloudflare 的分析工具

按照以上步骤，你的博客就可以成功部署到 Cloudflare Pages，享受全球 CDN 加速和免费的 HTTPS！