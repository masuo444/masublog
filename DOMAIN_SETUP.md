# FOMUS.jpサブドメイン設定手順

## 🎯 目標
`https://masublog.vercel.app/blog` → `https://blog.fomus.jp` へのドメイン変更

## 📋 設定手順

### 1. Vercelでのドメイン追加

1. **Vercelダッシュボード**にアクセス
   - [vercel.com](https://vercel.com)にログイン
   - `ikehaya-official-site`プロジェクトを選択

2. **Domains設定**
   - 「Settings」→「Domains」に移動
   - 「Add Domain」をクリック
   - `blog.fomus.jp`を入力して追加

### 2. DNS設定（FOMUS.jpドメイン）

#### A. CNAMEレコードの追加
ドメイン管理者（FOMUS.jpの管理者）に以下の設定を依頼：

```
Type: CNAME
Name: blog
Value: cname.vercel-dns.com
TTL: 3600（または自動）
```

#### B. 設定例
```
blog.fomus.jp → cname.vercel-dns.com
```

### 3. SSL証明書設定

- Vercelが自動的にLet's Encrypt SSL証明書を発行
- 通常5-10分程度で設定完了

### 4. 環境変数設定

Vercelダッシュボードで以下の環境変数を追加：

```bash
# Notion API Settings
NOTION_TOKEN=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
NOTION_DATABASE_ID=22163581c6c58071bcebc7244cff2c8a

# Webhook & Revalidation Settings
NOTION_WEBHOOK_SECRET=fomus_notion_webhook_secret_2024
REVALIDATE_SECRET=fomus_revalidate_secret_2024

# Google Analytics (オプション)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

## 🔄 Notion自動反映システム

### 1. Webhook URL設定

Notionワークスペースで以下のWebhook URLを設定：

```
https://blog.fomus.jp/api/notion-webhook
```

### 2. 手動更新URL

緊急時やテスト用の手動更新：

```
https://blog.fomus.jp/api/refresh-notion?secret=fomus_revalidate_secret_2024
```

### 3. 動作確認

1. **Notionページ更新**
   - 指定されたNotionページ（bf974aff-d18f-44d7-97e9-b1838eb2222a）を編集
   - 自動的にサイトに反映されることを確認

2. **手動更新テスト**
   ```bash
   curl -X POST "https://blog.fomus.jp/api/refresh-notion" \
        -H "Content-Type: application/json" \
        -d '{"secret": "fomus_revalidate_secret_2024"}'
   ```

## 📊 設定状況確認

### DNS伝播確認
```bash
nslookup blog.fomus.jp
dig blog.fomus.jp CNAME
```

### SSL証明書確認
```bash
curl -I https://blog.fomus.jp
```

## 🚨 トラブルシューティング

### DNS設定が反映されない場合
- TTL時間（通常24-48時間）待つ
- DNSキャッシュをクリア：`ipconfig /flushdns` (Windows) / `sudo dscacheutil -flushcache` (Mac)

### SSL証明書エラー
- Vercelで「Renew Certificate」を実行
- DNS設定が正しいか再確認

### Notion反映されない場合
- 環境変数が正しく設定されているか確認
- `/api/refresh-notion?secret=...`で手動更新テスト

## 📝 完了後の確認項目

- [ ] `https://blog.fomus.jp`でサイトアクセス可能
- [ ] SSL証明書が有効
- [ ] Notionページ更新でサイト自動更新
- [ ] 旧URL（masublog.vercel.app）からの自動リダイレクト
- [ ] Google Analyticsの動作確認（設定時）

## 🎉 完了！

設定完了後、以下が実現されます：

1. **新ドメイン**: `https://blog.fomus.jp`でアクセス可能
2. **自動更新**: Notion記事更新で即座にサイト反映
3. **高速化**: ISRによる最適化されたページ配信
4. **SEO対応**: 適切なメタデータとサイトマップ