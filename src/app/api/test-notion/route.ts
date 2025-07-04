import { NextRequest, NextResponse } from 'next/server'
import { getAmericaSpainActivityPosts } from '@/lib/notion'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Notion Test API ===')
    console.log('Environment variables:')
    console.log('NOTION_TOKEN:', process.env.NOTION_TOKEN ? 'Set' : 'Not set')
    console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID || 'Not set')
    
    const episodes = await getAmericaSpainActivityPosts()
    
    return NextResponse.json({
      success: true,
      episodeCount: episodes.length,
      episodes: episodes.slice(0, 5).map(ep => ({
        id: ep.id,
        title: ep.title,
        slug: ep.slug,
        excerpt: ep.excerpt.substring(0, 100) + '...'
      })),
      allTitles: episodes.map(ep => ep.title),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Notion test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      envCheck: {
        hasToken: !!process.env.NOTION_TOKEN,
        hasDatabaseId: !!process.env.NOTION_DATABASE_ID,
        tokenPrefix: process.env.NOTION_TOKEN?.substring(0, 10) + '...'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}