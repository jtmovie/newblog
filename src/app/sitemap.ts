import type { MetadataRoute } from 'next'

// 静态导出配置
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
  {
    "url": "https://wechatessence.com/",
    lastModified: new Date("2025-04-05T13:14:53.941Z"),
    "changeFrequency": "daily",
    "priority": 1
  },
  {
    "url": "https://wechatessence.com/blog",
    lastModified: new Date("2025-04-05T13:14:53.942Z"),
    "changeFrequency": "daily",
    "priority": 0.9
  },
  {
    "url": "https://wechatessence.com/jtmovie",
    lastModified: new Date("2025-09-21T08:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.9
  },
  {
    "url": "https://wechatessence.com/blog/hello-world",
    lastModified: new Date("2025-04-05T12:10:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "https://wechatessence.com/blog/intro",
    lastModified: new Date("2025-04-05T12:10:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "https://wechatessence.com/jtmovie/inception",
    lastModified: new Date("2025-09-21T08:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "https://wechatessence.com/jtmovie/parasite",
    lastModified: new Date("2025-09-21T08:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  }
]
}
