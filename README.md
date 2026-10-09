# 資産形成ノート（Astro × microCMS × Cloudflare Workers）

投資・資産形成ブログ。ランニングコスト0円構成（費用は独自ドメインのみ）。

| 役割 | 採用 |
|---|---|
| フレームワーク | Astro（静的生成） |
| ホスティング | Cloudflare Workers Static Assets（無料・無制限） |
| CMS | microCMS Hobby（無料） |
| CI/CD | Workers Builds（GitHub連携） + Deploy Hook |

## ローカル開発

```bash
npm install
cp .env.example .env   # 未設定ならサンプル記事で動きます
npm run dev            # http://localhost:4321
npm run preview        # Workers環境で確認（wrangler dev）
```

## 構成

```
src/
  config.ts           サイト名・ナビ・フッター（まずここを編集）
  lib/microcms.ts     microCMS取得・目次生成・画像最適化
  lib/sample.ts       未接続時のサンプルデータ
  layouts/            共通レイアウト（OGP・JSON-LD・免責文）
  pages/
    index.astro               トップ（/page/2/ 以降でページ送り）
    posts/[id].astro          記事（目次・PR表記・リスク注記・関連記事・パンくず）
    category/[id]/[...page]   カテゴリ一覧
    tag/[id]/                 タグ一覧（noindex）
    disclaimer / privacy / ad-policy / about   法務・運営者ページ
    rss.xml.ts / robots.txt.ts
public/_headers       セキュリティヘッダー・キャッシュ設定
wrangler.jsonc        Worker設定
microcms-schema/      microCMS側のAPI設定手順
```

## デプロイ手順

### 1. GitHubへpush
```bash
git init && git add . && git commit -m "init"
git branch -M main
git remote add origin https://github.com/<you>/invest-blog.git
git push -u origin main
```

### 2. Cloudflare：WorkerをGitHubに接続
1. Workers & Pages → **作成** → **Import a repository** → GitHubを連携 → `invest-blog` を選択
2. 設定
   - プロジェクト名：`invest-blog`（`wrangler.jsonc` の `name` と一致させる）
   - ビルドコマンド：`npm run build`
   - デプロイコマンド：`npx wrangler deploy`
3. **ビルド変数とシークレット**（Settings → Build → Variables and secrets）
   - `MICROCMS_SERVICE_DOMAIN`：サービスID（`xxxx.microcms.io` の `xxxx`）
   - `MICROCMS_API_KEY`：APIキー（**シークレット**として登録）
   - `SITE_URL`：`https://invest-blog.<あなたのサブドメイン>.workers.dev`
4. 保存して再デプロイ

### 3. microCMS 設定
`microcms-schema/README.md` を参照。

### 4. 記事公開で自動反映（Deploy Hook）
1. Cloudflare：Worker → Settings → Builds → **Deploy Hooks** → 作成（ブランチ `main`）→ URLをコピー
2. microCMS：各API → API設定 → Webhook → **カスタム通知** にURLを登録（公開・公開終了・削除をON）

### 5. 独自ドメイン（将来）
1. Cloudflare Registrar でドメイン購入（またはDNSをCloudflareへ移管）
2. Worker → Settings → Domains & Routes → **Custom Domain** を追加
3. ビルド変数 `SITE_URL` を新ドメインに変更して再デプロイ
4. Google Search Console に登録し `sitemap-index.xml` を送信

## 運用メモ（投資ブログ特有）
- 広告・アフィリエイトを含む記事は microCMS の `isPr` をON → 冒頭にPR表記（ステマ規制対応）
- 全記事末尾にリスク注記、フッターに免責文を自動表示
- 個別銘柄の売買推奨は投資助言業（金融商品取引法の登録）に該当しうるため避ける
- 制度改正時は記事を更新 → 「最終更新日」が自動表示される
- `about` ページの運営者プロフィールは必ず記入（E-E-A-T対策）

## 無料枠の目安
- Workers Static Assets：静的ファイル配信は無料・無制限
- Workers Builds（無料プラン）：月のビルド時間に上限あり。記事公開ごとに1ビルド（数十秒）なので通常は十分
- microCMS Hobby：API 5個 / 1万コンテンツ / 転送20GB/月（ビルド時の取得のみで消費）
