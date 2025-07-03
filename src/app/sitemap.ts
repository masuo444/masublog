import { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 動的ベースURL決定（本番/開発環境対応）
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://blog.fomus.jp'
    : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  console.log(`🗺️ Generating sitemap for: ${baseUrl}`)
  
  let posts = []
  let categories = []
  let tags = []

  try {
    [posts, categories, tags] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
      getAllTags()
    ])
  } catch {
    console.log('Sanity not configured yet, using dummy data')
    
    // ダミーデータ
    posts = [
      { slug: { current: 'startup-lessons' }, publishedAt: '2024-07-01' },
      { slug: { current: 'creative-tools' }, publishedAt: '2024-06-28' },
      { slug: { current: 'ai-future-work' }, publishedAt: '2024-06-25' }
    ]
    
    categories = [
      { slug: { current: 'business' } },
      { slug: { current: 'technology' } },
      { slug: { current: 'creativity' } },
      { slug: { current: 'lifestyle' } }
    ]
    
    tags = [
      { slug: { current: 'startup' } },
      { slug: { current: 'ai' } },
      { slug: { current: 'design' } }
    ]
  }

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  const postPages = posts.map((post: { slug: { current: string }, publishedAt: string }) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const categoryPages = categories.map((category: { slug: { current: string } }) => ({
    url: `${baseUrl}/blog/category/${category.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const tagPages = tags.map((tag: { slug: { current: string } }) => ({
    url: `${baseUrl}/blog/tag/${tag.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  console.log(`📝 Sitemap generated: ${staticPages.length} static + ${postPages.length} posts + ${categoryPages.length} categories + ${tagPages.length} tags`)

  return [...staticPages, ...postPages, ...categoryPages, ...tagPages]
}

// ISR設定: サイトマップを1時間ごとに更新
export const revalidate = 3600