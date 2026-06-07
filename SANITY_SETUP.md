# Sanity CMS Setup Guide

This project now supports Sanity as a headless CMS for managing content.

## Quick Start

### 1. Create a Sanity Project

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Log in to Sanity
sanity login

# Create a new project
sanity init --coupon STREAM2024
```

Or manually create a project at https://www.sanity.io/manage

### 2. Configure Environment Variables

Edit `.env.local` and add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_with_write_access
```

Get your API token from: https://www.sanity.io/manage/personal/project_id/api#tokens

### 3. Deploy Sanity Studio (Optional)

To use Sanity Studio for content editing:

```bash
# Create a studio app
mkdir -p apps/studio
cd apps/studio
sanity init --template clean

# Or use the embedded studio
npx sanity deploy
```

Or access the hosted studio at:
`https://your_project_id.sanity.studio/`

### 4. Import Existing Content

```bash
# Set your API token
$env:SANITY_API_TOKEN="your_token"
$env:NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"

# Run the migration
npx ts-node scripts/migrate-to-sanity.ts
```

### 5. Enable Sanity in Your Code

To start using Sanity data instead of static data:

1. Uncomment the Sanity fetch functions in `lib/posts.ts`
2. Update page components to use async data fetching

Example for `app/page.tsx`:

```tsx
import { fetchPostsFromSanity } from '@/lib/posts'

export default async function HomePage() {
  const posts = await fetchPostsFromSanity()
  // ... rest of component
}
```

Example for `app/[slug]/page.tsx`:

```tsx
import { fetchPostFromSanity, fetchPageFromSanity } from '@/lib/posts'

export default async function PostPage({ params }: Props) {
  const post = await fetchPostFromSanity(params.slug)
  if (!post) {
    const page = await fetchPageFromSanity(params.slug)
    if (!page) notFound()
    // render page
  }
  // render post
}
```

## Sanity Schema Overview

### Post Schema
- **title** (string, required) - Post title
- **slug** (slug, required) - URL-friendly identifier
- **excerpt** (text) - Short description for previews
- **metaDescription** (text) - SEO meta description
- **content** (portable text) - Rich text content with images
- **featuredImage** (image) - Main post image
- **date** (date, required) - Publication date
- **tags** (array of strings) - Categories/keywords
- **published** (boolean) - Draft/published status

### Page Schema
- **title** (string, required) - Page title
- **slug** (slug, required) - URL-friendly identifier
- **metaDescription** (text) - SEO meta description
- **content** (portable text) - Rich text content
- **featuredImage** (image) - Page header image
- **published** (boolean) - Draft/published status

## Architecture

```
sanity/
├── client.ts          # Sanity client configuration
├── schemas/
│   ├── index.ts       # Schema exports
│   ├── post.ts        # Post schema definition
│   └── page.ts        # Page schema definition
└── lib/
    ├── queries.ts     # GROQ queries
    └── image.ts       # Image URL builder
```

## Using Sanity Images

```tsx
import { urlFor } from '@/sanity/lib/image'

// In your component
<img src={urlFor(post.featuredImage).width(800).url()} />
```

## Local Development

The static data in `lib/posts.ts` remains as a fallback. To switch between sources:

1. **Static data** (default): Uses hardcoded posts and pages
2. **Sanity data**: Uncomment and use the `fetch*FromSanity()` functions

## Production Considerations

1. **CDN**: Set `useCdn: true` in `sanity/client.ts` for production
2. **Revalidation**: Add ISR revalidation to pages for fresh content
3. **Webhooks**: Set up Sanity webhooks to trigger rebuilds on content changes
4. **Preview Mode**: Implement preview mode for draft content

## Troubleshooting

### CORS Errors
Add your domain to Sanity CORS settings:
https://www.sanity.io/manage/personal/project_id/api#cors

### Missing Content
Ensure:
- `published` is set to `true` in Sanity documents
- Dataset name matches (production/staging)
- API token has read permissions

### Image Issues
Verify image pipeline is enabled in Sanity:
Project Settings → API → Image Pipeline
