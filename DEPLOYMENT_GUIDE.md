# Deployment Guide

---

## Option A — Vercel (Recommended)

Vercel is the easiest option with the fastest global CDN.

### Steps

1. Create a free account at [vercel.com](https://vercel.com)
2. Install the CLI (optional):
   ```bash
   npm install -g vercel
   ```
3. From the project directory:
   ```bash
   vercel
   ```
   Or connect your GitHub repo in the Vercel dashboard.

4. Build settings (auto-detected):
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`

5. Your site is live at `https://your-project.vercel.app`

### Password Protection (Privacy)
In the Vercel dashboard → Project Settings → Password Protection.
This hides the site behind a password before she opens it.

---

## Option B — Netlify

1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder into the Netlify dashboard

OR:

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Password Protection
Netlify Pro has password protection built in.
Free alternative: use a random unguessable URL.

---

## Option C — GitHub Pages

GitHub Pages requires a `base` path adjustment when your repo name isn't at the root.

1. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',  // ← your GitHub repo name
   })
   ```

2. Install the deploy package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. In GitHub → repo Settings → Pages → set source to `gh-pages` branch.

**Note:** GitHub Pages repos are public by default. Keep photos private by using a private repo,
or exclude media via `.gitignore` and serve from a CDN.

---

## Privacy Recommendations

### What the entry screen does NOT do
The "Open Your Surprise" button is decorative. Anyone who has the URL can skip it by
scrolling or viewing page source. It is **not a password gate**.

### Actual privacy options

| Method | How |
|--------|-----|
| Keep URL secret | Don't share it publicly. Only send directly to her. |
| Vercel password protection | Settings → Password Protection (Vercel Pro) |
| Netlify password protection | Available on paid plans |
| Private GitHub + Vercel | Connect a private repo; site is still publicly accessible but source isn't |
| Exclude media from Git | Uncomment photo/video/audio lines in `.gitignore` |

### Recommended approach
1. Exclude `public/photos/`, `public/video/`, `public/audio/` from Git (`.gitignore`)
2. Deploy to Vercel or Netlify
3. Set a platform-level password
4. Send her the URL + password directly

---

## Custom Domain

If you want `surprise.yourdomain.com`:

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel/Netlify → Add custom domain
3. Add the DNS CNAME record your provider gives you

---

## Sharing Tips

- Test on your own phone first before sending
- Send the link right at midnight August 1 or when you're together
- If you're with her, set your phone screen brightness to max
- Consider starting music before handing her the phone (she'll see the music controls)
- The full emotional journey takes about 5-8 minutes to scroll through
