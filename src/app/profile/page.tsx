import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Users, Award, TrendingUp, Mail, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'プロフィール | FOMUS まっすー',
  description: 'クリエイター・起業家 FOMUS まっすーのプロフィールページです。経歴、実績、ミッションについて詳しくご紹介します。',
  openGraph: {
    title: 'プロフィール | FOMUS まっすー',
    description: 'クリエイター・起業家 FOMUS まっすーのプロフィールページです。',
    type: 'profile',
  },
}

export default function ProfilePage() {
  const achievements = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "起業経験",
      description: "複数のスタートアップを立ち上げ、事業を成功に導いた経験があります。",
      details: "2018年〜現在"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "コミュニティ運営",
      description: "クリエイター向けコミュニティを運営し、1000人以上のメンバーをサポート。",
      details: "1000+ メンバー"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: "受賞歴",
      description: "革新的なプロダクトで複数のビジネスコンテストで受賞。",
      details: "5回受賞"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "成長実績",
      description: "手がけた事業は年間売上1億円を突破し、継続的な成長を実現。",
      details: "年間1億円達成"
    }
  ]

  const timeline = [
    {
      year: "2024",
      title: "新規事業立ち上げ",
      description: "AI技術を活用したクリエイターサポートツールの開発を開始"
    },
    {
      year: "2023",
      title: "コミュニティ拡大",
      description: "運営するクリエイターコミュニティが1000人を突破"
    },
    {
      year: "2022",
      title: "事業売上目標達成",
      description: "手がけるメイン事業で年間売上1億円を達成"
    },
    {
      year: "2021",
      title: "複数の受賞",
      description: "イノベーション部門で3つのビジネスコンテストで受賞"
    },
    {
      year: "2020",
      title: "第2の事業立ち上げ",
      description: "デジタルマーケティング支援事業を開始"
    },
    {
      year: "2018",
      title: "起業・創業",
      description: "クリエイティブ制作会社を設立、起業家としてのキャリアをスタート"
    }
  ]

  const skills = [
    { name: "事業戦略", level: 95 },
    { name: "チーム管理", level: 90 },
    { name: "マーケティング", level: 85 },
    { name: "プロダクト開発", level: 80 },
    { name: "デザイン", level: 75 },
    { name: "技術理解", level: 70 }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                FOMUS まっすー
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                クリエイター・起業家
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                革新的なアイデアとクリエイティブな視点で、新しい価値を創造し続けています。
                テクノロジーとクリエイティビティの力で、人々の生活をより豊かで意味のあるものにすることを目指しています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="mr-2" size={20} />
                  お問い合わせ
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  ブログを読む
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                  <Image
                    src="/profile-image.jpg"
                    alt="FOMUS まっすーのプロフィール写真"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 実績セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              実績・成果
            </h2>
            <p className="text-xl text-gray-600">
              これまでの主な成果と実績をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="text-blue-600 font-bold text-lg mb-2">
                  {achievement.details}
                </div>
                <p className="text-gray-600">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* スキルセクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              スキル・専門分野
            </h2>
            <p className="text-xl text-gray-600">
              長年の経験で培った専門スキル
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {skill.name}
                    </span>
                    <span className="text-blue-600 font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* タイムラインセクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              キャリアの歩み
            </h2>
            <p className="text-xl text-gray-600">
              起業から現在までの主要なマイルストーン
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1 lg:pr-8 lg:pl-8">
                      <div className={`bg-white p-6 rounded-lg shadow-md ${
                        index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                      }`}>
                        <div className="text-blue-600 font-bold text-xl mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            一緒にプロジェクトを始めませんか？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            新しいアイデアや挑戦的なプロジェクトには
            いつでもワクワクしています。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="mr-2" size={20} />
              お問い合わせ
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Calendar className="mr-2" size={20} />
              ブログを読む
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}