interface JsonLdProps {
  data: object
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ブログ記事用の構造化データ
export function BlogPostJsonLd({ post }: { post: { title: string, excerpt: string, featuredImage?: { asset?: { url: string } }, author: { name: string }, publishedAt: string, updatedAt?: string, slug: { current: string } } }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.asset?.url,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FOMUS まっすー',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fomus-masuo.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fomus-masuo.com/blog/${post.slug.current}`,
    },
  }

  return <JsonLd data={structuredData} />
}

// 人物用の構造化データ
export function PersonJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'FOMUS まっすー',
    jobTitle: 'クリエイター・起業家',
    description: 'クリエイター・起業家として様々なプロジェクトに挑戦し、ビジネス、テクノロジー、ライフスタイルについて発信しています。',
    url: 'https://fomus-masuo.com',
    image: 'https://fomus-masuo.com/profile-image.jpg',
    sameAs: [
      'https://twitter.com/fomus_masuo',
      'https://instagram.com/fomus_masuo',
      'https://youtube.com/@fomus_masuo',
      'https://linkedin.com/in/fomus-masuo',
    ],
  }

  return <JsonLd data={structuredData} />
}

// ウェブサイト用の構造化データ
export function WebsiteJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FOMUS まっすー | 公式サイト',
    description: 'クリエイター・起業家 FOMUS まっすーの公式サイトです。最新の活動情報やブログを発信しています。',
    url: 'https://fomus-masuo.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://fomus-masuo.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={structuredData} />
}