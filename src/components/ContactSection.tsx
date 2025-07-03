import { Mail, MessageCircle, Globe } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ご相談・ご依頼・取材・協業のご連絡はこちらからお気軽にどうぞ。
            個人・法人問わず、お待ちしています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
            <div className="flex justify-center mb-4">
              <MessageCircle className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instagram
            </h3>
            <p className="text-gray-600 mb-4">
              最新の活動状況や作品を日々更新中
            </p>
            <a
              href="https://www.instagram.com/masumasumasuo7/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              @masumasumasuo7
            </a>
          </div>

          <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
            <div className="flex justify-center mb-4">
              <Globe className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              FOMUS公式サイト
            </h3>
            <p className="text-gray-600 mb-4">
              詳しいブランド情報や商品について
            </p>
            <a
              href="https://fomus.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              fomus.jp
            </a>
          </div>

          <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ビジネスお問い合わせ
            </h3>
            <p className="text-gray-600 mb-4">
              法人案件・講演依頼・取材について
            </p>
            <a
              href="mailto:contact@fomus-masuo.com"
              className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
            >
              contact@fomus-masuo.com
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            世界を旅して、価値を共創しませんか？
          </h3>
          <p className="text-xl mb-8 opacity-90">
            アイルランド・ドバイ・日本を拠点に、
            グローバルな視点で新しい価値を創造しています。
            あなたのプロジェクトもぜひ一緒に実現しましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/masumasumasuo7/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="mr-2" size={20} />
              Instagramで連絡
            </a>
            <a
              href="mailto:contact@fomus-masuo.com"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              <Mail className="mr-2" size={20} />
              メールで相談
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}