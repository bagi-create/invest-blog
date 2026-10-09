// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番URL。Cloudflareの「ビルド変数」SITE_URL で上書き（独自ドメイン取得後はそちらに変更）
const site = process.env.SITE_URL || 'https://invest-blog.example.workers.dev';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/tag/') })],
});
