import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import RecentPosts from '@/components/RecentPosts'
import ContactSection from '@/components/ContactSection'
import { getRecentPosts } from '@/lib/queries'

// ISR設定: ホームページは120秒間キャッシュ
export const revalidate = 120

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
      <RecentPosts posts={recentPosts} />
      <ContactSection />
    </div>
  )
}
