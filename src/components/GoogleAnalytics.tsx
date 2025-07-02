'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Google Analytics スクリプトを動的に読み込み
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `
    document.head.appendChild(script2)

    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [GA_MEASUREMENT_ID])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return

    // ページビューを追跡
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
    })
  }, [pathname, GA_MEASUREMENT_ID])

  return null
}

// イベント追跡用のヘルパー関数
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  
  if (!GA_MEASUREMENT_ID || !window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// よく使用されるイベント追跡
export const analytics = {
  // ページビューを手動で追跡
  pageView: (url: string) => {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    if (!GA_MEASUREMENT_ID || !window.gtag) return
    
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  },

  // 記事の閲覧を追跡
  viewPost: (postTitle: string, postCategory: string) => {
    trackEvent('view_post', 'engagement', postTitle)
    trackEvent('view_category', 'engagement', postCategory)
  },

  // 検索の実行を追跡
  search: (searchTerm: string, resultCount: number) => {
    trackEvent('search', 'engagement', searchTerm, resultCount)
  },

  // 外部リンクのクリックを追跡
  externalLink: (url: string) => {
    trackEvent('click_external_link', 'engagement', url)
  },

  // お問い合わせフォームの送信を追跡
  contactSubmit: (formType: string) => {
    trackEvent('contact_submit', 'conversion', formType)
  },

  // SNSシェアを追跡
  share: (platform: string, content: string) => {
    trackEvent('share', 'social', `${platform}_${content}`)
  },

  // ダウンロードを追跡
  download: (fileName: string) => {
    trackEvent('download', 'engagement', fileName)
  },
}