import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Share, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { getPostBySlug } from '@/lib/queries'
import { getSpecificNotionPost, getNotionPageById } from '@/lib/notion'
import { BlogPostJsonLd } from '@/components/JsonLd'

// ISR設定: 30秒間キャッシュし、バックグラウンドで更新
export const revalidate = 30

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  let post = null

  // Notion記事の取得を試行
  try {
    if (slug === 'america-spain-activity') {
      post = await getSpecificNotionPost()
    }
  } catch {
    console.log('Notion記事の取得に失敗しました')
  }

  // Sanity記事の取得を試行
  if (!post) {
    try {
      post = await getPostBySlug(slug)
    } catch {
      console.log('Sanity記事の取得に失敗しました')
    }
  }

  if (!post) {
    return {
      title: '記事が見つかりません | FOMUS まっすー'
    }
  }

  return {
    title: `${post.title} | FOMUS まっすー`,
    description: post.excerpt || post.content?.substring(0, 160) || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || '',
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post = null

  // Notion記事の取得を試行
  try {
    if (slug === 'america-spain-activity') {
      post = await getSpecificNotionPost()
      console.log('Notion記事を取得しました:', post?.title)
    }
  } catch (error) {
    console.log('Notion記事の取得に失敗しました:', error)
  }

  // Sanity記事の取得を試行
  if (!post) {
    try {
      post = await getPostBySlug(slug)
      console.log('Sanity記事を取得しました:', post?.title)
    } catch {
      console.log('Sanity記事の取得に失敗しました')
    }
  }

  if (!post) {
    notFound()
  }

  const readingTime = Math.ceil((post.excerpt || post.content || '').length / 200) // 簡易的な読了時間計算

  // Notionデータを統一フォーマットに変換
  const formattedPost = {
    ...post,
    featuredImage: post.coverImage ? {
      asset: { url: post.coverImage },
      alt: post.title
    } : post.featuredImage,
    categories: post.categories || [{ title: '活動記録', slug: { current: 'activity' } }],
    tags: post.tags || [
      { title: 'アメリカ', slug: { current: 'america' } },
      { title: 'スペイン', slug: { current: 'spain' } },
      { title: '活動記録', slug: { current: 'activity' } }
    ],
    author: post.author || {
      name: 'FOMUS まっすー',
      bio: 'クリエイター・起業家として活動中',
      image: { asset: { url: '/profile-image.jpg' } }
    },
    publishedAt: post.publishedAt || '2025-07-03',
    updatedAt: post.updatedAt || post.publishedAt || '2025-07-03'
  }

  return (
    <div className="bg-white min-h-screen">
      <BlogPostJsonLd post={formattedPost} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            ブログ一覧に戻る
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {formattedPost.categories.map((category: { title: string, slug: { current: string } }) => (
              <Link
                key={category.slug.current}
                href={`/blog/category/${category.slug.current}`}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {formattedPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <time dateTime={formattedPost.publishedAt}>
                {format(new Date(formattedPost.publishedAt), 'yyyy年M月d日', { locale: ja })}
              </time>
            </div>
            {formattedPost.updatedAt && formattedPost.updatedAt !== formattedPost.publishedAt && (
              <div className="flex items-center">
                <span className="mr-2">更新:</span>
                <time dateTime={formattedPost.updatedAt}>
                  {format(new Date(formattedPost.updatedAt), 'yyyy年M月d日', { locale: ja })}
                </time>
              </div>
            )}
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>約{readingTime}分で読めます</span>
            </div>
          </div>

          {formattedPost.featuredImage && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={formattedPost.featuredImage.asset.url}
                alt={formattedPost.featuredImage.alt || formattedPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                {formattedPost.author.image && (
                  <Image
                    src={formattedPost.author.image.asset.url}
                    alt={formattedPost.author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{formattedPost.author.name}</p>
                {formattedPost.author.bio && (
                  <p className="text-sm text-gray-600">{formattedPost.author.bio}</p>
                )}
              </div>
            </div>

            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Share size={18} className="mr-2" />
              シェア
            </button>
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-lg leading-relaxed text-gray-700">
            {post.content ? (
              <div 
                className="notion-content"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <p className="mb-6">
                コンテンツを読み込み中...
              </p>
            )}
          </div>
        </div>

        <footer className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="flex items-center text-gray-600 mr-4">
              <Tag size={18} className="mr-2" />
              タグ:
            </span>
            {formattedPost.tags.map((tag: { title: string, slug: { current: string } }) => (
              <Link
                key={tag.slug.current}
                href={`/blog/tag/${tag.slug.current}`}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag.title}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              他の記事も読む
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}