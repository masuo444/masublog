import { Client } from '@notionhq/client'
import type { 
  PageObjectResponse, 
  BlockObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'

// Notion公式クライアント
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID!

export interface NotionPost {
  id: string
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  categories: Array<{
    title: string
    slug: {
      current: string
    }
  }>
  tags: Array<{
    title: string
    slug: {
      current: string
    }
  }>
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
  }
  status?: string
}

// データベースから記事一覧を取得
export async function getAllNotionPosts(): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })

    const posts = await Promise.all(
      response.results.map(async (page) => {
        return await formatNotionPageToPost(page as PageObjectResponse)
      })
    )

    return posts.filter(post => post !== null) as NotionPost[]
  } catch (error) {
    console.error('Notion記事取得エラー:', error)
    return []
  }
}

// Notion記事を単体取得
export async function getNotionPostBySlug(slug: string): Promise<NotionPost | null> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug
            }
          },
          {
            property: 'Status',
            status: {
              equals: 'Published'
            }
          }
        ]
      }
    })

    if (response.results.length === 0) {
      return null
    }

    return await formatNotionPageToPost(response.results[0] as PageObjectResponse)
  } catch (error) {
    console.error('Notion記事取得エラー:', error)
    return null
  }
}

// カテゴリー別記事取得
export async function getNotionPostsByCategory(category: string): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            multi_select: {
              contains: category
            }
          },
          {
            property: 'Status',
            status: {
              equals: 'Published'
            }
          }
        ]
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })

    const posts = await Promise.all(
      response.results.map(async (page) => {
        return await formatNotionPageToPost(page as PageObjectResponse)
      })
    )

    return posts.filter(post => post !== null) as NotionPost[]
  } catch (error) {
    console.error('カテゴリー別記事取得エラー:', error)
    return []
  }
}

// タグ別記事取得
export async function getNotionPostsByTag(tag: string): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Tags',
            multi_select: {
              contains: tag
            }
          },
          {
            property: 'Status',
            status: {
              equals: 'Published'
            }
          }
        ]
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })

    const posts = await Promise.all(
      response.results.map(async (page) => {
        return await formatNotionPageToPost(page as PageObjectResponse)
      })
    )

    return posts.filter(post => post !== null) as NotionPost[]
  } catch (error) {
    console.error('タグ別記事取得エラー:', error)
    return []
  }
}

// 最新記事を取得
export async function getRecentNotionPosts(limit: number = 5): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ],
      page_size: limit
    })

    const posts = await Promise.all(
      response.results.map(async (page) => {
        return await formatNotionPageToPost(page as PageObjectResponse)
      })
    )

    return posts.filter(post => post !== null) as NotionPost[]
  } catch (error) {
    console.error('最新記事取得エラー:', error)
    return []
  }
}

// NotionページをPost形式に変換
async function formatNotionPageToPost(page: PageObjectResponse): Promise<NotionPost | null> {
  try {
    const properties = page.properties as Record<string, unknown>

    // タイトルを取得
    const title = getPropertyValue(properties.Title || properties.Name || properties.title) || '無題の記事'
    
    // スラッグを取得（なければタイトルから生成）
    const slug = getPropertyValue(properties.Slug || properties.slug) || createSlugFromTitle(title)
    
    // 日付を取得
    const publishedAt = getPropertyValue(properties.Date || properties.Published || properties.date) || new Date().toISOString()
    
    // カテゴリーを取得
    const categories = getMultiSelectValue(properties.Category || properties.Categories || properties.category).map(cat => ({
      title: cat,
      slug: { current: createSlugFromTitle(cat) }
    }))
    
    // タグを取得
    const tags = getMultiSelectValue(properties.Tags || properties.tags).map(tag => ({
      title: tag,
      slug: { current: createSlugFromTitle(tag) }
    }))

    // ページコンテンツを取得
    const content = await getPageContent(page.id)
    
    // 要約を生成
    const excerpt = generateExcerpt(content)

    // アイキャッチ画像を取得
    const featuredImage = getPageCover(page)

    return {
      id: page.id,
      _id: page.id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      categories,
      tags,
      publishedAt,
      updatedAt: page.last_edited_time,
      author: {
        name: 'まっすー'
      },
      status: getPropertyValue(properties.Status || properties.status) || undefined
    }
  } catch (error) {
    console.error('ページ変換エラー:', error)
    return null
  }
}

// プロパティ値を取得するヘルパー関数
function getPropertyValue(property: unknown): string | null {
  if (!property || typeof property !== 'object') return null
  
  const prop = property as Record<string, unknown>

  switch (prop.type) {
    case 'title':
      const titleData = prop.title as Array<{ plain_text: string }>
      return titleData?.[0]?.plain_text || null
    case 'rich_text':
      const richTextData = prop.rich_text as Array<{ plain_text: string }>
      return richTextData?.[0]?.plain_text || null
    case 'date':
      const dateData = prop.date as { start: string }
      return dateData?.start || null
    case 'select':
      const selectData = prop.select as { name: string }
      return selectData?.name || null
    case 'status':
      const statusData = prop.status as { name: string }
      return statusData?.name || null
    default:
      return null
  }
}

// Multi-select値を取得
function getMultiSelectValue(property: unknown): string[] {
  if (!property || typeof property !== 'object') return []
  const prop = property as Record<string, unknown>
  if (prop.type !== 'multi_select') return []
  const multiSelectData = prop.multi_select as Array<{ name: string }>
  return multiSelectData?.map((item) => item.name) || []
}

// タイトルからスラッグを生成
function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

// ページコンテンツを取得してHTMLに変換
async function getPageContent(pageId: string): Promise<string> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId
    })

    return await convertBlocksToHTML(response.results as BlockObjectResponse[])
  } catch (error) {
    console.error('コンテンツ取得エラー:', error)
    return '<p>コンテンツを取得できませんでした。</p>'
  }
}

// NotionブロックをHTMLに変換
async function convertBlocksToHTML(blocks: BlockObjectResponse[]): Promise<string> {
  const htmlBlocks: string[] = []

  for (const block of blocks) {
    const blockData = block as Record<string, unknown>
    
    switch (blockData.type) {
      case 'paragraph':
        const paragraphData = blockData.paragraph as { rich_text: RichTextItemResponse[] }
        const paragraphText = await formatRichText(paragraphData.rich_text)
        if (paragraphText.trim()) {
          htmlBlocks.push(`<p>${paragraphText}</p>`)
        }
        break

      case 'heading_1':
        const h1Data = blockData.heading_1 as { rich_text: RichTextItemResponse[] }
        htmlBlocks.push(`<h1>${await formatRichText(h1Data.rich_text)}</h1>`)
        break

      case 'heading_2':
        const h2Data = blockData.heading_2 as { rich_text: RichTextItemResponse[] }
        htmlBlocks.push(`<h2>${await formatRichText(h2Data.rich_text)}</h2>`)
        break

      case 'heading_3':
        const h3Data = blockData.heading_3 as { rich_text: RichTextItemResponse[] }
        htmlBlocks.push(`<h3>${await formatRichText(h3Data.rich_text)}</h3>`)
        break

      case 'bulleted_list_item':
        const bulletData = blockData.bulleted_list_item as { rich_text: RichTextItemResponse[] }
        htmlBlocks.push(`<li>${await formatRichText(bulletData.rich_text)}</li>`)
        break

      case 'numbered_list_item':
        const numberedData = blockData.numbered_list_item as { rich_text: RichTextItemResponse[] }
        htmlBlocks.push(`<li>${await formatRichText(numberedData.rich_text)}</li>`)
        break

      case 'image':
        const imageData = blockData.image as { caption: RichTextItemResponse[] }
        const imageUrl = getImageUrl(blockData.image)
        const caption = await formatRichText(imageData.caption || [])
        if (imageUrl) {
          htmlBlocks.push(`
            <figure class="my-8">
              <img src="${imageUrl}" alt="${caption || 'ブログ画像'}" class="w-full rounded-lg shadow-md" />
              ${caption ? `<figcaption class="text-center text-gray-600 mt-2 text-sm">${caption}</figcaption>` : ''}
            </figure>
          `)
        }
        break

      case 'quote':
        const quoteData = blockData.quote as { rich_text: RichTextItemResponse[] }
        htmlBlocks.push(`<blockquote class="border-l-4 border-orange-600 pl-4 italic my-4">${await formatRichText(quoteData.rich_text)}</blockquote>`)
        break

      case 'divider':
        htmlBlocks.push('<hr class="my-8 border-gray-300" />')
        break

      case 'child_page':
        const childPageData = blockData.child_page as { title: string }
        htmlBlocks.push(`
          <div class="my-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 class="text-lg font-semibold text-orange-700 mb-2">📄 サブページ</h4>
            <p class="text-orange-600">${childPageData.title}</p>
          </div>
        `)
        break

      case 'table_of_contents':
        htmlBlocks.push('<div class="my-6 p-4 bg-gray-50 border rounded-lg"><h4 class="font-semibold text-gray-700">📚 目次</h4><p class="text-gray-600 text-sm mt-2">この記事の目次が表示されます</p></div>')
        break

      default:
        // サポートされていないブロックタイプをログ出力
        console.log('サポートされていないブロックタイプ:', blockData.type)
        break
    }
  }

  return htmlBlocks.join('')
}

// リッチテキストをHTMLに変換
async function formatRichText(richText: RichTextItemResponse[]): Promise<string> {
  if (!richText || !Array.isArray(richText)) return ''

  return richText.map(text => {
    let formatted = text.plain_text

    if (text.annotations.bold) formatted = `<strong>${formatted}</strong>`
    if (text.annotations.italic) formatted = `<em>${formatted}</em>`
    if (text.annotations.strikethrough) formatted = `<del>${formatted}</del>`
    if (text.annotations.underline) formatted = `<u>${formatted}</u>`
    if (text.annotations.code) formatted = `<code class="bg-gray-100 px-1 rounded">${formatted}</code>`

    if (text.href) {
      formatted = `<a href="${text.href}" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:text-orange-700 underline">${formatted}</a>`
    }

    return formatted
  }).join('')
}

// 画像URLを取得
function getImageUrl(imageObject: unknown): string | null {
  if (!imageObject || typeof imageObject !== 'object') return null
  
  const image = imageObject as Record<string, unknown>
  
  if (image.type === 'file') {
    const fileData = image.file as { url?: string }
    return fileData?.url || null
  } else if (image.type === 'external') {
    const externalData = image.external as { url?: string }
    return externalData?.url || null
  }

  return null
}

// ページカバー画像を取得
function getPageCover(page: PageObjectResponse): { asset: { url: string }, alt?: string } | undefined {
  if (!page.cover) return undefined

  const url = getImageUrl(page.cover)
  if (!url) return undefined

  return {
    asset: { url },
    alt: 'ブログアイキャッチ画像'
  }
}

// コンテンツから要約を生成
function generateExcerpt(content: string): string {
  // HTMLタグを除去
  const textContent = content.replace(/<[^>]*>/g, '')
  // 最初の120文字を抽出
  const excerpt = textContent.substring(0, 120).trim()
  return excerpt ? excerpt + '...' : 'Notionから取得した記事です。'
}

// 指定されたページIDから単一ページを取得
export async function getNotionPageById(pageId: string): Promise<NotionPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId })
    
    if ('properties' in page) {
      return await formatNotionPageToPost(page as PageObjectResponse)
    }
    
    return null
  } catch (error) {
    console.error('Notion単一ページ取得エラー:', error)
    return null
  }
}

// 特定のページ（まっすーの記事）を取得
export async function getSpecificNotionPost(): Promise<NotionPost | null> {
  const SPECIFIC_PAGE_ID = 'bf974aff-d18f-44d7-97e9-b1838eb2222a'
  return await getNotionPageById(SPECIFIC_PAGE_ID)
}

// 記事検索
export async function searchNotionPosts(query: string): Promise<NotionPost[]> {
  try {
    const allPosts = await getAllNotionPosts()
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.categories.some(cat => cat.title.toLowerCase().includes(query.toLowerCase())) ||
      post.tags.some(tag => tag.title.toLowerCase().includes(query.toLowerCase()))
    )
  } catch (error) {
    console.error('記事検索エラー:', error)
    return []
  }
}

// カテゴリー一覧を取得
export async function getAllNotionCategories() {
  try {
    const posts = await getAllNotionPosts()
    const categoriesSet = new Set<string>()
    
    posts.forEach(post => {
      post.categories.forEach(category => {
        categoriesSet.add(category.title)
      })
    })

    return Array.from(categoriesSet).map(title => ({
      _id: createSlugFromTitle(title),
      title,
      slug: { current: createSlugFromTitle(title) },
      description: `${title}に関する記事一覧`
    }))
  } catch (error) {
    console.error('カテゴリー取得エラー:', error)
    return []
  }
}

// タグ一覧を取得
export async function getAllNotionTags() {
  try {
    const posts = await getAllNotionPosts()
    const tagsSet = new Set<string>()
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagsSet.add(tag.title)
      })
    })

    return Array.from(tagsSet).map(title => ({
      _id: createSlugFromTitle(title),
      title,
      slug: { current: createSlugFromTitle(title) }
    }))
  } catch (error) {
    console.error('タグ取得エラー:', error)
    return []
  }
}