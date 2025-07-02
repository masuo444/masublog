import { Metadata } from 'next'
import { Mail, MessageCircle, Calendar, Phone, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'お問い合わせ | FOMUS まっすー',
  description: 'FOMUS まっすーへのお問い合わせページです。ビジネスの相談、コラボレーション、講演依頼などお気軽にご連絡ください。',
  openGraph: {
    title: 'お問い合わせ | FOMUS まっすー',
    description: 'FOMUS まっすーへのお問い合わせページです。',
    type: 'website',
  },
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-12 h-12 text-blue-600" />,
      title: "メールでのお問い合わせ",
      description: "ビジネスに関するご相談やご質問はこちら",
      contact: "contact@fomus-masuo.com",
      link: "mailto:contact@fomus-masuo.com",
      note: "24時間以内に返信いたします"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-green-600" />,
      title: "SNSでのコンタクト",
      description: "日常的な交流や軽いご質問はSNSでも",
      contact: "Twitter / Instagram",
      link: "https://twitter.com/fomus_masuo",
      note: "DMまたはメンションでご連絡ください"
    },
    {
      icon: <Calendar className="w-12 h-12 text-purple-600" />,
      title: "オンライン面談",
      description: "詳しいご相談や打ち合わせが必要な場合",
      contact: "予約カレンダー",
      link: "#",
      note: "30分〜1時間程度の面談が可能です"
    }
  ]

  const inquiryTypes = [
    {
      title: "ビジネス相談",
      description: "事業戦略、マーケティング、チーム構築などのご相談",
      icon: "💼"
    },
    {
      title: "コラボレーション",
      description: "共同プロジェクト、パートナーシップのご提案",
      icon: "🤝"
    },
    {
      title: "講演・取材",
      description: "イベント講演、メディア取材のご依頼",
      icon: "🎤"
    },
    {
      title: "メンタリング",
      description: "起業家・クリエイター向けメンタリング",
      icon: "🎯"
    },
    {
      title: "技術相談",
      description: "プロダクト開発、技術戦略のアドバイス",
      icon: "⚡"
    },
    {
      title: "その他",
      description: "上記以外のご相談やご質問",
      icon: "💭"
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ビジネスの相談、コラボレーションのご提案、講演・取材のご依頼など、
              お気軽にご連絡ください。新しいアイデアや挑戦的なプロジェクトには
              いつでもワクワクしています。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* お問い合わせ方法 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              お問い合わせ方法
            </h2>
            <p className="text-lg text-gray-600">
              お急ぎの場合はメール、お気軽な相談はSNSをご利用ください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {method.description}
                </p>
                <a
                  href={method.link}
                  className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors mb-3"
                >
                  {method.contact}
                </a>
                <p className="text-sm text-gray-500">
                  {method.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* お問い合わせ内容の種類 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              お問い合わせ内容
            </h2>
            <p className="text-lg text-gray-600">
              以下のようなご相談・ご依頼をお受けしています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inquiryTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 詳細情報 */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              対応について
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">対応時間</h3>
                    <p className="text-gray-600 text-sm">
                      平日 9:00 - 18:00<br />
                      （土日祝日は翌営業日に対応）
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">返信時間</h3>
                    <p className="text-gray-600 text-sm">
                      メールでのお問い合わせは<br />
                      24時間以内に返信いたします
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">電話対応</h3>
                    <p className="text-gray-600 text-sm">
                      電話でのお問い合わせは<br />
                      事前にメールでご連絡ください
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">対応可能な言語</h3>
                <ul className="text-gray-600 text-sm space-y-2 mb-6">
                  <li>• 日本語（ネイティブ）</li>
                  <li>• 英語（ビジネスレベル）</li>
                </ul>

                <h3 className="font-semibold text-gray-900 mb-4">対応エリア</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• オンライン（全国・海外対応）</li>
                  <li>• 対面（東京都内中心）</li>
                  <li>• 出張対応（要相談）</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              まずはお気軽にご相談ください
            </h2>
            <p className="text-xl mb-8 opacity-90">
              どんな小さなことでも構いません。
              あなたのアイデアやプロジェクトについて
              お聞かせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@fomus-masuo.com"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="mr-2" size={20} />
                メールを送る
              </a>
              <a
                href="https://twitter.com/fomus_masuo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="mr-2" size={20} />
                Twitterで連絡
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}