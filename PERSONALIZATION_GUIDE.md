# Personalisation Guide

All personalisation is done in **two files only**:

- `src/data/config.ts` — names, dates, messages, music
- `src/data/memories.ts` — timeline, gallery captions, reasons, future plans

---

## 1. Names

Open `src/data/config.ts`:

```ts
yourName: 'YOUR_NAME',        // ← Your name
girlfriendName: 'HER_NAME',   // ← Her name
```

Her name automatically appears in:
- The hero title
- The final closing message

---

## 2. Relationship Start Date

```ts
relationshipStartDate: 'YYYY-MM-DD',  // e.g. '2024-06-15'
```

This calculates the animated "Days Together" counter in the Stats section.

---

## 3. Hero & Closing Messages

```ts
heroSubtitle: 'This is not just a webpage.\n...',
finalMessage: 'Out of all the moments...',
finalClosingText: "Happy Girlfriend's Day, [HER_NAME].\n...",
```

Use `\n` for line breaks. `[HER_NAME]` is replaced automatically.

---

## 4. The Love Letter

```ts
loveLetter: `[PASTE YOUR PERSONAL LETTER HERE]

Every single day...`,
```

Replace everything between the backticks with your actual letter.
Use blank lines to create paragraph breaks.

---

## 5. Background Music

1. Place your music file at: `public/audio/your-song.mp3`
2. Update the config:

```ts
musicFile: '/audio/your-song.mp3',
```

Supported formats: MP3, OGG, WAV.
Music only starts after the user clicks "Open Your Surprise" — never before.

---

## 6. YouTube Video

```ts
youtubeVideoId: 'U1G_uGV-7sQ',  // Replace with your video ID
```

The video ID is the part after `?v=` in a YouTube URL, or the path segment in a YouTube Short.
Example: `https://youtu.be/dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

---

## 7. Timeline (Our Story)

Open `src/data/memories.ts` → edit the `timeline` array:

```ts
{
  id: 'tl-1',
  date: 'The Beginning',       // Date label shown on photo
  title: 'A Beautiful First',  // Card heading
  description: 'Your story here...',
  image: photos.roses,         // Which photo to use
  location: 'Optional location text',
},
```

Available photo keys (defined in `src/data/config.ts`):
```
kiss, restaurantUs, mirrorUs1, mirrorUs2, elevatorUs,
storeUs, sweetCafe, blowingKiss, pointing, byLake,
lobbyWalk, navyDress, spiderman, spidergwen, roses
```

---

## 8. Gallery Captions

Edit the `galleryPhotos` array in `src/data/memories.ts`:

```ts
{
  id: 'g-1',
  image: photos.kiss,
  title: 'Us',
  caption: 'Your custom caption here.',
  category: 'romantic',     // couple | portrait | outing | fun | romantic
  featured: true,           // shows ★ badge
},
```

---

## 9. Reasons I Love You

Edit the `loveReasons` array:

```ts
{
  id: 'r-1',
  title: 'Her smile',
  description: 'The way it lights up her whole face...',
  emoji: '✨',
},
```

Cards flip on tap to reveal the description. When all cards are revealed, a hidden message appears.

---

## 10. Future Plans

Edit the `futurePlans` array:

```ts
{
  id: 'fp-1',
  title: 'A trip to the mountains',
  description: 'Just us, no plans, somewhere beautiful.',
  emoji: '⛰️',
},
```

---

## 11. Relationship Stats

Edit `staticStats` in `src/data/memories.ts`. Stats with `isNumeric: true` and a number `value` get an animated counter. Others display as text.

---

## 12. Adding New Photos

1. Place the photo in `public/photos/`
2. Add a reference in `src/data/config.ts`:

```ts
export const photos = {
  // existing...
  newPhoto: p('your-new-photo.jpg'),
};
```

3. Use `photos.newPhoto` wherever you need it.

---

## 13. Entry Screen Text

```ts
entryLine1: 'A little surprise was made for someone special.',
entryLine2: 'August 1, 2026',
entryButtonText: 'Open Your Surprise',
loadingMessages: [
  'Collecting our memories…',
  'Preparing something special…',
  'Almost ready…',
],
```

---

## Easter Eggs

- **Click her name** (in the hero) → heart burst animation
- **Click the ❤️ heart** (in the hero) → heart burst animation
- **Reveal all "Reasons" cards** → hidden bonus message appears
- **Press 'L' key** (desktop) → secret love note popup
- **Click "Always ❤️"** (final section) → confetti + final reveal

---

## Pre-Launch Checklist

- [ ] Both names updated in `config.ts`
- [ ] Relationship start date set
- [ ] Love letter written and pasted
- [ ] Hero image looks good on mobile (vertical phone screen)
- [ ] Music file added and path updated
- [ ] YouTube video ID updated
- [ ] Timeline dates and descriptions personalised
- [ ] Gallery captions feel genuine
- [ ] Reasons cards written in your voice
- [ ] Future plans feel real to your relationship
- [ ] Closing text personalised
- [ ] Tested on your phone browser before sharing
