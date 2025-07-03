import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret } = body

    // セキュリティチェック
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    console.log('🔧 Setting up Notion integration...')

    // 現在のサイトURL取得
    const siteUrl = process.env.NODE_ENV === 'production' 
      ? 'https://blog.fomus.jp' 
      : `https://${process.env.VERCEL_URL || 'masublog.vercel.app'}`

    const webhookUrl = `${siteUrl}/api/notion-webhook`

    const setupResults = {
      timestamp: new Date().toISOString(),
      siteUrl,
      webhookUrl,
      steps: {
        connectionTest: false,
        webhookSetup: false,
        integrationActive: false
      },
      errors: [] as string[],
      success: false
    }

    // Step 1: Notion接続テスト
    try {
      console.log('Step 1: Testing Notion connection...')
      
      const testResponse = await fetch('https://api.notion.com/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28'
        }
      })

      if (testResponse.ok) {
        setupResults.steps.connectionTest = true
        console.log('✅ Notion connection successful')
      } else {
        throw new Error(`Notion API error: ${testResponse.status}`)
      }
    } catch (error) {
      setupResults.errors.push(`Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('❌ Notion connection failed:', error)
    }

    // Step 2: Webhook URL検証
    try {
      console.log('Step 2: Validating webhook URL...')
      
      // 自分自身のWebhook エンドポイントをテスト
      const webhookTest = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'test',
          object: 'page',
          test: true
        })
      })

      if (webhookTest.ok) {
        setupResults.steps.webhookSetup = true
        console.log('✅ Webhook endpoint is accessible')
      } else {
        throw new Error(`Webhook test failed: ${webhookTest.status}`)
      }
    } catch (error) {
      setupResults.errors.push(`Webhook validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('❌ Webhook validation failed:', error)
    }

    // Step 3: 統合アクティベーション確認
    try {
      console.log('Step 3: Verifying integration activation...')
      
      // 特定ページアクセステスト
      const pageResponse = await fetch(`https://api.notion.com/v1/pages/bf974aff-d18f-44d7-97e9-b1838eb2222a`, {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28'
        }
      })

      if (pageResponse.ok) {
        setupResults.steps.integrationActive = true
        console.log('✅ Integration is active and page is accessible')
      } else {
        throw new Error(`Page access failed: ${pageResponse.status}`)
      }
    } catch (error) {
      setupResults.errors.push(`Integration activation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('❌ Integration activation failed:', error)
    }

    // 成功判定
    setupResults.success = Object.values(setupResults.steps).every(step => step === true)

    if (setupResults.success) {
      console.log('🎉 Notion integration setup completed successfully!')
      
      // 成功時の最終テスト: 実際にコンテンツを取得
      try {
        const { getAllNotionPosts, getSpecificNotionPost } = await import('@/lib/notion')
        const [allPosts, specificPost] = await Promise.all([
          getAllNotionPosts(),
          getSpecificNotionPost()
        ])
        
        setupResults.contentTest = {
          allPostsCount: allPosts.length,
          hasSpecificPost: !!specificPost,
          success: true
        }
      } catch (error) {
        setupResults.contentTest = {
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        }
      }
    } else {
      console.log('❌ Notion integration setup failed')
    }

    return NextResponse.json(setupResults, { 
      status: setupResults.success ? 200 : 500 
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      {
        error: 'Setup failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// GET: 統合状況確認
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const status = {
      timestamp: new Date().toISOString(),
      integration: {
        notionToken: !!process.env.NOTION_TOKEN,
        databaseId: !!process.env.NOTION_DATABASE_ID,
        webhookSecret: !!process.env.NOTION_WEBHOOK_SECRET,
        revalidateSecret: !!process.env.REVALIDATE_SECRET
      },
      connectivity: {
        notionApi: false,
        specificPage: false
      },
      ready: false
    }

    // Notion API接続確認
    if (status.integration.notionToken) {
      try {
        const response = await fetch('https://api.notion.com/v1/users/me', {
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28'
          }
        })
        status.connectivity.notionApi = response.ok
      } catch {
        status.connectivity.notionApi = false
      }
    }

    // 特定ページアクセス確認
    if (status.integration.databaseId) {
      try {
        const response = await fetch(`https://api.notion.com/v1/pages/bf974aff-d18f-44d7-97e9-b1838eb2222a`, {
          headers: {
            'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28'
          }
        })
        status.connectivity.specificPage = response.ok
      } catch {
        status.connectivity.specificPage = false
      }
    }

    // 全体準備状況
    status.ready = Object.values(status.integration).every(Boolean) && 
                   Object.values(status.connectivity).every(Boolean)

    return NextResponse.json(status)

  } catch (error) {
    return NextResponse.json(
      {
        error: 'Status check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}