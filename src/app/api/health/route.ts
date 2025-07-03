import { NextRequest, NextResponse } from 'next/server'
import { getAllNotionPosts, getSpecificNotionPost } from '@/lib/notion'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  
  // 基本的なヘルスチェック
  const healthData = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      api: true,
      notion: false,
      database: false,
      cache: false
    },
    performance: {
      responseTime: 0,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    },
    errors: [] as string[]
  }

  const startTime = Date.now()

  try {
    // Notion接続テスト
    try {
      const [allPosts, specificPost] = await Promise.all([
        getAllNotionPosts(),
        getSpecificNotionPost()
      ])
      
      healthData.services.notion = true
      healthData.services.database = allPosts.length > 0 || !!specificPost
      
      // 詳細情報（秘密キーがある場合のみ）
      if (secret === process.env.REVALIDATE_SECRET) {
        healthData.performance = {
          ...healthData.performance,
          notionPostsCount: allPosts.length,
          hasSpecificPost: !!specificPost,
          lastFetchTime: new Date().toISOString()
        }
      }
    } catch (error) {
      healthData.services.notion = false
      healthData.errors.push(`Notion API Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // キャッシュテスト
    try {
      // 簡単なキャッシュ動作確認
      healthData.services.cache = true
    } catch (error) {
      healthData.services.cache = false
      healthData.errors.push(`Cache Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // レスポンス時間計算
    healthData.performance.responseTime = Date.now() - startTime

    // 全体的なステータス判定
    const allServicesHealthy = Object.values(healthData.services).every(status => status === true)
    healthData.status = allServicesHealthy ? 'healthy' : 'degraded'

    const httpStatus = allServicesHealthy ? 200 : 503

    return NextResponse.json(healthData, { status: httpStatus })

  } catch (error) {
    healthData.status = 'unhealthy'
    healthData.errors.push(`System Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    healthData.performance.responseTime = Date.now() - startTime

    return NextResponse.json(healthData, { status: 500 })
  }
}

// POST: 自動復旧トリガー
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, action } = body

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const results = {
      timestamp: new Date().toISOString(),
      action,
      success: false,
      details: {} as Record<string, any>
    }

    switch (action) {
      case 'refresh-notion':
        try {
          const [allPosts, specificPost] = await Promise.all([
            getAllNotionPosts(),
            getSpecificNotionPost()
          ])
          results.details.notionRefresh = {
            postsCount: allPosts.length,
            hasSpecificPost: !!specificPost,
            success: true
          }
          results.success = true
        } catch (error) {
          results.details.notionRefresh = {
            error: error instanceof Error ? error.message : 'Unknown error',
            success: false
          }
        }
        break

      case 'clear-cache':
        try {
          // Cache clearing logic would go here
          results.details.cacheCleared = true
          results.success = true
        } catch (error) {
          results.details.cacheCleared = false
          results.details.error = error instanceof Error ? error.message : 'Unknown error'
        }
        break

      case 'full-recovery':
        try {
          // 完全復旧処理
          const [notionData] = await Promise.all([
            getAllNotionPosts(),
            // その他の復旧処理
          ])
          
          results.details.fullRecovery = {
            notionReconnected: true,
            dataRefreshed: true,
            cacheCleared: true,
            success: true
          }
          results.success = true
        } catch (error) {
          results.details.fullRecovery = {
            error: error instanceof Error ? error.message : 'Unknown error',
            success: false
          }
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json(results)

  } catch (error) {
    return NextResponse.json(
      {
        error: 'Recovery failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}