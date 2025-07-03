import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  categories: Array<{
    title: string
    slug: {
      current: string
    }
  }>
  publishedAt: string
  author: {
    name: string
  }
}

interface RecentPostsProps {
  posts: Post[]
}

export default function RecentPosts({ posts = [] }: RecentPostsProps) {
  // デモ用のダミーデータ
  const dummyPosts = [
    {
      _id: '1',
      title: 'スタートアップで学んだ失敗からの教訓',
      slug: { current: 'startup-lessons' },
      excerpt: '起業の過程で経験した失敗と、そこから得た貴重な学びについて詳しく解説します。',
      featuredImage: {
        asset: { url: '/blog-1.jpg' },
        alt: 'スタートアップのイメージ'
      },
      categories: [{ title: 'ビジネス', slug: { current: 'business' } }],
      publishedAt: '2024-07-01',
      author: { name: 'FOMUS まっすー' }
    },
    {
      _id: '2',
      title: 'クリエイティブワークを効率化するツール10選',
      slug: { current: 'creative-tools' },
      excerpt: 'デザインや動画制作の生産性を向上させる、おすすめツールを厳選してご紹介。',
      featuredImage: {
        asset: { url: '/blog-2.jpg' },
        alt: 'クリエイティブツール'
      },
      categories: [{ title: 'クリエイティブ', slug: { current: 'creativity' } }],
      publishedAt: '2024-06-28',
      author: { name: 'FOMUS まっすー' }
    },
    {
      _id: '3',
      title: 'AIと共存する未来のワークスタイル',
      slug: { current: 'ai-future-work' },
      excerpt: 'AIの発展により変化する働き方と、私たちが準備すべきスキルについて考察します。',
      featuredImage: {
        asset: { url: '/blog-3.jpg' },
        alt: 'AI技術'
      },
      categories: [{ title: 'テクノロジー', slug: { current: 'technology' } }],
      publishedAt: '2024-06-25',
      author: { name: 'FOMUS まっすー' }
    }
  ]

  const displayPosts = posts.length > 0 ? posts : dummyPosts

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            最新記事
          </h2>
          <p className="text-xl text-gray-600">
            ビジネス、テクノロジー、ライフスタイルについての最新の記事をお届け
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.slice(0, 3).map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/blog/${post.slug.current}`}>
                <div className="relative h-48 bg-gray-200">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage.asset.url}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-400">画像なし</span>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-1" />
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
                  </time>
                  <User size={16} className="ml-4 mr-1" />
                  <span>{post.author.name}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category) => (
                    <Link
                      key={category.slug.current}
                      href={`/blog/category/${category.slug.current}`}
                      className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full hover:bg-orange-200 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
                >
                  続きを読む
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            すべての記事を見る
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}