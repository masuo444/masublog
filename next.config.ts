import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR (Incremental Static Regeneration) を有効化
  experimental: {
    // 最新のNext.js機能を有効化
  },
  
  // 画像最適化設定
  images: {
    domains: [
      'localhost',
      'masublog.vercel.app',
      'blog.fomus.jp',
      'www.notion.so',
      'images.unsplash.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.notion.so',
        pathname: '/**',
      }
    ]
  },

  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/masublog/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ]
  },

  // ヘッダー設定
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
};

export default nextConfig;
