'use client'

import { useState } from 'react'
import { Camera, Cpu, Monitor, Palette, Mic, Building, Gift, Globe } from 'lucide-react'

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('individual')

  const individualServices = [
    {
      icon: <Camera className="w-8 h-8 text-orange-600" />,
      title: "撮影依頼",
      description: "ポートレート・商品撮影・イベント撮影など、あなたの価値を最大限に引き出す撮影サービス",
      features: [
        "ポートレート撮影",
        "商品・ブランド撮影",
        "イベント・記念撮影"
      ]
    },
    {
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      title: "AIコンサル・講座",
      description: "初心者歓迎！店舗経営者・クリエイター向けのAI活用支援",
      features: [
        "AI活用基礎講座",
        "個人向けAI導入支援",
        "クリエイティブAI活用法"
      ]
    },
    {
      icon: <Monitor className="w-8 h-8 text-green-600" />,
      title: "ホームページ制作サポート",
      description: "個人・小規模事業者向けのプロフェッショナルなホームページ制作サポート",
      features: [
        "サイト企画・デザイン",
        "レスポンシブサイト構築",
        "SEO対策・運用支援"
      ]
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "創作支援",
      description: "音楽・映像・イラスト制作をAIを活用してサポート",
      features: [
        "AI音楽制作支援",
        "映像編集・制作",
        "AIイラスト活用指導"
      ]
    }
  ]

  const corporateServices = [
    {
      icon: <Mic className="w-8 h-8 text-orange-600" />,
      title: "法人向け講演・セミナー",
      description: "AI活用・グローバル展開・クリエイティブ思考についての講演",
      features: [
        "AI活用セミナー（2-4時間）",
        "グローバル展開講演",
        "クリエイティブ思考研修"
      ]
    },
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "社内AI研修",
      description: "従業員向けAI活用研修・導入コンサルティング",
      features: [
        "AI基礎研修（1日コース）",
        "部署別AI活用研修",
        "AI導入戦略策定"
      ]
    },
    {
      icon: <Gift className="w-8 h-8 text-amber-600" />,
      title: "枡ギフト製作＆ブランディング",
      description: "日本の伝統的な枡を活用した企業ギフト・ブランディング",
      features: [
        "オリジナル枡デザイン",
        "企業ストーリー構築",
        "ギフト企画・制作"
      ]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "SNS×グローバル戦略",
      description: "海外展開を見据えたSNS戦略・コンテンツ制作支援",
      features: [
        "グローバルSNS戦略策定",
        "多言語コンテンツ制作",
        "海外パートナーシップ支援"
      ]
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            個人から法人まで、あなたのニーズに合わせた
            幅広いサービスを提供しています。
          </p>
        </div>

        {/* タブ切り替え */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'individual'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👤 個人向けサービス
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'corporate'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏢 法人向けサービス
            </button>
          </div>
        </div>

        {/* サービス内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(activeTab === 'individual' ? individualServices : corporateServices).map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
                    {activeTab === 'individual' ? 'Personal' : 'Business'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href="#contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                お問い合わせ
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}