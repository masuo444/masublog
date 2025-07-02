import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import RecentPosts from '@/components/RecentPosts'
import ContactSection from '@/components/ContactSection'
import { getRecentPosts } from '@/lib/queries'

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
      <RecentPosts posts={recentPosts} />
      <ContactSection />
    </div>
  )
}
