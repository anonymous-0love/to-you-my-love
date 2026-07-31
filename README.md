# A Little Surprise ❤️

A premium, emotionally engaging romantic webpage for **Girlfriend's Day — August 1, 2026**.
Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Production Build

```bash
npm run build
npm run preview   # preview locally before deploying
```

---

## Project Structure

```
src/
  components/        # Reusable UI components
  sections/          # Full-page sections (Hero, Gallery, etc.)
  data/
    config.ts        # ← EDIT THIS to personalise everything
    memories.ts      # ← EDIT THIS for timeline, gallery, reasons
    types.ts         # TypeScript interfaces
  hooks/             # useAudio, useScrollReveal
  utils/             # helpers
public/
  photos/            # Your photos (15 images)
  video/             # Your video
  audio/             # Place your music file here
```

---

## Personalisation

See **PERSONALIZATION_GUIDE.md** for step-by-step instructions on:
- Changing names
- Setting the relationship start date
- Editing the love letter
- Adding music
- Customising captions and memories

## Deployment

See **DEPLOYMENT_GUIDE.md** for instructions on deploying to Vercel, Netlify, and GitHub Pages.

---

## Privacy

- No analytics, trackers, or cookies.
- All media is served locally.
- The entry screen is decorative — not real security.
- For true privacy, use Vercel/Netlify password protection, or share the URL only directly.
- **Before pushing to a public Git repository**, uncomment the photo/video/audio lines in `.gitignore`.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Styling |
| Framer Motion 11 | Animations |
| Lucide React | Icons |
