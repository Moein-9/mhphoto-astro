# MH Photo Astro — Project Reference

**Read this file at the start of every session.**

---

## Project Info

- **Site:** https://mhphoto.ca
- **Owner:** Moein Habibi (Moe) — Edmonton wedding photographer & videographer
- **Email:** moein@mhphoto.ca (NO phone number anywhere — email only)
- **Directory:** `C:\Users\Moein-HQ\.local\bin\mhphoto-astro\`
- **GitHub:** `https://github.com/Moein-9/mhphoto-astro.git` (public repo)
- **Live URL:** https://mhphoto.ca
- **Old site:** WordPress on Hostinger (migrated to Astro on Vercel, Apr 4 2026)

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Astro 6.1.3 |
| CSS | Tailwind CSS v4 + `@tailwindcss/vite` 4.2.2 |
| Fonts | Montserrat (Google) + Canela (self-hosted OTF) |
| Blog | Astro Content Collections (glob loader), 91 markdown posts |
| Sitemap | `@astrojs/sitemap` 3.7.2 |
| RSS | `@astrojs/rss` 4.0.18 |
| Images | Sharp 0.34.5 |
| Contact | Resend serverless function (`api/contact.js`) |
| Hosting | Vercel (Hobby plan) |
| DNS | GoDaddy (.ca domain) |
| Email | Hostinger (MX, SPF, DKIM, DMARC) — DO NOT TOUCH email DNS records |
| Analytics | GA4 `G-78GJS9X3W8` |
| GSC | Verified for https://mhphoto.ca |

---

## Commands

```bash
npm run dev      # Astro dev server → localhost:4321
npm run build    # Build to dist/
npm run preview  # Preview production build
npx vercel --prod --yes  # Deploy to Vercel (ONLY when user says "deploy")
```

---

## Critical Rules

### 1. Local First — ALWAYS
Run `npm run dev` before any changes go live. Never deploy without local verification.

### 2. Never Push or Deploy Without Approval
- Do NOT run `git push` until the user says "push"
- Do NOT run `npx vercel --prod --yes` until the user says "deploy" or "go live"
- After making changes, say "ready to push/deploy when you say go" and wait

### 3. Never Publish Content Without Approval
No new pages, blog posts, or content changes go live without explicit user approval. Draft and present for review first.

### 4. No Phone Number
User does not want a phone number listed ANYWHERE on the site. Email only (moein@mhphoto.ca).

### 5. No Competing Photographer Links
External links only to venues, vendors, and resources (The Knot, WeddingWire, Fairmont, etc.). NEVER link to other photographers.

### 6. Indian Wedding Focus
This is the primary differentiator. Most content should lean Indian/Punjabi/Sikh wedding.

### 7. Warm Human Tone
Not corporate, not clinical. Like talking to a friend. "Currently booking 2026."

### 8. Session Summary Required
At the end of every work session, write a summary of what was done: what changed, what files were modified, what was deployed, any pending issues.

### 9. Commit Everything Before Ending
All changes committed (with user approval) before session ends. Descriptive commit messages.

---

## Directory Structure

```
mhphoto-astro/
├── api/
│   └── contact.js              # Vercel serverless (Resend email)
├── public/
│   ├── fonts/                   # Canela OTF files
│   ├── gallery-images/
│   │   ├── weddings/            # 89 images
│   │   ├── indian-weddings/     # 103 images
│   │   ├── family/              # 61 images
│   │   └── engagement/          # 20 images
│   ├── images/
│   │   ├── hero/                # 31 hero images
│   │   ├── categories/          # 5 category card images
│   │   ├── portfolio/           # Portfolio showcase
│   │   └── videography/         # Videography page frames
│   ├── og/                      # Open Graph images
│   ├── videos/                  # intro-hero.mp4, intro-portrait.mp4
│   ├── logo.png                 # Favicon + sidebar logo
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── gallery/MasonryGallery.astro  # CSS-columns masonry + skeleton + iOS lightbox
│   │   └── layout/
│   │       ├── Sidebar.astro             # Desktop nav (fixed, 262px)
│   │       ├── MobileNav.astro           # Mobile hamburger
│   │       └── GrainOverlay.astro        # Film grain texture
│   ├── content/blog/            # 91 markdown blog posts
│   ├── data/
│   │   ├── site.ts              # Site config, email, social, GA4 ID
│   │   ├── navigation.ts        # Nav arrays
│   │   ├── pricing.ts           # Public pricing (4 cards)
│   │   └── hidden-packages.ts   # Detailed pricing (noindex pages)
│   ├── layouts/BaseLayout.astro # HTML shell, GA4, OG, footer, scroll reveal
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── about.astro          # About Moein
│   │   ├── contact.astro        # Contact form → /api/contact
│   │   ├── pricing.astro        # Public pricing cards
│   │   ├── videography.astro    # 10 YouTube videos + VideoObject schema
│   │   ├── wedding-packages.astro    # Hidden pricing (noindex)
│   │   ├── multiday-packages.astro   # Hidden multi-day pricing (noindex)
│   │   ├── sitemap-images.xml.ts     # Image sitemap (304 images)
│   │   ├── photography/
│   │   │   ├── index.astro           # Photography landing
│   │   │   ├── weddings.astro        # Wedding gallery
│   │   │   ├── indian-weddings.astro # Indian wedding gallery
│   │   │   ├── family.astro          # Family gallery
│   │   │   └── engagement.astro      # Engagement gallery
│   │   └── blog/
│   │       ├── index.astro           # Blog listing (category filter, load-more)
│   │       ├── [slug].astro          # Blog post template
│   │       └── rss.xml.ts            # RSS feed
│   └── styles/global.css        # Tailwind, Canela @font-face, theme vars
├── astro.config.mjs             # 32 x 301 redirects, sitemap priorities, trailing slash
├── package.json
└── wp-posts.json                # WordPress export (gitignored)
```

---

## Credentials & APIs

### Vercel
- **Project ID:** `prj_ROLwdE1cGDyc5amtJKXmyPsbNYam`
- **Org/Team ID:** `team_hpu2FgR35daPkVr51slTgEYc`
- **Env var:** `RESEND_API_KEY` (Production only)

### Resend (Contact Form Email)
- **From:** `MH Photography <noreply@mhphoto.ca>`
- **Sends to:** `moein@mhphoto.ca` (notification) + auto-response to submitter
- **Domain:** mhphoto.ca (verified, DKIM/SPF records added)

### WordPress (old site — API still works)
- **WordPress user:** moein
- **WordPress app password:** 17Ff NIz4 bpia ymq3 dj2I 8hct
- **Hostinger API token:** YnTVOPuNC9eNQP85yaE2mKhNDEPNaGUdVbFjZ9JVec6a0142

### Google
- **GA4:** `G-78GJS9X3W8`
- **GSC:** Same Google account as Charm Optical
- **OAuth token:** `access_token.txt` (gitignored, expires frequently)

---

## DNS (GoDaddy)

- **A record:** `76.76.21.21` (Vercel)
- **CNAME www:** `cname.vercel-dns.com`
- **Email DNS (Hostinger):** MX, SPF, DKIM, DMARC — DO NOT TOUCH

---

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| cream | #F7F4F2 | Main background |
| cream-warm | #F3EFEB | Section backgrounds |
| cream-card | #EDEAE5 | Card backgrounds |
| ink | #1A1A1A | Primary text |
| ink-soft | #4A4541 | Secondary text |
| ink-muted | #8A8279 | Muted text |
| gold | #C9A86C | Accent, CTAs, hover |
| gold-deep | #A07A4A | Darker gold |
| frame | #0E0E0E | Photo frame backgrounds |

### Fonts
- **Headings:** Canela (serif) — editorial feel
- **Body:** Montserrat (sans) — readability

### Layout
- **Max width:** 1390px centered
- **Desktop:** Fixed sidebar (262px) + content (max 960px)
- **Mobile:** Fixed top nav (88px) + hamburger menu

---

## Key Features

### Gallery System
- CSS `columns` masonry (2 mobile, 3 desktop)
- Skeleton shimmer loading → reveal after ALL images loaded
- iOS-style lightbox: live drag swipe, slide transitions, rubber band, swipe-down close
- Images read from `public/gallery-images/{slug}/` at build time via `fs.readdirSync`
- 273 gallery images across 4 categories

### Blog
- 91 posts imported from WordPress
- Frontmatter `publishDate` for scheduled publishing (future dates filtered at build)
- Category filter pills, featured hero card, load-more (12 + 9 per click)
- Reading progress bar, drop cap, share buttons, related posts, author card
- RSS at `/blog/rss.xml`
- **Need Vercel cron for daily rebuilds (NOT set up yet)**

### Contact Form
- Submits to `/api/contact` (POST, JSON)
- Fields: name, email, sessionType, eventDate, message
- Success: modal popup with cream styling, backdrop blur
- Error: button shows "Error — try again"

### Pricing
- **Public:** `/pricing/` — Photography $2,250, Videography $3,750, Photo+Video $8,750, Family $400
- **Hidden (noindex, share-link only):** `/wedding-packages/`, `/multiday-packages/`

### Videography
- 10 YouTube videos (youtube-nocookie.com embeds)
- VideoObject JSON-LD schema for each

### SEO
- JSON-LD: PhotographyBusiness, BlogPosting, Service, VideoObject, BreadcrumbList, FAQPage, ContactPage
- Meta tags: title, description, canonical, OG, Twitter card
- Hreflang: en-CA, en, x-default
- 32 old WordPress URL → `/blog/slug/` 301 redirects
- Image sitemap: `/sitemap-images.xml` (304 images)
- robots.txt: hidden pricing pages disallowed

---

## SEO Status (as of April 3, 2026)

### The Problem
- **DR:** 1.3 (Google barely visits)
- **Organic traffic:** 0/month
- **Indexed pages:** Only 3 (homepage, videography, pricing)
- **Backlinks:** 109 referring domains — **103 are SPAM (94.5%)**
- **Service pages:** Never crawled by Google (indian-weddings, family, weddings, engagement)

### Disavow File
- **Location:** `C:\Users\Moein-HQ\.local\bin\mhphoto-disavow.txt`
- **Contains:** 103 spam domains to disavow
- **Status:** Needs to be submitted at https://search.google.com/search-console/disavow-links

### Target Keywords (Tier 1 — Quick Wins)
| Keyword | Volume | KD | Target Page |
|---------|--------|----|-------------|
| indian wedding photographer edmonton | 50-120 | 5-15 | `/photography/indian-weddings/` |
| south asian wedding photographer edmonton | 20-50 | 5-10 | `/photography/indian-weddings/` |
| punjabi wedding photographer edmonton | 10-20 | 0-5 | Blog post |
| affordable wedding photographer edmonton | 50-100 | 10-20 | NEW PAGE or pricing |
| elopement photographer edmonton | 50-100 | 10-20 | NEW PAGE |
| engagement photographer edmonton | 50-100 | 10-20 | `/photography/engagement/` |
| family mini sessions edmonton | 30-80 | 5-15 | NEW PAGE or family |
| wedding cinematography edmonton | 20-50 | 5-15 | `/videography/` |

### Target Keywords (Tier 2 — Medium-Term)
| Keyword | Volume | KD | Target Page |
|---------|--------|----|-------------|
| wedding photographer edmonton | 300-500 | 25-35 | `/photography/weddings/` |
| family photographer edmonton | 200-400 | 20-30 | `/photography/family/` |
| wedding videographer edmonton | 100-250 | 15-25 | `/videography/` |
| best wedding photographer edmonton | 80-150 | 20-30 | Homepage |

### What Still Needs Doing (SEO)

**User must do:**
- [ ] Get more Google reviews (target 25 in 6 months) — biggest local SEO lever
- [ ] Submit to wedding directories (WeddingWire.ca, The Knot, Maharani Weddings) for backlinks
- [x] Set up Google Business Profile — DONE (user confirmed)
- [x] DNS records for Resend email (SPF, DKIM, DMARC) — DONE Apr 5 2026

**Can do in future sessions:**
- [ ] Build new landing pages: `/wedding-photo-video-packages-edmonton/`, `/elopement-photographer-edmonton/`
- [ ] Build satellite city pages (Sherwood Park, St. Albert)
- [ ] Add 4 missing blog posts to calendar (photo+video bundle, affordable wedding, mini sessions x2)
- [ ] Page speed: convert gallery to Astro `<Image>` component for auto WebP/AVIF
- [ ] Create per-page OG images (currently all share `/og/home.jpg`)

---

## Related Files (Outside This Repo)

| File | What |
|------|------|
| `mhphoto-seo-master-plan.md` | Full SEO strategy with 6-phase timeline |
| `mhphoto-keyword-research-2026-04-03.md` | Keyword research data |
| `mhphoto-keyword-analysis-final.md` | Final keyword analysis |
| `mhphoto-competitor-serp-analysis-2026-04-03.md` | Competitor SERP analysis |
| `mhphoto-service-page-drafts.md` | Service page content drafts |
| `mhphoto-theme/` | Old WordPress site backup |
| `mhphoto-theme/CLAUDE.md` | Old WP site reference (60 blog posts, image alt text, schema, etc.) |

---

## Session: April 5, 2026 — Full SEO Audit Fix + Site Hardening

### Ahrefs Audit — Before vs After
| Issue | Before | After |
|-------|--------|-------|
| Broken images | 2,692 | 0 |
| HTTP/HTTPS mixed content | 1,540 | 0 |
| Missing alt text | 734 | 0 |
| Redirected images | 1,432 | 0 |
| Broken internal links | 103 | 0 |
| 404 pages | 80 | 6 (old WP URLs, not linked from site) |
| Oversized images | 100 | 0 |
| Title too long | 15 | 4 (borderline, keywords worth keeping) |
| Meta desc too long | 9 | 0 |
| Schema errors | 58 | 0 (verified via schema.org spec) |

### What Was Done

**Blog fixes (90+ files):**
- Removed 477 broken `wp-content/uploads` image references
- Assigned gallery images to all 91 posts by category (mehndi→mehndi, family→family, etc.)
- Fixed `/multidaypacakge/` typo in 24 files (36 occurrences)
- Fixed `/photo/` → `/photography/` path
- Removed links to future (unpublished) blog posts
- Added 350+ authoritative outbound links (venues, PPOC, The Knot, WeddingWire, Parks Canada, cultural orgs)
- Shortened 12 titles to ≤60 chars, 42 meta descriptions to ≤155 chars

**Schema fixes (9 pages):**
- Fixed JSON-LD on homepage, contact, videography, about, pricing, 4 gallery pages
- Province→AdministrativeArea, ContactPage→WebPage, added contentUrl on VideoObjects, author→creator on galleries

**Mobile crash fixes (9 issues):**
- Disabled YouTube iframe montage on mobile (infinite iframe spawning)
- Gallery: only wait for first 6 images, rest stay lazy (was loading all 103 at once)
- Unified duplicate lightbox touch handlers (race condition fix)
- Reduced backdrop blur on mobile (GPU crash prevention)
- Added requestAnimationFrame throttling to 3 scroll handlers
- Division by zero guard on blog progress bar
- Null checks in MobileNav and contact form
- IntersectionObserver fallback for old browsers

**Image optimization:**
- Compressed 50+ images total (biggest: 26MB→0.4MB, 5.2MB PNG→0.2MB JPG)
- Zero images remain over 1.5MB across entire site
- SEO-friendly alt text generation for non-descriptive filenames (rotates category-specific variations)
- Lightbox now propagates alt text from gallery images

**Font optimization:**
- Canela OTF→WOFF2 (774KB→224KB, 72% reduction)
- Montserrat trimmed from 8 weights to 5

**Contact form UX:**
- Icon-only social buttons (no overflow)
- Removed "Indian / South Asian Wedding" from dropdown
- Event date with "Not finalized yet" checkbox
- All fields sync to Resend email template

**Sitemap & Indexing:**
- Fixed sitemap-images.xml (added to sitemap-index.xml, robots.txt, XML headers)
- Daily cron rebuild for blog auto-publishing (vercel.json + api/cron-rebuild.js)
- Deploy hook created and env var set in Vercel
- Submitted 34 blog posts for indexing via Google Indexing API
- Resubmitted both sitemaps in GSC

**Content & SEO updates:**
- "Across Canada" language on all service pages, FAQs, schema, footer
- "Team" language for photo+video (not one-man show)
- Homepage: single H1 (sr-only), removed ARIA duplicate
- Removed competitor alt text from legacy blog post
- Scroll reveal flicker fix

**New content:**
- 4 Banff/Lake Minnewanka engagement photos (56MB→1.2MB)
- 3 Edmonton wedding photos (33MB→1MB)
- 4 Edmonton family photos (64MB→2.3MB)
- Image sitemap updated with all new images

**Infrastructure:**
- 404 page (matches site design, Vercel auto-serves)
- 301 redirect for `/multidaypacakge/` → `/multiday-packages/`
- Email DNS: SPF (amazonses.com), DKIM (resend._domainkey), DMARC, MX bounce handling
- Google OAuth token refreshed for GSC API access

### Indexing Status (Apr 5, 2026)
- 11 pages indexed (all main pages)
- 34 blog posts submitted via Indexing API (24-48hr processing)
- 57 future posts will auto-publish via daily cron rebuild
- Next scheduled post: `wedding-photographer-cost-edmonton-2026` on April 8, 2026

### SEO Audit Scores
- Full SEO audit: 88/100 (page speed is the remaining gap)
- Image alt audit: 86/100

---

## Git History

```
6b36658 Add 404 page — matches site design, links to home and portfolio
e317f09 Add 301 redirect for /multidaypacakge/ typo to /multiday-packages/
fd8ed0b Fix remaining Ahrefs issues: future post links, 20 oversized images compressed
c0b1938 Fix 33 blog meta descriptions to under 155 chars for SERP display
a1df032 Contact form UX, 350+ outbound links, Canada-wide, WOFF2 fonts, 11 new gallery images, SEO fixes
d5f910c Assign gallery images to all 91 blog posts by category
c0f7023 Ahrefs audit fix: broken images, schema, SEO, mobile crashes, image compression, sitemap, auto-publish
44fb218 Remove Formspree completely, Resend verified and ready
ff1433b Use noreply@mhphoto.ca as email sender
a05b1ee Replace Formspree with Resend — branded HTML emails + auto-response
de8386f Fix Formspree email fields, add auto-response
4a7103f iOS-style lightbox: live drag swipe, slide transitions, rubber band, swipe-down close
f37ac06 Gallery: skeleton stays until ALL images loaded + layout settled
f5d8c87 Gallery: skeleton shimmer until all images loaded, then reveal
525993d Gallery skeleton wireframe loading — shimmer placeholders until images load
45a66e7 Fix gallery column reflow — hide until images settled, then reveal
5728e46 Enhanced GA4 tracking + gallery staggered fade-in animation
d8df826 Fix markdown tables in 42 blog posts — prices, stats, comparisons
f4e6f1d Add premium table styling, fix markdown tables in blog posts
d023b54 Fix blog related posts crash, contact form modal popup, restore email DNS
00d2228 Blog redesign: premium editorial typography, progress bar, related posts
e8c4653 Initial commit: MH Photography Astro site with full SEO stack
```
