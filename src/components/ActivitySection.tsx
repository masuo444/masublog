import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Globe } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { getAmericaSpainActivityPosts, NotionPost } from '@/lib/notion'

export default async function ActivitySection() {
  // Notionから活動記のエピソードを取得
  let episodes: NotionPost[] = []
  
  try {
    episodes = await getAmericaSpainActivityPosts()
    console.log('Notion活動記エピソード取得成功:', episodes.length, '件')
    console.log('エピソード詳細:', episodes.slice(0, 3).map(e => ({ title: e.title, slug: e.slug })))
  } catch (error) {
    console.error('Notion活動記エピソード取得エラー:', error)
  }

  // エピソードが取得できない場合は何も表示しない
  if (episodes.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="text-4xl">🌍</div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                活動記
              </h2>
              <div className="flex gap-2 text-3xl">
                <span>🇺🇸</span>
                <span>🇪🇸</span>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              アメリカとスペインでの活動記を準備中です。<br />
              もうしばらくお待ちください。
            </p>
          </div>
        </div>
      </section>
    )
  }

  // 最新3話を表示
  const displayEpisodes = episodes.slice(0, 3)

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="text-4xl">🌍</div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              活動記
            </h2>
            <div className="flex gap-2 text-3xl">
              <span>🇺🇸</span>
              <span>🇪🇸</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            アメリカとスペインでの活動を記録したシリーズです。<br />
            現地での体験、文化の違い、学んだことを話数ごとに詳しく紹介しています。
          </p>
          <div className="mt-6 flex justify-center items-center gap-6 text-gray-500">
            <div className="flex items-center">
              <Globe size={20} className="mr-2" />
              <span>2カ国での活動</span>
            </div>
            <div className="flex items-center">
              <MapPin size={20} className="mr-2" />
              <span>現地レポート</span>
            </div>
          </div>
        </div>

        {/* エピソード一覧 */}
        {displayEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayEpisodes.map((episode, index) => (
              <article
                key={episode.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* サムネイル部分 */}
                <Link href={`/blog/${episode.slug}`}>
                  <div className="relative h-48">
                    {episode.featuredImage ? (
                      <Image
                        src={episode.featuredImage.asset.url}
                        alt={episode.featuredImage.alt || episode.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 via-purple-400 to-orange-400">
                        <div className="text-center text-white">
                          <div className="text-5xl mb-2">
                            {index % 3 === 0 ? '🇺🇸' : index % 3 === 1 ? '🇪🇸' : '✈️'}
                          </div>
                          <span className="text-2xl font-bold">
                            第{index + 1}話
                          </span>
                        </div>
                      </div>
                    )}
                    {/* エピソード番号バッジ */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold rounded-full border border-white/20">
                        第{index + 1}話
                      </span>
                    </div>
                    {/* 国旗バッジ */}
                    <div className="absolute top-4 right-4">
                      <div className="flex gap-1">
                        <span className="text-2xl drop-shadow-lg">🇺🇸</span>
                        <span className="text-2xl drop-shadow-lg">🇪🇸</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* コンテンツ部分 */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-1" />
                    <time dateTime={episode.publishedAt}>
                      {format(new Date(episode.publishedAt), 'yyyy年M月d日', { locale: ja })}
                    </time>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
                    <Link href={`/blog/${episode.slug}`}>
                      {episode.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {episode.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {episode.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.slug.current}
                        className="inline-block px-2 py-1 bg-gradient-to-r from-blue-100 to-orange-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        #{tag.title}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${episode.slug}`}
                    className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors text-sm"
                  >
                    この話を読む
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* エピソードがない場合の表示 */
          <div className="text-center py-12">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              活動記を準備中です
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              アメリカ・スペインでの活動記を鋭意制作中です。もうしばらくお待ちください。
            </p>
          </div>
        )}

        {/* すべての活動記を見るボタン */}
        <div className="text-center">
          <Link
            href="/blog/category/america-spain-activity"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Globe size={20} className="mr-2" />
            すべての活動記を見る
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}