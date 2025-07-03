import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft, BookOpen, Globe } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { getAmericaSpainActivityPosts } from '@/lib/notion'

// ISR設定: カテゴリーページは60秒間キャッシュ
export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  if (slug === 'america-spain-activity') {
    return {
      title: 'アメリカ・スペイン活動記 | FOMUS まっすー',
      description: 'アメリカとスペインでの活動を記録したシリーズ記事です。各話ごとに体験談や学びを詳しく紹介しています。',
      openGraph: {
        title: 'アメリカ・スペイン活動記',
        description: 'アメリカとスペインでの活動記録シリーズ',
        type: 'website',
      },
    }
  }

  return {
    title: `カテゴリー: ${slug} | FOMUS まっすー`,
    description: `${slug}に関する記事一覧`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  if (slug !== 'america-spain-activity') {
    notFound()
  }

  // アメリカ・スペイン活動記の記事を取得
  let posts = []
  try {
    posts = await getAmericaSpainActivityPosts()
  } catch (error) {
    console.error('記事取得エラー:', error)
  }

  const categoryInfo = {
    title: 'アメリカ・スペイン活動記🇺🇸🇪🇸',
    description: 'アメリカとスペインでの活動を記録したシリーズです。現地での体験、文化の違い、学んだことなどを話数ごとに詳しく紹介しています。',
    icon: '🌍',
    gradient: 'from-blue-500 via-purple-500 to-orange-500'
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー部分 */}
      <div className={`relative bg-gradient-to-r ${categoryInfo.gradient} py-20`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              ブログ一覧に戻る
            </Link>
          </div>

          <div className="text-center text-white">
            <div className="text-6xl mb-6">{categoryInfo.icon}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {categoryInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {categoryInfo.description}
            </p>
            <div className="mt-8 flex justify-center items-center gap-6 text-white/80">
              <div className="flex items-center">
                <BookOpen size={20} className="mr-2" />
                <span>{posts.length}話公開中</span>
              </div>
              <div className="flex items-center">
                <Globe size={20} className="mr-2" />
                <span>アメリカ 🇺🇸 × スペイン 🇪🇸</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length > 0 ? (
          <>
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                エピソード一覧
              </h2>
              <p className="text-gray-600">
                各話をクリックして、詳しい内容をお読みください。
              </p>
            </div>

            <div className="grid gap-8 md:gap-12">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="md:flex">
                    {/* 画像部分 */}
                    <div className="md:w-1/3">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-64 md:h-full bg-gradient-to-br from-blue-100 to-orange-100">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage.asset.url}
                              alt={post.featuredImage.alt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100">
                              <div className="text-center">
                                <div className="text-6xl mb-3">
                                  {index % 3 === 0 ? '🇺🇸' : index % 3 === 1 ? '🇪🇸' : '✈️'}
                                </div>
                                <span className="text-3xl font-bold text-gray-700">
                                  第{index + 1}話
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full">
                              第{index + 1}話
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* コンテンツ部分 */}
                    <div className="md:w-2/3 p-8">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <time dateTime={post.publishedAt}>
                            {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
                          </time>
                        </div>
                        <div className="flex items-center">
                          <User size={16} className="mr-1" />
                          <span>{post.author.name}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.slug.current}
                            className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            #{tag.title}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        この話を読む
                        <ArrowLeft size={18} className="ml-2 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              記事を準備中です
            </h2>
            <p className="text-gray-600 mb-8">
              アメリカ・スペイン活動記の記事を鋭意制作中です。もうしばらくお待ちください。
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              他の記事を見る
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}