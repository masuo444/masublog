import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getAllNotionPosts, getSpecificNotionPost } from '@/lib/notion'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret } = body
    
    // セキュリティチェック
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }
    
    console.log('Manual Notion refresh triggered')
    
    // Notionからデータを再取得してキャッシュを更新
    const [allPosts, specificPost] = await Promise.all([
      getAllNotionPosts(),
      getSpecificNotionPost()
    ])
    
    console.log(`Found ${allPosts.length} posts from database`)
    console.log(`Specific post: ${specificPost ? 'Found' : 'Not found'}`)
    
    // ページを再生成
    await Promise.all([
      revalidatePath('/', 'layout'),
      revalidatePath('/blog', 'page'),
      revalidatePath('/blog/[slug]', 'page'),
      revalidateTag('notion-posts'),
      revalidateTag('recent-posts')
    ])
    
    return NextResponse.json({
      success: true,
      message: 'Notion data refreshed successfully',
      postsCount: allPosts.length,
      hasSpecificPost: !!specificPost,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Notion refresh error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh Notion data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GETメソッドでも利用可能（クエリパラメータで認証）
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  
  try {
    // Notionデータの状況を確認
    const [allPosts, specificPost] = await Promise.all([
      getAllNotionPosts(),
      getSpecificNotionPost()
    ])
    
    // 軽量な再生成
    await Promise.all([
      revalidateTag('notion-posts'),
      revalidateTag('recent-posts')
    ])
    
    return NextResponse.json({
      success: true,
      message: 'Notion data checked and cache refreshed',
      postsCount: allPosts.length,
      hasSpecificPost: !!specificPost,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}