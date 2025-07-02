export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  categories: Category[]
  tags?: Tag[]
  publishedAt: string
  author: {
    name: string
  }
}

export interface Category {
  title: string
  slug: {
    current: string
  }
  _id?: string
  description?: string
}

export interface Tag {
  title: string
  slug: {
    current: string
  }
}