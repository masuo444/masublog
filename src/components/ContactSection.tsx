import { Mail, MessageCircle, Calendar } from 'lucide-react'

export default function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            お問い合わせ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ビジネスの相談、コラボレーションのご提案、
            講演・取材のご依頼など、お気軽にご連絡ください。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              メールでのお問い合わせ
            </h3>
            <p className="text-gray-600 mb-4">
              ビジネスに関するご相談やご質問はこちら
            </p>
            <a
              href="mailto:contact@fomus-masuo.com"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              contact@fomus-masuo.com
            </a>
          </div>

          <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex justify-center mb-4">
              <MessageCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              SNSでのコンタクト
            </h3>
            <p className="text-gray-600 mb-4">
              日常的な交流や軽いご質問はSNSでも
            </p>
            <div className="space-y-2">
              <a
                href="https://twitter.com/fomus_masuo"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/fomus_masuo"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-pink-600 font-medium hover:text-pink-700 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex justify-center mb-4">
              <Calendar className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              オンライン面談
            </h3>
            <p className="text-gray-600 mb-4">
              詳しいご相談や打ち合わせが必要な場合
            </p>
            <a
              href="#"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
            >
              予約カレンダー
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            一緒に何か面白いことを始めませんか？
          </h3>
          <p className="text-xl mb-8 opacity-90">
            新しいアイデアや挑戦的なプロジェクトには
            いつでもワクワクしています。
          </p>
          <a
            href="mailto:contact@fomus-masuo.com"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail className="mr-2" size={20} />
            今すぐ連絡する
          </a>
        </div>
      </div>
    </section>
  )
}