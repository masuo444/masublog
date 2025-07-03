import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Share, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { getPostBySlug } from '@/lib/queries'
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

  try {
    post = await getPostBySlug(slug)
  } catch {
    console.log('Sanity not configured yet')
  }

  // ダミーデータから検索
  const dummyPosts = [
    {
      title: 'スタートアップで学んだ失敗からの教訓',
      excerpt: '起業の過程で経験した失敗と、そこから得た貴重な学びについて詳しく解説します。',
      slug: { current: 'startup-lessons' }
    },
    {
      title: 'クリエイティブワークを効率化するツール10選',
      excerpt: 'デザインや動画制作の生産性を向上させる、おすすめツールを厳選してご紹介。',
      slug: { current: 'creative-tools' }
    },
    {
      title: 'AIと共存する未来のワークスタイル',
      excerpt: 'AIの発展により変化する働き方と、私たちが準備すべきスキルについて考察します。',
      slug: { current: 'ai-future-work' }
    }
  ]

  if (!post) {
    post = dummyPosts.find(p => p.slug.current === slug)
  }

  if (!post) {
    return {
      title: '記事が見つかりません | FOMUS まっすー'
    }
  }

  return {
    title: `${post.title} | FOMUS まっすー`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post = null

  try {
    post = await getPostBySlug(slug)
  } catch {
    console.log('Sanity not configured yet, using dummy data')
  }

  // ダミーデータ
  const dummyPost = {
    _id: '1',
    title: 'スタートアップで学んだ失敗からの教訓',
    slug: { current: 'startup-lessons' },
    excerpt: '起業の過程で経験した失敗と、そこから得た貴重な学びについて詳しく解説します。',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'スタートアップの世界は、成功と失敗が紙一重の厳しい世界です。私自身も複数の事業を立ち上げる中で、数多くの失敗を経験してきました。今回は、その中でも特に印象的だった失敗と、そこから学んだ教訓について共有したいと思います。'
          }
        ]
      }
    ],
    featuredImage: {
      asset: { url: '/blog-1.jpg' },
      alt: 'スタートアップのイメージ'
    },
    categories: [{ title: 'ビジネス', slug: { current: 'business' } }],
    tags: [
      { title: 'スタートアップ', slug: { current: 'startup' } },
      { title: '起業', slug: { current: 'entrepreneurship' } },
      { title: '失敗', slug: { current: 'failure' } }
    ],
    publishedAt: '2024-07-01',
    updatedAt: '2024-07-01',
    author: {
      name: 'FOMUS まっすー',
      bio: 'クリエイター・起業家として活動中',
      image: { asset: { url: '/profile-image.jpg' } }
    }
  }

  const dummyPosts = {
    'startup-lessons': { ...dummyPost },
    'creative-tools': {
      ...dummyPost,
      title: 'クリエイティブワークを効率化するツール10選',
      excerpt: 'デザインや動画制作の生産性を向上させる、おすすめツールを厳選してご紹介。',
      categories: [{ title: 'クリエイティブ', slug: { current: 'creativity' } }],
      tags: [
        { title: 'デザイン', slug: { current: 'design' } },
        { title: 'ツール', slug: { current: 'tools' } }
      ],
      publishedAt: '2024-06-28'
    },
    'ai-future-work': {
      ...dummyPost,
      title: 'AIと共存する未来のワークスタイル',
      excerpt: 'AIの発展により変化する働き方と、私たちが準備すべきスキルについて考察します。',
      categories: [{ title: 'テクノロジー', slug: { current: 'technology' } }],
      tags: [
        { title: 'AI', slug: { current: 'ai' } },
        { title: '働き方', slug: { current: 'workstyle' } }
      ],
      publishedAt: '2024-06-25'
    }
  }

  if (!post) {
    post = dummyPosts[slug as keyof typeof dummyPosts]
  }

  if (!post) {
    notFound()
  }

  const readingTime = Math.ceil(post.excerpt.length / 200) // 簡易的な読了時間計算

  return (
    <div className="bg-white min-h-screen">
      <BlogPostJsonLd post={post} />
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
            {post.categories.map((category: { title: string, slug: { current: string } }) => (
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
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
              </time>
            </div>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <div className="flex items-center">
                <span className="mr-2">更新:</span>
                <time dateTime={post.updatedAt}>
                  {format(new Date(post.updatedAt), 'yyyy年M月d日', { locale: ja })}
                </time>
              </div>
            )}
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>約{readingTime}分で読めます</span>
            </div>
          </div>

          {post.featuredImage && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                {post.author.image && (
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                {post.author.bio && (
                  <p className="text-sm text-gray-600">{post.author.bio}</p>
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
          {post.content ? (
            <div className="text-lg leading-relaxed text-gray-700">
              <p className="mb-6">
                {typeof post.content === 'string' ? post.content : 'コンテンツを読み込み中...'}
              </p>
            </div>
          ) : (
            <div className="text-lg leading-relaxed text-gray-700">
              <p className="mb-6">
                スタートアップの世界は、成功と失敗が紙一重の厳しい世界です。私自身も複数の事業を立ち上げる中で、数多くの失敗を経験してきました。今回は、その中でも特に印象的だった失敗と、そこから学んだ教訓について共有したいと思います。
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. 市場調査の不足</h2>
              <p className="mb-6">
                最初のスタートアップで犯した最大の過ちは、十分な市場調査を行わずに製品開発を進めてしまったことです。自分たちが「いいもの」だと思って作った製品が、実際にはユーザーが求めていないものだったのです。
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. チーム構成の重要性</h2>
              <p className="mb-6">
                技術力のあるメンバーを集めることに集中しすぎて、ビジネス開発やマーケティングの専門家を軽視していました。バランスの取れたチーム構成の重要性を痛感しました。
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. 資金調達のタイミング</h2>
              <p className="mb-6">
                資金調達を急ぎすぎて、十分な準備ができていない状態で投資家にアプローチしてしまいました。プロダクトの完成度や市場での位置づけが明確でない状態では、投資家からの信頼を得ることは困難でした。
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">学んだ教訓</h2>
              <p className="mb-6">
                これらの失敗から学んだ最も重要な教訓は、「顧客第一」の考え方です。どんなに技術的に優れた製品でも、顧客が求めていなければ意味がありません。また、チームワークと適切なタイミングの重要性も実感しました。
              </p>
              
              <p className="mb-6">
                失敗は確かに辛い経験でしたが、それらがあったからこそ今の自分があると思っています。これから起業を考えている方々には、失敗を恐れずに挑戦してほしいと思います。ただし、同じ失敗を繰り返さないよう、先人の経験から学ぶことも大切です。
              </p>
            </div>
          )}
        </div>

        <footer className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="flex items-center text-gray-600 mr-4">
              <Tag size={18} className="mr-2" />
              タグ:
            </span>
            {post.tags.map((tag: { title: string, slug: { current: string } }) => (
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