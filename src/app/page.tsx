import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ActivitySection from '@/components/ActivitySection'
import RecentPosts from '@/components/RecentPosts'
import ContactSection from '@/components/ContactSection'
import { getRecentPosts } from '@/lib/queries'

// ISR設定: ホームページは30秒間キャッシュ（デバッグ用）
export const revalidate = 30

export default async function Home() {
  let recentPosts = []
  
  try {
    recentPosts = await getRecentPosts(3)
  } catch {
    console.log('Sanity not configured yet, using dummy data')
  }

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ActivitySection />
      <RecentPosts posts={recentPosts} />
      <ContactSection />
    </div>
  )
}
