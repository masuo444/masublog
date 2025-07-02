import { Briefcase, Users, Award, TrendingUp } from 'lucide-react'

export default function AboutSection() {
  const achievements = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "起業経験",
      description: "複数のスタートアップを立ち上げ、事業を成功に導いた経験があります。"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "コミュニティ運営",
      description: "クリエイター向けコミュニティを運営し、1000人以上のメンバーをサポート。"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: "受賞歴",
      description: "革新的なプロダクトで複数のビジネスコンテストで受賞。"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "成長実績",
      description: "手がけた事業は年間売上1億円を突破し、継続的な成長を実現。"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            創造性とビジネス感覚を融合させ、
            新しい価値を世の中に提供し続けています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
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

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                ミッション
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                テクノロジーとクリエイティビティの力で、
                人々の生活をより豊かで意味のあるものにすることです。
                常に学び続け、挑戦し続けることで、
                社会に価値ある変化をもたらしたいと考えています。
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                価値観
              </h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  創造性を大切にし、常に新しいアイデアを追求
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  持続可能で社会に貢献するビジネスの構築
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  コミュニティとの協力による価値創造
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}