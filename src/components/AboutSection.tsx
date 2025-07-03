import { Camera, Cpu, Globe, Palette } from 'lucide-react'

export default function AboutSection() {
  const achievements = [
    {
      icon: <Camera className="w-8 h-8 text-orange-600" />,
      title: "写真家",
      description: "世界各地での撮影経験を活かし、ポートレートから商品撮影まで幅広く対応。"
    },
    {
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      title: "AI講師",
      description: "初心者から法人まで、AI活用の基礎から実践まで分かりやすく指導。"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "国際的活動",
      description: "アイルランド・ドバイ・日本を拠点にグローバルな視点で価値創造。"
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "伝統×革新",
      description: "日本の枡文化を現代的にアップデートし、世界に発信するFOMUSプロジェクト。"
    }
  ]

  const collections = [
    {
      name: "FOMUS PARURE",
      category: "ジュエリーコレクション",
      description: "伝統的な枡の美しさをジュエリーデザインに昇華"
    },
    {
      name: "KUKU",
      category: "伝統工芸",
      description: "日本の伝統工芸を現代的な感覚でアップデート"
    },
    {
      name: "枡フォト",
      category: "写真サービス",
      description: "枡を使った独創的な写真撮影サービス"
    },
    {
      name: "SILVA",
      category: "ゲームデザイン",
      description: "戦略性の高いオリジナルカードゲーム"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About FOMUS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            日本の伝統文化と現代テクノロジーを融合させ、
            世界に向けて新しい価値を創造しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <div className="flex justify-center mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              FOMUSコレクション
            </h3>
            <p className="text-lg text-gray-700">
              伝統×革新のブランド体験
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {collection.name}
                </h4>
                <p className="text-sm text-orange-600 mb-3 font-medium">
                  {collection.category}
                </p>
                <p className="text-gray-600 text-sm">
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                ミッション
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                日本の美しい伝統工芸である「枡」を現代的にアップデートし、
                世界に向けて発信することで、文化の継承と革新を実現します。
                アイルランド・ドバイ・日本を拠点に、グローバルな視点で
                日本文化の新しい価値を創造しています。
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                価値観
              </h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  伝統と革新を融合させたユニークなブランド創造
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  世界中に日本の美意識と価値を伝える
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  個人・法人問わず、価値を最大限に引き出す
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}