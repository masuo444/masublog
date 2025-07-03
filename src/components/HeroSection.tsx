import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-gray-900 mb-6 tracking-tight">
              <span className="text-orange-600 font-display">まっすー</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-extralight text-gray-600 tracking-wide">
                FOMUS代表
              </span>
            </h1>
            <p className="text-xl text-gray-500 mb-4 font-serif font-light tracking-wide">
              写真家・アーティスト・AI講師・プロデューサー
            </p>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-serif font-light tracking-wide">
              世界を旅して、価値を共創する。
              <br />
              <span className="text-lg text-gray-600">
                日本の伝統文化と現代テクノロジーを融合させ、
                アイルランド・ドバイ・日本を拠点に国際的な活動を展開しています。
                写真・AI・枡ブランディングを通じて、あなたの価値を最大限に引き出します。
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-sans font-medium rounded-lg hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wide"
              >
                お問い合わせ
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-orange-600 text-orange-600 font-sans font-medium rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-300 tracking-wide"
              >
                サービス詳細
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 p-1">
                <Image
                  src="/profile.jpg"
                  alt="まっすー プロフィール写真"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  📸
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}