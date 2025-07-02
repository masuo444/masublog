import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: unknown
  featuredImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  categories: Category[]
  tags: Tag[]
  publishedAt: string
  updatedAt?: string
  author: Author
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Tag {
  _id: string
  title: string
  slug: {
    current: string
  }
}

export interface Author {
  _id: string
  name: string
  image?: {
    asset: {
      _ref: string
    }
  }
  bio?: string
}

export interface SiteSettings {
  _id: string
  title: string
  description: string
  keywords: string[]
  author: Author
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    ogImage?: {
      asset: {
        _ref: string
      }
    }
  }
}