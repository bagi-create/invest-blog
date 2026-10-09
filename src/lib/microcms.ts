import { samplePosts, sampleCategories, sampleTags } from './sample';

export type Media = { url: string; width?: number; height?: number };
export type Category = { id: string; name: string; description?: string };
export type Tag = { id: string; name: string };
export type Post = {
  id: string;
  title: string;
  description?: string;
  content: string; // リッチエディタのHTML
  eyecatch?: Media;
  category?: Category;
  tags?: Tag[];
  isPr?: boolean; // 広告・アフィリエイトを含む記事
  publishedAt: string;
  updatedAt: string;
  revisedAt?: string;
};

const DOMAIN = import.meta.env.MICROCMS_SERVICE_DOMAIN ?? process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = import.meta.env.MICROCMS_API_KEY ?? process.env.MICROCMS_API_KEY;
export const usingSample = !DOMAIN || !API_KEY;

if (usingSample) {
  console.warn('[microCMS] 環境変数が未設定のためサンプルデータでビルドします');
}

async function fetchAll<T>(endpoint: string, query: Record<string, string> = {}): Promise<T[]> {
  const items: T[] = [];
  const limit = 100;
  for (let offset = 0; ; offset += limit) {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset), ...query });
    const res = await fetch(`https://${DOMAIN}.microcms.io/api/v1/${endpoint}?${params}`, {
      headers: { 'X-MICROCMS-API-KEY': API_KEY! },
    });
    if (!res.ok) throw new Error(`[microCMS] ${endpoint} ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as { contents: T[]; totalCount: number };
    items.push(...json.contents);
    if (items.length >= json.totalCount || json.contents.length === 0) break;
  }
  return items;
}

// ビルド中は1回だけ取得して使い回す（API転送量の節約）
let postsCache: Promise<Post[]> | undefined;
let catsCache: Promise<Category[]> | undefined;
let tagsCache: Promise<Tag[]> | undefined;

const byDateDesc = (a: Post, b: Post) => +new Date(b.publishedAt) - +new Date(a.publishedAt);

export function getPosts(): Promise<Post[]> {
  postsCache ??= (usingSample
    ? Promise.resolve(samplePosts)
    : fetchAll<Post>('blogs', { orders: '-publishedAt' })
  ).then((p) => [...p].sort(byDateDesc));
  return postsCache;
}

export function getCategories(): Promise<Category[]> {
  catsCache ??= usingSample ? Promise.resolve(sampleCategories) : fetchAll<Category>('categories');
  return catsCache;
}

export function getTags(): Promise<Tag[]> {
  tagsCache ??= usingSample ? Promise.resolve(sampleTags) : fetchAll<Tag>('tags');
  return tagsCache;
}

/** 記事HTMLに見出しIDを付与し、目次を生成。画像は遅延読込＋microCMS画像APIで最適化 */
export function processContent(html: string) {
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  let i = 0;
  const out = html
    .replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, lv: string, attrs: string, inner: string) => {
      const existing = attrs.match(/id="([^"]+)"/)?.[1];
      const id = existing ?? `h-${++i}`;
      const text = inner.replace(/<[^>]+>/g, '').trim();
      toc.push({ id, text, level: Number(lv) as 2 | 3 });
      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/, '');
      return `<h${lv} id="${id}"${cleanAttrs}>${inner}</h${lv}>`;
    })
    .replace(/<img([^>]*?)src="(https:\/\/images\.microcms-assets\.io[^"?]+)"/g,
      '<img$1src="$2?w=1200&fm=webp" loading="lazy" decoding="async"')
    .replace(/<table/g, '<div class="table-wrap"><table')
    .replace(/<\/table>/g, '</table></div>');
  return { html: out, toc };
}

export function imageUrl(m: Media | undefined, w = 800) {
  if (!m) return undefined;
  return m.url.includes('microcms-assets.io') ? `${m.url}?w=${w}&fm=webp` : m.url;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function plainText(html: string, len = 120) {
  const t = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return t.length > len ? t.slice(0, len) + '…' : t;
}
