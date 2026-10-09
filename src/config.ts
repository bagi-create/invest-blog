// サイト全体の設定。名前やSNSはここだけ変えればOK
export const SITE = {
  name: '資産形成ノート',
  tagline: '新NISA・iDeCo・インデックス投資を、根拠と数字でコツコツ。',
  description:
    '新NISA・iDeCo・投資信託・米国株・家計管理など、個人の資産形成に役立つ情報を根拠と数字で解説するブログです。',
  author: '運営者',
  lang: 'ja',
  locale: 'ja_JP',
  postsPerPage: 9,
  twitter: '', // 例: '@your_account'
};

export const NAV = [
  { href: '/', label: 'ホーム' },
  { href: '/category/nisa/', label: '新NISA' },
  { href: '/category/ideco/', label: 'iDeCo' },
  { href: '/category/fund/', label: '投資信託' },
  { href: '/category/us-stock/', label: '米国株' },
  { href: '/category/household/', label: '家計管理' },
];

export const FOOTER_LINKS = [
  { href: '/about/', label: '運営者情報' },
  { href: '/disclaimer/', label: '免責事項' },
  { href: '/privacy/', label: 'プライバシーポリシー' },
  { href: '/ad-policy/', label: '広告掲載について' },
  { href: '/rss.xml', label: 'RSS' },
];
