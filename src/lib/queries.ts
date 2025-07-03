import { client } from './sanity'
import { 
  getAllNotionPosts, 
  getNotionPostBySlug, 
  getNotionPostsByCategory, 
  getNotionPostsByTag,
  getRecentNotionPosts,
  getAllNotionCategories,
  getAllNotionTags,
  searchNotionPosts,
  getSpecificNotionPost
} from './notion'

export async function getAllPosts() {
  try {
    // まずNotionから記事を取得
    const notionPosts = await getAllNotionPosts()
    
    // 特定のページも取得して追加
    const specificPost = await getSpecificNotionPost()
    
    let allPosts = [...notionPosts]
    if (specificPost && !allPosts.find(post => post.id === specificPost.id)) {
      allPosts = [specificPost, ...allPosts]
    }
    
    if (allPosts.length > 0) {
      return allPosts
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        categories[]->{
          _id,
          title,
          slug
        },
        tags[]->{
          _id,
          title,
          slug
        },
        publishedAt,
        author->{
          _id,
          name,
          image {
            asset->{
              _id,
              url
            }
          }
        }
      }
    `)
  } catch (error) {
    console.log('記事取得エラー、ダミーデータを使用:', error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    // まずNotionから記事を取得
    const notionPost = await getNotionPostBySlug(slug)
    
    if (notionPost) {
      return notionPost
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        content,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        categories[]->{
          _id,
          title,
          slug
        },
        tags[]->{
          _id,
          title,
          slug
        },
        publishedAt,
        updatedAt,
        author->{
          _id,
          name,
          image {
            asset->{
              _id,
              url
            }
          },
          bio
        }
      }
    `, { slug })
  } catch (error) {
    console.log('個別記事取得エラー:', error)
    return null
  }
}

export async function getPostsByCategory(categorySlug: string) {
  try {
    // まずNotionから記事を取得
    const notionPosts = await getNotionPostsByCategory(categorySlug)
    
    if (notionPosts.length > 0) {
      return notionPosts
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        categories[]->{
          _id,
          title,
          slug
        },
        tags[]->{
          _id,
          title,
          slug
        },
        publishedAt,
        author->{
          _id,
          name,
          image {
            asset->{
              _id,
              url
            }
          }
        }
      }
    `, { categorySlug })
  } catch (error) {
    console.log('カテゴリー別記事取得エラー:', error)
    return []
  }
}

export async function getPostsByTag(tagSlug: string) {
  try {
    // まずNotionから記事を取得
    const notionPosts = await getNotionPostsByTag(tagSlug)
    
    if (notionPosts.length > 0) {
      return notionPosts
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "post" && references(*[_type == "tag" && slug.current == $tagSlug]._id)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        categories[]->{
          _id,
          title,
          slug
        },
        tags[]->{
          _id,
          title,
          slug
        },
        publishedAt,
        author->{
          _id,
          name,
          image {
            asset->{
              _id,
              url
            }
          }
        }
      }
    `, { tagSlug })
  } catch (error) {
    console.log('タグ別記事取得エラー:', error)
    return []
  }
}

export async function getAllCategories() {
  try {
    // まずNotionからカテゴリーを取得
    const notionCategories = await getAllNotionCategories()
    
    if (notionCategories.length > 0) {
      return notionCategories
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description
      }
    `)
  } catch (error) {
    console.log('カテゴリー取得エラー:', error)
    return []
  }
}

export async function getAllTags() {
  try {
    // まずNotionからタグを取得
    const notionTags = await getAllNotionTags()
    
    if (notionTags.length > 0) {
      return notionTags
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "tag"] | order(title asc) {
        _id,
        title,
        slug
      }
    `)
  } catch (error) {
    console.log('タグ取得エラー:', error)
    return []
  }
}

export async function searchPosts(query: string) {
  try {
    // まずNotionから検索
    const notionResults = await searchNotionPosts(query)
    
    if (notionResults.length > 0) {
      return notionResults
    }
    
    // Notionから取得できない場合はダミーデータを返す
    console.log('Search query:', query)
    return []
  } catch (error) {
    console.log('検索エラー:', error)
    return []
  }
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      _id,
      title,
      description,
      keywords,
      author->{
        _id,
        name,
        image {
          asset->{
            _id,
            url
          }
        },
        bio
      },
      socialLinks,
      seo {
        metaTitle,
        metaDescription,
        ogImage {
          asset->{
            _id,
            url
          }
        }
      }
    }
  `)
}

export async function getRecentPosts(limit: number = 5) {
  try {
    // まずNotionから記事を取得
    const notionPosts = await getRecentNotionPosts(limit)
    
    // 特定のページも取得して追加
    const specificPost = await getSpecificNotionPost()
    
    let allPosts = [...notionPosts]
    if (specificPost && !allPosts.find(post => post.id === specificPost.id)) {
      allPosts = [specificPost, ...allPosts]
    }
    
    // 日付順でソートして制限数まで取得
    const sortedPosts = allPosts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
    
    if (sortedPosts.length > 0) {
      return sortedPosts
    }
    
    // Notionから取得できない場合はSanityを試行
    return client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        excerpt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        categories[]->{
          _id,
          title,
          slug
        },
        publishedAt,
        author->{
          _id,
          name
        }
      }
    `)
  } catch (error) {
    console.log('最新記事取得エラー:', error)
    return []
  }
}