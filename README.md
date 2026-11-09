# Varshith Triparna — Portfolio

Cinematic portfolio for **Varshith Triparna**: Visual Artist | Creative Editor | AI Filmmaker | Graphic Designer.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, React Three Fiber + Drei (hero monogram only), Motion, and Lucide icons.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # optional, see "Enquiry form"
pnpm dev                     # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local development server |
| `pnpm build` | Production build (type-checks and prerenders every page) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `npx tsc --noEmit` | Type check (run `npx next typegen` first on a fresh clone) |

Requires Node.js 20.9+ and pnpm 10.

## Project structure

```
src/
  app/                    Routes: / , /work , /work/[slug] , /services , 404, sitemap, robots, OG image
    actions/contact.ts    Server Action for the enquiry form
  content/
    site.ts               Name, taglines, contact links, WhatsApp toggle, tools, showreel
    projects.ts           All portfolio projects and case-study content
    services.ts           Service cards, full services breakdown, enquiry form options
  components/
    brand/                VT monogram (SVG) + shared geometry used by the 3D scene
    three/                Hero 3D monogram (lazy-loaded, WebGL fallback, pauses offscreen)
    sections/             Homepage sections
    work/                 Project cards and filterable gallery
    media/                Artwork (with placeholders), lightbox, YouTube embed, video player
    contact/              Enquiry form
    layout/               Header, footer, intro sequence
    ui/                   Buttons, headings, reveal, tilt card, quote links
  lib/
    assets.ts             Build-time image detection and dimension reading
    enquiry.ts            Shared form validation
public/images/            branding/ profile/ posters/ projects/ thumbnails/
```

## Asset manifest

Images are detected at build time. **Drop a file at the expected path and rebuild — it replaces the placeholder automatically.** `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` are all accepted for the same base name, and the real pixel size is read from the file so artwork is never cropped.

| File | Status | Used in |
| --- | --- | --- |
| `public/images/branding/vt-logo-flat.svg` | ✅ included | Flat chrome monogram, transparent background |
| `public/images/branding/vt-logo-horizontal.svg` | ✅ included | Horizontal lockup with full name |
| `public/images/branding/vt-icon.svg` (also `src/app/icon.svg`) | ✅ included | Favicon / social avatar |
| `public/images/branding/vt-logo-overlay.svg` | ✅ included | White monogram for video overlays |
| 3D logo | ✅ real-time | Rendered live in the hero (React Three Fiber) |
| `public/images/posters/terachapa-poster-01.jpg` | ❌ **missing** | Terachapa cover + gallery |
| `public/images/posters/terachapa-poster-02.jpg` | ❌ **missing** | Terachapa gallery |
| `public/images/posters/terachapa-poster-03.jpg` | ❌ **missing** | Terachapa gallery (delete the entry in `projects.ts` if there are only two) |
| `public/images/profile/varshith-portrait.webp` | ❌ **missing** | About section |
| `public/images/projects/<slug>/cover.jpg` | ❌ placeholders | Template project slots |
| Showreel video / YouTube ID | ❌ **missing** | Showreel section |

Recommended export sizes: posters 1600–2400 px on the long edge (JPG quality ~85 or WebP); portrait ~1600 px tall. Next.js serves optimised AVIF/WebP automatically. Never remove production credits, logos or watermarks from source artwork.

## Updating content

### Add or edit a project

Edit `src/content/projects.ts`. Each project gets a card in the gallery and a case-study page at `/work/<slug>`:

```ts
{
  slug: "my-project",
  title: "My Project",
  subtitle: "Logo Animation",
  categories: ["Motion Graphics & Logo Animation"],
  date: "1 May 2026",
  role: "…", tools: ["…"],
  summary: "One or two sentences.",
  overview: ["Paragraph…"],
  cover: { type: "image", src: "/images/projects/my-project/cover.jpg", alt: "…", width: 1920, height: 1080 },
  gallery: [
    { type: "image", src: "/images/projects/my-project/01.jpg", alt: "…", width: 1080, height: 1350 },
    { type: "youtube", youtubeId: "VIDEO_ID", title: "Final edit" },
  ],
}
```

Sections with no data (process, credits, etc.) are hidden automatically. Only add verified projects.

**Template slots:** entries with `placeholder: true` are labelled placeholders so the gallery filters have something to show. Replace them with real projects, or set `showPlaceholderProjects = false` at the top of `projects.ts` to hide them all.

### Services, tools, contact

- `src/content/services.ts` — delete any service or line item you don't offer.
- `src/content/site.ts`
  - `tools` — only entries with `confirmed: true` appear in the About section.
  - `contact.showWhatsApp` — set to `true` to publish the WhatsApp link (+91 6300543772). Hidden by default until approved.
  - `showreel` — set `src` (e.g. `/videos/showreel.mp4`, compressed H.264, ideally under ~20 MB) or `youtubeId`. Large videos are better hosted on YouTube.
  - `driveUrl` — the Google Drive folder opened by "View All My Works". Make sure the folder is shared as "Anyone with the link can view".

## Enquiry form

The form validates input on the client and the server, and has spam protection (hidden honeypot field, minimum time-to-fill, and a per-instance rate limit).

- **Without configuration** it never pretends to send: after validation it tells the visitor that direct sending isn't enabled and offers a pre-filled "Send via email app" button addressed to `Varshithtriparna12@gmail.com`.
- **To enable direct delivery**, create a free [Resend](https://resend.com) account, verify a sending domain, then set:

```
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Portfolio <enquiries@your-domain.com>
CONTACT_TO_EMAIL=Varshithtriparna12@gmail.com
```

Enquiries arrive with the client's address as reply-to.

## Deploying to Vercel (free tier)

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), import the repository. The framework is detected as Next.js; keep the default build settings.
3. Add environment variables (Project → Settings → Environment Variables): `NEXT_PUBLIC_SITE_URL` (your final URL), plus the optional Resend variables.
4. Deploy. Every push to the main branch redeploys automatically.

### Connecting a custom domain

1. Vercel → Project → Settings → Domains → add `yourdomain.com` (and `www.yourdomain.com`).
2. At your domain registrar, add the DNS records Vercel shows (typically an `A` record for the apex domain and a `CNAME` for `www`).
3. Wait for DNS to propagate (minutes to a few hours); Vercel issues HTTPS automatically.
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy so canonical URLs, sitemap and social previews use it.

## Accessibility & performance notes

- Intro sequence: CSS-only, ~2.5 s, skippable (click / Esc), shown once per session, disabled for reduced motion.
- 3D: loaded lazily after first paint over an SVG fallback; not rendered without WebGL; render loop pauses when offscreen or the tab is hidden; still pose under reduced motion; lower DPR and fewer particles on mobile/touch.
- Tilt effects only on fine pointers; nothing is hover-only.
- Keyboard: skip link, focus-visible styles, focus-trapped mobile menu (Esc closes), native `<dialog>` lightbox with arrow-key navigation and focus return.
