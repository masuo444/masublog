import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { getAllPosts, getAllCategories } from '@/lib/queries'
import { Post, Category } from '@/types/blog'

export const metadata: Metadata = {
  title: 'ブログ | FOMUS まっすー',
  description: 'ビジネス、テクノロジー、ライフスタイルについて発信するブログです。',
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://blog.fomus.jp' : 'http://localhost:3000'),
}

// ISR設定: 60秒間キャッシュし、バックグラウンドで更新
export const revalidate = 60

export default async function BlogPage() {
  let posts = []
  let categories = []

  try {
    [posts, categories] = await Promise.all([
      getAllPosts(),
      getAllCategories()
    ])
  } catch {
    console.log('Sanity not configured yet, using dummy data')
  }

  // ダミーデータ
  const dummyPosts = [
    {
      _id: '1',
      title: 'スタートアップで学んだ失敗からの教訓',
      slug: { current: 'startup-lessons' },
      excerpt: '起業の過程で経験した失敗と、そこから得た貴重な学びについて詳しく解説します。失敗は成功の母という言葉がありますが、実際に起業してみると本当にその通りだと実感します。',
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
      _id: '2',
      title: 'クリエイティブワークを効率化するツール10選',
      slug: { current: 'creative-tools' },
      excerpt: 'デザインや動画制作の生産性を向上させる、おすすめツールを厳選してご紹介。実際に業務で使っているツールばかりなので、すぐに導入して効果を実感できるはずです。',
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
      _id: '3',
      title: 'AIと共存する未来のワークスタイル',
      slug: { current: 'ai-future-work' },
      excerpt: 'AIの発展により変化する働き方と、私たちが準備すべきスキルについて考察します。AIに仕事を奪われるのではなく、AIと協力して新しい価値を創造する方法を探ります。',
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
    },
    {
      _id: '4',
      title: '持続可能なビジネスモデルの構築法',
      slug: { current: 'sustainable-business' },
      excerpt: '短期的な利益だけでなく、長期的に成長し続けるビジネスモデルの作り方について解説します。社会的価値と経済的価値の両立を目指すアプローチをご紹介。',
      featuredImage: {
        asset: { url: '/blog-4.jpg' },
        alt: '持続可能なビジネス'
      },
      categories: [{ title: 'ビジネス', slug: { current: 'business' } }],
      tags: [
        { title: 'サステナビリティ', slug: { current: 'sustainability' } },
        { title: 'ビジネスモデル', slug: { current: 'business-model' } }
      ],
      publishedAt: '2024-06-20',
      author: { name: 'FOMUS まっすー' }
    },
    {
      _id: '5',
      title: 'リモートワーク時代のコミュニケーション術',
      slug: { current: 'remote-communication' },
      excerpt: 'リモートワークが当たり前になった今、効果的なコミュニケーションの取り方が重要です。オンラインでもチームの結束を深める方法をお伝えします。',
      featuredImage: {
        asset: { url: '/blog-5.jpg' },
        alt: 'リモートワーク'
      },
      categories: [{ title: 'ライフスタイル', slug: { current: 'lifestyle' } }],
      tags: [
        { title: 'リモートワーク', slug: { current: 'remote-work' } },
        { title: 'コミュニケーション', slug: { current: 'communication' } }
      ],
      publishedAt: '2024-06-15',
      author: { name: 'FOMUS まっすー' }
    },
    {
      _id: '6',
      title: 'ユーザー体験を向上させるデザイン思考',
      slug: { current: 'ux-design-thinking' },
      excerpt: 'ユーザー中心のデザイン思考を活用して、より良いプロダクトを作る方法について解説します。実際のプロジェクト事例も交えながらお話しします。',
      featuredImage: {
        asset: { url: '/blog-6.jpg' },
        alt: 'UXデザイン'
      },
      categories: [{ title: 'クリエイティブ', slug: { current: 'creativity' } }],
      tags: [
        { title: 'UX', slug: { current: 'ux' } },
        { title: 'デザイン思考', slug: { current: 'design-thinking' } }
      ],
      publishedAt: '2024-06-10',
      author: { name: 'FOMUS まっすー' }
    }
  ]

  const dummyCategories = [
    { title: 'すべて', slug: { current: 'all' } },
    { title: 'ビジネス', slug: { current: 'business' } },
    { title: 'テクノロジー', slug: { current: 'technology' } },
    { title: 'クリエイティブ', slug: { current: 'creativity' } },
    { title: 'ライフスタイル', slug: { current: 'lifestyle' } }
  ]

  const displayPosts = posts.length > 0 ? posts : dummyPosts
  const displayCategories = categories.length > 0 ? categories : dummyCategories

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ブログ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ビジネス、テクノロジー、クリエイティブ、ライフスタイルについて
              日々の学びや気付きを発信しています
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                カテゴリー
              </h2>
              <nav className="space-y-2">
                {displayCategories.map((category: Category) => (
                  <Link
                    key={category.slug.current}
                    href={category.slug.current === 'all' ? '/blog' : `/blog/category/${category.slug.current}`}
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayPosts.map((post: Post) => (
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
                      {post.categories.map((category: { title: string, slug: { current: string } }) => (
                        <Link
                          key={category.slug.current}
                          href={`/blog/category/${category.slug.current}`}
                          className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      続きを読む
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-500 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  前へ
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-md">
                  1
                </button>
                <button className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 text-blue-600 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  次へ
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}