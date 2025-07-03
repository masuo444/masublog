import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを解析
    const body = await request.json()
    
    console.log('Notion Webhook received:', body)
    
    // Notion Webhookの署名検証（セキュリティ）
    const notionSignature = request.headers.get('notion-signature')
    const webhookSecret = process.env.NOTION_WEBHOOK_SECRET
    
    if (webhookSecret && notionSignature) {
      // 署名検証のロジック（実装推奨）
      // const isValid = verifyNotionSignature(body, notionSignature, webhookSecret)
      // if (!isValid) {
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      // }
    }
    
    // Notionの変更イベントを処理
    if (body.type === 'page' || body.type === 'database') {
      // 関連するページを再生成
      await Promise.all([
        revalidatePath('/'),
        revalidatePath('/blog'),
        revalidatePath('/blog/[slug]', 'page'),
        revalidateTag('notion-posts')
      ])
      
      console.log('Pages revalidated successfully')
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Notion Webhook error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

// OPTIONSメソッドをサポート（CORS対応）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, notion-signature',
    },
  })
}

// 手動でのページ再生成をサポート
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  
  // セキュリティ: 秘密キーによる認証
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  try {
    // 全ページを再生成
    await Promise.all([
      revalidatePath('/'),
      revalidatePath('/blog'),
      revalidateTag('notion-posts')
    ])
    
    return NextResponse.json({ 
      revalidated: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        revalidated: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}