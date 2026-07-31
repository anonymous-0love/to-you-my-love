import type { LoveStoryConfig } from './types';

// ─── Photo path helper ────────────────────────────────────────────────────────
// import.meta.env.BASE_URL = '/' in dev, '/to-you-my-love/' on GitHub Pages
const BASE = import.meta.env.BASE_URL;
const p = (filename: string) =>
  `${BASE}photos/${encodeURIComponent(filename)}`;

// ─── Photo references ─────────────────────────────────────────────────────────
export const photos = {
  // Most romantic — the hero image
  kiss:           p('WhatsApp Image 2026-07-31 at 11.05.47 PM.jpeg'),
  // Couple together
  restaurantUs:   p('WhatsApp Image 2026-07-31 at 10.53.30 PM (6).jpeg'),
  mirrorUs1:      p('WhatsApp Image 2026-07-31 at 10.53.29 PM.jpeg'),
  mirrorUs2:      p('WhatsApp Image 2026-07-31 at 10.53.30 PM (7).jpeg'),
  elevatorUs:     p('WhatsApp Image 2026-07-31 at 10.53.30 PM (8).jpeg'),
  storeUs:        p('WhatsApp Image 2026-07-31 at 10.53.30 PM (10).jpeg'),
  sweetCafe:      p('WhatsApp Image 2026-07-31 at 10.53.30 PM (12).jpeg'),
  // Her portraits
  blowingKiss:    p('WhatsApp Image 2026-07-31 at 10.53.30 PM (2).jpeg'),
  pointing:       p('WhatsApp Image 2026-07-31 at 10.53.30 PM (3).jpeg'),
  byLake:         p('WhatsApp Image 2026-07-31 at 10.53.30 PM (5).jpeg'),
  lobbyWalk:      p('WhatsApp Image 2026-07-31 at 10.53.30 PM (9).jpeg'),
  navyDress:      p('WhatsApp Image 2026-07-31 at 10.53.30 PM (11).jpeg'),
  // Fun / candid
  spiderman:      p('WhatsApp Image 2026-07-31 at 10.53.30 PM.jpeg'),
  spidergwen:     p('WhatsApp Image 2026-07-31 at 10.53.30 PM (1).jpeg'),
  // Romantic detail
  roses:          p('WhatsApp Image 2026-07-31 at 10.53.30 PM (4).jpeg'),
};

// ─── Video reference ──────────────────────────────────────────────────────────
export const localVideo = `${BASE}video/${encodeURIComponent(
  'WhatsApp Video 2026-07-31 at 11.05.15 PM.mp4'
)}`;

// ─── Master configuration ─────────────────────────────────────────────────────
// Edit ONLY this file to personalise the entire website.
export const config: LoveStoryConfig = {
  // ── Names ──────────────────────────────────────────────────────────────────
  yourName: 'Sairaj',               // ← Replace with your name
  girlfriendName: 'Srija',          // ← Replace with her name

  // ── Dates ──────────────────────────────────────────────────────────────────
  // The day your relationship began — used to calculate days together.
  relationshipStartDate: '2014-11-15', // ← Replace e.g. '2024-06-15'

  // ── Hero section ───────────────────────────────────────────────────────────
  heroTitle: "Happy Girlfriend's Day",
  heroSubtitle:
    'This is not just a webpage.\nIt is a small collection of reasons\nwhy you mean so much to me.',
  heroImage: photos.kiss,

  // ── Final section ──────────────────────────────────────────────────────────
  finalPhoto: photos.restaurantUs,
  finalMessage:
    'Out of all the moments life could have given me,\nI am grateful that it gave me you.',
  finalClosingText: "Happy Girlfriend's Day, [HER_NAME].\nYou are my favourite part of every story.",

  // ── Music ──────────────────────────────────────────────────────────────────
  // Place your audio file at public/audio/our-song.mp3 and update below.
  musicFile: `${BASE}audio/our-song.mp3`,

  // ── Love letter ────────────────────────────────────────────────────────────
  loveLetter: `My dearest Love,

Nearly twelve years is a long time. Long enough to know your exact expression when something genuinely surprises you. Long enough to know which café you'll want to go to before you've said it out loud. Long enough to stop needing to explain yourself — because the other person already understands.

And yet, somehow, I still find new things to notice about you.

The way you look leaning against a railing by the water, the world behind you going completely unnoticed because you're smiling at something I said. The way you walk into a room with sunglasses on and don't even realise how much you own it. The way you hold up a phone at a restaurant, frame a Spider-Gwen face perfectly, and think it's the funniest thing — and then it actually is, because you're so genuinely in it.

These aren't grand things. They're just you. But they add up to something I can't imagine my life without.

I'm not always good at saying this out loud, so I'm saying it here: you are one of the best things that has ever happened to me. Not just once. Not just on the easy days. On all of them. On the days we're wandering through stores taking mirror selfies and going nowhere in particular. On the days that feel like nothing. Those days are something, because you're there.

Thank you for still being here, nearly twelve years in. Thank you for being my favourite person to sit across from at dinner. Thank you for the roses, the long drives, the dessert cafes, and every ordinary afternoon that somehow always ends up feeling like exactly where I want to be.

Thank you for being you — curious and warm and funnier than you probably realise.

Happy Girlfriend's Day, Pottoda.`,

  // ── Video section ──────────────────────────────────────────────────────────
  youtubeVideoId: 'nyuo9-OjNNg',       // YouTube video/short ID
  localVideoFile: localVideo,
  videoSectionTitle: 'A Moment Captured',
  videoCaption:
    'Some memories deserve to be replayed. This one is one of those.',

  // ── Entry screen ───────────────────────────────────────────────────────────
  entryLine1: 'A little surprise was made for someone special.',
  entryLine2: 'August 1, 2026',
  entryButtonText: 'Open Your Surprise',
  loadingMessages: [
    'Collecting our memories…',
    'Preparing something special…',
    'Almost ready…',
  ],

  // ── Easter egg button ──────────────────────────────────────────────────────
  surpriseButtonText: 'Always ❤️',
};
