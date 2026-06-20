# ScamsAdvice Content Pipeline

Automated content scraping, AI rewriting, and publishing system.

## Features

- **RSS Scraping** - Pulls scam alerts from FTC, Krebs on Security, etc.
- **AI Rewriting** - Rewrites content for your audience (no hallucinations)
- **Stock Images** - Auto-fetches relevant images from Unsplash
- **Sanity Publishing** - Publishes directly to your CMS

## Setup

### 1. Add API Keys to `.env.local`

```env
# AI Provider (choose one)
ANTHROPIC_API_KEY=sk-ant-...     # Recommended - best accuracy
OPENAI_API_KEY=sk-...            # Alternative
GOOGLE_API_KEY=...               # Alternative (free tier)

# Images
UNSPLASH_ACCESS_KEY=...          # Get at unsplash.com/developers

# CMS (already configured)
SANITY_API_TOKEN=...
NEXT_PUBLIC_SANITY_PROJECT_ID=kvgwr96i
```

### 2. Run the Pipeline

```bash
# Install ts-node if needed
npm install -g ts-node

# Run pipeline
npx ts-node scripts/content-pipeline/index.ts
```

## How It Works

```
[RSS Feeds] → [Scraper] → [AI Rewriter] → [Image Finder] → [Sanity CMS]
     ↓             ↓            ↓              ↓              ↓
   FTC.gov    Filter for    Rewrite for    Add stock      Publish as
   Krebs      scam-related  your audience  images         draft/review
   etc.       content       (facts only)
```

## Anti-Hallucination Rules

The AI is strictly instructed to:
1. ✅ Only use facts from the source article
2. ✅ Never invent statistics or claims
3. ✅ Preserve exact names, emails, URLs
4. ✅ Always cite the original source
5. ❌ Never add "creative" details

## Adding More Sources

Edit `scrapers/rss-scraper.ts` to add more RSS feeds:

```typescript
const SCAM_FEEDS = [
  {
    name: 'Your Source',
    url: 'https://example.com/feed.xml',
    category: 'fraud',
  },
  // ...
]
```

## Output

Articles are saved to:
- **Sanity CMS** - If `SANITY_API_TOKEN` is set
- **Local drafts** - Always saved to `drafts/scraped-YYYY-MM-DD.json`

## Scheduling (Optional)

Add to Vercel cron or GitHub Actions to run daily:

```yaml
# .github/workflows/content-pipeline.yml
name: Content Pipeline
on:
  schedule:
    - cron: '0 8 * * *'  # Daily at 8am UTC
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npx ts-node scripts/content-pipeline/index.ts
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}
```
