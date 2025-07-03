# FOMUS まっすー 公式サイト兼ブログ

クリエイター・起業家 FOMUS まっすーの公式サイトです。WordPressの制約を克服し、柔軟なカスタマイズが可能な現代的なWebサイトとして構築されています。

## 🚀 技術スタック

- **フロントエンド**: Next.js 15 (React + TypeScript)
- **スタイリング**: Tailwind CSS
- **CMS**: Sanity
- **ホスティング**: Vercel
- **分析**: Google Analytics 4

## ✨ 主要機能

### 📱 レスポンシブデザイン
- モバイルファースト設計
- すべてのデバイスで最適な表示

### 📝 ブログ機能
- カテゴリー・タグによる記事分類
- 全文検索機能
- リアルタイム検索モーダル
- ページネーション対応

### 🔍 SEO最適化
- 自動サイトマップ生成
- 構造化データ (JSON-LD)
- OGP (Open Graph Protocol) 対応
- メタタグの動的生成

### ⚡ パフォーマンス
- 静的サイト生成 (SSG)
- 画像の自動最適化
- コード分割による高速ロード

## 🏗️ プロジェクト構造

```
ikehaya-official-site/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── blog/           # ブログ関連ページ
│   │   ├── contact/        # お問い合わせページ
│   │   ├── profile/        # プロフィールページ
│   │   └── search/         # 検索ページ
│   ├── components/         # 再利用可能コンポーネント
│   ├── lib/               # Sanity設定・クエリ
│   └── types/             # TypeScript型定義
├── public/                # 静的ファイル
└── README.md             # このファイル
```

## 🛠️ 開発環境のセットアップ

### 1. 前提条件

- Node.js 18以上
- npm または yarn
- Git

### 2. インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/ikehaya-official-site.git
cd ikehaya-official-site

# 依存関係のインストール
npm install
```

### 3. 環境変数の設定

`.env.local` ファイルを作成し、以下の変数を設定してください：

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 📦 ビルド・デプロイ

### ローカルビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果の確認
npm run start
```

### Vercelへのデプロイ

#### ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/masuo444/masublog.git)

#### 手動デプロイ

1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. 自動デプロイが開始されます

## 🎨 カスタマイズ

### テーマカラーの変更

`tailwind.config.ts` でカラーパレットをカスタマイズできます。

### Sanity CMSの設定

1. [Sanity.io](https://sanity.io) でアカウントを作成
2. 新しいプロジェクトを作成
3. 環境変数に PROJECT_ID を設定

### Google Analyticsの設定

1. [Google Analytics](https://analytics.google.com) でプロパティを作成
2. 測定ID (G-XXXXXXXXXX) を環境変数に設定

## 📊 パフォーマンス

- **Lighthouse スコア**: 90以上を目標
- **ページ読み込み速度**: 3秒以内
- **Core Web Vitals**: すべて緑色評価

## 🔒 セキュリティ

- 環境変数による機密情報の管理
- CSP (Content Security Policy) 対応
- XSS対策済み

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 お問い合わせ

- **ウェブサイト**: [fomus-masuo.com](https://fomus-masuo.com)
- **メール**: contact@fomus-masuo.com
- **Twitter**: [@fomus_masuo](https://twitter.com/fomus_masuo)

---

© 2024 FOMUS まっすー. All rights reserved.