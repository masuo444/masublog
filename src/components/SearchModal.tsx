'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface SearchResult {
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

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const dummyResults: SearchResult[] = [
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

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      
      // 実際のAPI呼び出しの代わりにダミーデータをフィルタリング
      setTimeout(() => {
        const filteredResults = dummyResults.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filteredResults)
        setIsLoading(false)
      }, 500)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div className="flex items-center p-4 border-b">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="記事を検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {query.length <= 2 ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="mx-auto mb-4 text-gray-300" size={48} />
                <p>3文字以上入力して検索してください</p>
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">検索中...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>「{query}」に関する記事が見つかりませんでした</p>
              </div>
            ) : (
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-4">
                  {results.length}件の記事が見つかりました
                </p>
                <div className="space-y-4">
                  {results.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      onClick={onClose}
                      className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage.asset.url}
                              alt={post.featuredImage.alt || post.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Search size={20} />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full mr-2">
                              {post.categories[0]?.title}
                            </span>
                            <Calendar size={12} className="mr-1" />
                            <time dateTime={post.publishedAt}>
                              {format(new Date(post.publishedAt), 'yyyy/M/d', { locale: ja })}
                            </time>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50 text-xs text-gray-500">
            <p><kbd className="px-2 py-1 bg-white border rounded">Enter</kbd> で開く、<kbd className="px-2 py-1 bg-white border rounded">Esc</kbd> で閉じる</p>
          </div>
        </div>
      </div>
    </div>
  )
}