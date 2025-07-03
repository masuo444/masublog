import type { Metadata } from "next";
import { Noto_Serif_JP, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WebsiteJsonLd, PersonJsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// エレガントな日本語セリフ体
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

// モダンなサンセリフ（英数字・UI要素用）
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// エレガントなディスプレイフォント（見出し用）
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "まっすー | FOMUS代表 - 写真家・アーティスト・AI講師・プロデューサー",
  description: "まっすー（FOMUS代表）の公式サイト。写真家・アーティスト・AI講師として、日本の伝統文化と現代テクノロジーを融合させた創作活動を展開。アイルランド・ドバイ・日本を拠点に国際的に活動中。",
  keywords: ["まっすー", "FOMUS", "写真家", "アーティスト", "AI講師", "プロデューサー", "枡", "日本文化", "アイルランド", "ドバイ"],
  authors: [{ name: "まっすー" }],
  openGraph: {
    title: "まっすー | FOMUS代表 - 写真家・アーティスト・AI講師・プロデューサー",
    description: "日本の伝統文化と現代テクノロジーを融合させた創作活動を展開。写真・AI・枡ブランディングを通じて価値創造をサポート。",
    type: "website",
    locale: "ja_JP",
    url: "https://masublog.vercel.app",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "まっすー プロフィール写真",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "まっすー | FOMUS代表",
    description: "日本の伝統文化と現代テクノロジーを融合させた創作活動を展開。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <WebsiteJsonLd />
        <PersonJsonLd />
      </head>
      <body className={`${notoSerifJP.variable} ${inter.variable} ${playfairDisplay.variable} font-serif antialiased`}>
        <GoogleAnalytics />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
