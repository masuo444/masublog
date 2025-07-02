import Link from 'next/link'
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">FOMUS まっすー</h3>
            <p className="text-gray-300 mb-6">
              クリエイター・起業家として、様々なプロジェクトに挑戦しています。
              最新の情報や活動について発信していきます。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">ナビゲーション</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ブログ
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white transition-colors"
              >
                プロフィール
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                お問い合わせ
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">カテゴリー</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/blog/category/business"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ビジネス
              </Link>
              <Link
                href="/blog/category/technology"
                className="text-gray-300 hover:text-white transition-colors"
              >
                テクノロジー
              </Link>
              <Link
                href="/blog/category/lifestyle"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ライフスタイル
              </Link>
              <Link
                href="/blog/category/creativity"
                className="text-gray-300 hover:text-white transition-colors"
              >
                クリエイティブ
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 FOMUS まっすー. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}