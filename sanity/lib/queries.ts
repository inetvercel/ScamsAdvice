import { groq } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && published == true] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  metaDescription,
  date,
  tags,
  "featuredImage": featuredImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  }
}`

export const postQuery = groq`*[_type == "post" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  metaDescription,
  date,
  tags,
  content,
  "featuredImage": featuredImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  }
}`

export const pagesQuery = groq`*[_type == "page" && published == true] {
  _id,
  title,
  "slug": slug.current,
  metaDescription
}`

export const pageQuery = groq`*[_type == "page" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  metaDescription,
  content,
  "featuredImage": featuredImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  }
}`
