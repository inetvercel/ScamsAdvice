# AI-Powered Scam News Workflow

Automated system to fetch scam news, rewrite with AI, and publish to Sanity CMS.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        News Sources                               │
│  • FTC Scam Alerts  • BBB Scam Tracker  • KrebsOnSecurity         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  GET /api/scam-news/fetch                                        │
│  → Fetches RSS feeds → Filters scam-related articles             │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  POST /api/scam-news/rewrite                                   │
│  → Sends to xAI Grok-4.3 (1M context, real-time web access)      │
│  → Returns: title, excerpt, content, tags, metaDescription       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  POST /api/scam-news/publish                                     │
│  → Creates Sanity post (draft or published)                      │
│  → Stores original source for attribution                        │
└─────────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Get xAI Grok API Key

1. Sign up at [console.x.ai](https://console.x.ai) or [x.ai](https://x.ai)
2. Create an API key
3. Add to `.env.local`:
   ```env
   XAI_API_KEY=xai-xxxxxxxxxxxx
   ```
   
**Model Used**: `grok-4.3`
- 1M token context window
- Real-time web search capability
- Excellent for current events and news analysis
- Strong writing with humor and engagement
- Non-hallucination rate optimized

### 2. Restart Dev Server

```bash
npm run dev
```

### 3. Access Admin UI

Visit: `http://localhost:3000/admin/scam-news`

### 4. Usage Workflow

**Manual Process:**
1. Click **"Fetch News"** → Loads latest scam articles
2. Review the fetched articles
3. Click either:
   - **"Create Drafts"** → Creates in Sanity as unpublished drafts
   - **"Auto-Publish"** → Publishes immediately (use with caution)
4. If drafts: Go to Sanity Studio to review and publish

**Automated (GitHub Actions):**
1. Deploy site to production
2. Set repository secrets:
   - `SANITY_API_TOKEN`
   - `XAI_API_KEY` (Grok-4.3)
   - `API_SECRET` (for authentication)
3. Workflow runs daily at 9 AM UTC
4. Creates drafts for human review

## API Endpoints

### GET `/api/scam-news/fetch`
Fetches and filters scam news from RSS feeds.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "articles": [
    {
      "title": "New Phishing Scam Targets...",
      "link": "https://ftc.gov/...",
      "pubDate": "2024-06-07",
      "content": "...",
      "source": "FTC Scam Alerts",
      "category": "ftc"
    }
  ]
}
```

### POST `/api/scam-news/rewrite`
Rewrites article with AI.

**Request:**
```json
{
  "title": "Original Title",
  "content": "Original content...",
  "source": "FTC",
  "link": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "rewritten": {
    "title": "New SEO Title",
    "excerpt": "150-char excerpt",
    "content": "Full article markdown",
    "tags": ["phishing", "email-scam"],
    "metaDescription": "SEO meta"
  }
}
```

### POST `/api/scam-news/publish`
Publishes to Sanity CMS.

**Request:**
```json
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "metaDescription": "...",
  "tags": ["..."],
  "originalSource": "FTC",
  "originalLink": "https://...",
  "status": "draft" | "published"
}
```

### POST `/api/scam-news/process`
Full pipeline: fetch → rewrite → publish.

**Request:**
```json
{
  "articles": [...],
  "autoPublish": false
}
```

## Ethical Guidelines

1. **Originality**: AI completely rewrites content (not just spinning)
2. **Attribution**: Original source always stored in `originalLink` field
3. **Accuracy**: Focus on patterns, not unverified individual claims
4. **Legal**: Use "alleged" language, avoid defamation
5. **Transparency**: Posts marked with `aiGenerated: true`

## Cost Estimate

- **xAI Grok-4.3**: ~$1.25/million input tokens, ~$2.50/million output tokens
  - Average article: ~500 tokens input, ~800 tokens output = ~$0.003 per rewrite
- **Sanity**: Free tier sufficient for daily posts
- **Daily cost**: ~$0.01 for 3 articles/day

## Troubleshooting

### "XAI_API_KEY not configured"
→ Add key to `.env.local` and restart server. Get key from console.x.ai

### "Failed to fetch RSS"
→ Some feeds may block requests; check console for errors

### "Duplicate article"
→ System checks by slug and original link; article already exists

### Images not showing
→ Upload images manually in Sanity Studio or use external URLs

## Next Steps

1. Test the workflow manually via admin UI
2. Set up production deployment
3. Configure GitHub Actions secrets
4. Monitor first few AI-generated posts for quality
5. Adjust AI prompt in `/api/scam-news/rewrite/route.ts` as needed
