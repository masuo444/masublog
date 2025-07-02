import { client } from './sanity'

export async function getAllPosts() {
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
}

export async function getPostBySlug(slug: string) {
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
}

export async function getPostsByCategory(categorySlug: string) {
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
}

export async function getPostsByTag(tagSlug: string) {
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
}

export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `)
}

export async function getAllTags() {
  return client.fetch(`
    *[_type == "tag"] | order(title asc) {
      _id,
      title,
      slug
    }
  `)
}

export async function searchPosts(query: string) {
  // 実際のSanity実装時にはここでクエリを実行
  // 今はダミーデータを返す
  console.log('Search query:', query)
  return []
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
}