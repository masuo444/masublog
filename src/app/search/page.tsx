import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { searchPosts } from '@/lib/queries'
import { NotionPost } from '@/lib/notion'

export const metadata: Metadata = {
  title: '検索結果 | FOMUS まっすー',
  description: 'ブログ記事の検索結果ページです。',
}

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

async function SearchResults({ query }: { query: string }) {
  let posts: NotionPost[] = []

  try {
    posts = await searchPosts(query)
  } catch {
    console.log('Sanity not configured yet, using dummy data')
  }

  // ダミーデータ
  const dummyPosts: NotionPost[] = [
    {
      id: '1',
      title: 'スタートアップで学んだ失敗からの教訓',
      slug: 'startup-lessons',
      content: '',
      excerpt: '起業の過程で経験した失敗と、そこから得た貴重な学びについて詳しく解説します。',
      featuredImage: {
        asset: { url: '/blog-1.jpg' },
        alt: 'スタートアップのイメージ'
      },
      categories: [{ title: 'ビジネス', slug: { current: 'business' } }],
      tags: [
        { title: 'スタートアップ', slug: { current: 'startup' } },
        { title: '起業', slug: { current: 'entrepreneurship' } }
      ],
      publishedAt: '2024-07-01',
      author: { name: 'FOMUS まっすー' }
    },
    {
      id: '2',
      title: 'クリエイティブワークを効率化するツール10選',
      slug: 'creative-tools',
      content: '',
      excerpt: 'デザインや動画制作の生産性を向上させる、おすすめツールを厳選してご紹介。',
      featuredImage: {
        asset: { url: '/blog-2.jpg' },
        alt: 'クリエイティブツール'
      },
      categories: [{ title: 'クリエイティブ', slug: { current: 'creativity' } }],
      tags: [
        { title: 'デザイン', slug: { current: 'design' } },
        { title: 'ツール', slug: { current: 'tools' } }
      ],
      publishedAt: '2024-06-28',
      author: { name: 'FOMUS まっすー' }
    },
    {
      id: '3',
      title: 'AIと共存する未来のワークスタイル',
      slug: 'ai-future-work',
      content: '',
      excerpt: 'AIの発展により変化する働き方と、私たちが準備すべきスキルについて考察します。',
      featuredImage: {
        asset: { url: '/blog-3.jpg' },
        alt: 'AI技術'
      },
      categories: [{ title: 'テクノロジー', slug: { current: 'technology' } }],
      tags: [
        { title: 'AI', slug: { current: 'ai' } },
        { title: '働き方', slug: { current: 'workstyle' } }
      ],
      publishedAt: '2024-06-25',
      author: { name: 'FOMUS まっすー' }
    }
  ]

  if (!posts.length) {
    // ダミーデータから検索
    posts = dummyPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          検索結果: 「{query}」
        </h2>
        <p className="text-gray-600">
          {posts.length}件の記事が見つかりました
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="mx-auto mb-4 text-gray-300" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            検索結果が見つかりませんでした
          </h3>
          <p className="text-gray-600 mb-6">
            別のキーワードで検索してみてください
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            すべての記事を見る
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post: NotionPost) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 md:h-full bg-gray-200">
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
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-1" />
                    <time dateTime={post.publishedAt}>
                      {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
                    </time>
                    <User size={16} className="ml-4 mr-1" />
                    <span>{post.author.name}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category: { title: string, slug: { current: string } }) => (
                      <Link
                        key={category.slug.current}
                        href={`/blog/category/${category.slug.current}`}
                        className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full hover:bg-orange-200 transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    続きを読む
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              検索
            </h1>
            <p className="text-xl text-gray-600">
              ブログ記事を検索できます
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {query ? (
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">検索中...</p>
            </div>
          }>
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <Search className="mx-auto mb-6 text-gray-300" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              記事を検索
            </h2>
            <p className="text-gray-600 mb-8">
              キーワードを入力してブログ記事を検索してみてください
            </p>
            <form action="/search" method="GET" className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  placeholder="記事を検索..."
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Search size={24} />
                </button>
              </div>
            </form>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              すべての記事を見る
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}