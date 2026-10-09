// microCMS未接続時に使うサンプルデータ（接続後は使われません）
import type { Post, Category, Tag } from './microcms';

export const sampleCategories: Category[] = [
  { id: 'nisa', name: '新NISA', description: '新NISAの制度・使い方・銘柄選びの考え方' },
  { id: 'ideco', name: 'iDeCo', description: 'iDeCoの節税効果と受け取り方' },
  { id: 'fund', name: '投資信託', description: 'インデックスファンドの比較と選び方' },
  { id: 'us-stock', name: '米国株', description: '米国株・ETFの基礎知識' },
  { id: 'household', name: '家計管理', description: '投資の原資をつくる家計の整え方' },
];

export const sampleTags: Tag[] = [
  { id: 'beginner', name: '初心者向け' },
  { id: 'tax', name: '税金' },
  { id: 'index', name: 'インデックス投資' },
  { id: 'simulation', name: 'シミュレーション' },
];

const c = (id: string) => sampleCategories.find((x) => x.id === id)!;
const t = (...ids: string[]) => sampleTags.filter((x) => ids.includes(x.id));

const note = '<p class="sample-note">※これはサンプル記事です。microCMSを接続すると実際の記事に置き換わります。</p>';

export const samplePosts: Post[] = [
  {
    id: 'nisa-basics',
    title: '新NISAの2つの投資枠をざっくり理解する',
    description: 'つみたて投資枠と成長投資枠の違い、年間投資枠と生涯の非課税保有限度額を整理します。',
    category: c('nisa'),
    tags: t('beginner', 'tax'),
    publishedAt: '2026-10-01T09:00:00+09:00',
    updatedAt: '2026-10-05T09:00:00+09:00',
    content: `${note}
<h2>2つの投資枠</h2>
<p>新NISAには「つみたて投資枠」と「成長投資枠」があり、併用できます。</p>
<table><thead><tr><th></th><th>つみたて投資枠</th><th>成長投資枠</th></tr></thead>
<tbody><tr><td>年間投資枠</td><td>120万円</td><td>240万円</td></tr>
<tr><td>非課税保有限度額</td><td colspan="2">合計1,800万円（うち成長投資枠は1,200万円まで）</td></tr></tbody></table>
<h2>どちらから使うべきか</h2>
<p>長期・積立・分散を軸にするなら、まずはつみたて投資枠から埋めるのが基本です。</p>
<h3>成長投資枠の使いどころ</h3>
<p>まとまった資金がある場合や、つみたて投資枠で買えない商品を保有したい場合に検討します。</p>
<h2>まとめ</h2>
<p>制度の詳細は金融庁の公式情報もあわせて確認しましょう。</p>`,
  },
  {
    id: 'ideco-tax',
    title: 'iDeCoの節税効果を3つのタイミングで整理する',
    description: '拠出時・運用時・受取時、それぞれの税制優遇を図解なしでもわかるように解説。',
    category: c('ideco'),
    tags: t('tax'),
    isPr: true,
    publishedAt: '2026-09-25T09:00:00+09:00',
    updatedAt: '2026-09-25T09:00:00+09:00',
    content: `${note}
<h2>拠出時：掛金が全額所得控除</h2><p>掛金は小規模企業共済等掛金控除の対象になります。</p>
<h2>運用時：運用益が非課税</h2><p>通常約20%かかる運用益への課税がありません。</p>
<h2>受取時：退職所得控除・公的年金等控除</h2><p>一時金か年金かで使える控除が変わります。</p>`,
  },
  {
    id: 'index-fund-cost',
    title: 'インデックスファンドは「信託報酬」だけで選んでいいのか',
    description: '実質コスト、純資産総額、トラッキングエラーまで含めた比較の視点。',
    category: c('fund'),
    tags: t('index', 'beginner'),
    publishedAt: '2026-09-18T09:00:00+09:00',
    updatedAt: '2026-09-20T09:00:00+09:00',
    content: `${note}<h2>見るべき4つの指標</h2><p>信託報酬・実質コスト・純資産総額・トラッキングエラー。</p><h2>結論</h2><p>コストは重要だが唯一の基準ではない。</p>`,
  },
  {
    id: 'us-etf-basics',
    title: '米国ETFと投資信託、どちらで米国株に投資するか',
    description: '為替手数料・分配金・外国税額控除の観点で比較します。',
    category: c('us-stock'),
    tags: t('index', 'tax'),
    publishedAt: '2026-09-10T09:00:00+09:00',
    updatedAt: '2026-09-10T09:00:00+09:00',
    content: `${note}<h2>比較のポイント</h2><p>手間と税金のバランスで選ぶ。</p>`,
  },
  {
    id: 'household-first',
    title: '投資を始める前に「生活防衛資金」をいくら置くか',
    description: '生活費の何か月分を現金で持つか、家族構成別の考え方。',
    category: c('household'),
    tags: t('beginner'),
    publishedAt: '2026-09-02T09:00:00+09:00',
    updatedAt: '2026-09-02T09:00:00+09:00',
    content: `${note}<h2>目安は生活費の3〜12か月分</h2><p>収入の安定度で調整します。</p>`,
  },
  {
    id: 'simulation-20y',
    title: '毎月3万円を20年積み立てたらどうなるか試算する',
    description: '想定利回り別のシミュレーションと、その数字の読み方。',
    category: c('nisa'),
    tags: t('simulation', 'index'),
    publishedAt: '2026-08-28T09:00:00+09:00',
    updatedAt: '2026-08-28T09:00:00+09:00',
    content: `${note}<h2>試算の前提</h2><p>元本720万円、年利3%/5%で比較（税・手数料は考慮しない単純計算）。</p><h2>注意点</h2><p>試算は将来の成果を保証しません。</p>`,
  },
];
