import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WebsiteJsonLd, PersonJsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FOMUS まっすー | 公式サイト",
  description: "クリエイター・起業家 FOMUS まっすーの公式サイトです。最新の活動情報やブログを発信しています。",
  keywords: ["FOMUS", "まっすー", "クリエイター", "起業家", "ブログ"],
  authors: [{ name: "FOMUS まっすー" }],
  openGraph: {
    title: "FOMUS まっすー | 公式サイト",
    description: "クリエイター・起業家 FOMUS まっすーの公式サイトです。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOMUS まっすー | 公式サイト",
    description: "クリエイター・起業家 FOMUS まっすーの公式サイトです。",
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
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
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
