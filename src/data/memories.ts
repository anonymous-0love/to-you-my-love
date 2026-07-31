import type { TimelineItem, Memory, LoveReason, FuturePlan, RelationshipStat } from './types';
import { photos } from './config';

// ─── Timeline — Our Story ─────────────────────────────────────────────────────
// Edit titles, descriptions, dates, and locations as needed.
export const timeline: TimelineItem[] = [
  {
    id: 'tl-1',
    date: 'The Beginning',
    title: 'A Beautiful First',
    description:
      'Every great love story has a first page. Ours started quietly — and then, all at once, everything was different.',
    image: photos.roses,
    location: 'The start of everything',
  },
  {
    id: 'tl-2',
    date: 'Getting to Know Us',
    title: 'Our First Outing',
    description:
      'The first time we stepped out into the world together. Somehow, ordinary places felt extraordinary.',
    image: photos.restaurantUs,
    location: 'Somewhere that felt like ours',
  },
  {
    id: 'tl-3',
    date: 'Mall Days',
    title: 'Mirror, Mirror',
    description:
      'Shopping trips that turned into hours of laughter. You trying on everything, me pretending I wasn\'t completely charmed.',
    image: photos.mirrorUs1,
    location: 'The clothing store we ended up staying too long in',
  },
  {
    id: 'tl-4',
    date: 'A Day Out',
    title: 'Nature Girl',
    description:
      'You leaning against that railing by the lake, the trees behind you — I took a photo because I didn\'t want to forget how you looked in that moment.',
    image: photos.byLake,
    location: 'By the lake',
  },
  {
    id: 'tl-5',
    date: 'Life is Sweet',
    title: '"Life is Sweet" and So Are You',
    description:
      'The dessert cafe with the neon sign that said everything we felt that evening.',
    image: photos.sweetCafe,
    location: 'The cafe with the neon sign',
  },
  {
    id: 'tl-6',
    date: 'July 31, 2026',
    title: 'A Day Remembered',
    description:
      'These photos were taken on a day that felt like a page from a favourite chapter — loud and full of everything I love about us.',
    image: photos.kiss,
    location: 'Wherever you are is where I want to be',
  },
];

// ─── Gallery — All Photos ─────────────────────────────────────────────────────
export const galleryPhotos: Memory[] = [
  {
    id: 'g-1',
    image: photos.kiss,
    title: 'Us',
    caption: 'This one is my favourite.',
    category: 'romantic',
    featured: true,
  },
  {
    id: 'g-2',
    image: photos.restaurantUs,
    title: 'Together',
    caption: 'Your smile in this photo says everything.',
    category: 'couple',
    featured: true,
  },
  {
    id: 'g-3',
    image: photos.blowingKiss,
    title: 'That look',
    caption: 'The one that makes me smile every single time.',
    category: 'portrait',
    featured: true,
  },
  {
    id: 'g-4',
    image: photos.mirrorUs1,
    title: 'Mirror selfie no. 1',
    caption: 'We take these everywhere.',
    category: 'couple',
  },
  {
    id: 'g-5',
    image: photos.byLake,
    title: 'By the water',
    caption: 'You, the lake, and a moment I didn\'t want to end.',
    category: 'portrait',
    featured: true,
  },
  {
    id: 'g-6',
    image: photos.sweetCafe,
    title: 'Life is sweet',
    caption: 'It really is, with you.',
    category: 'couple',
  },
  {
    id: 'g-7',
    image: photos.pointing,
    title: 'You, unfiltered',
    caption: 'This is exactly you.',
    category: 'portrait',
  },
  {
    id: 'g-8',
    image: photos.mirrorUs2,
    title: 'Mirror selfie no. 2',
    caption: 'Every store we walk into.',
    category: 'couple',
  },
  {
    id: 'g-9',
    image: photos.spiderman,
    title: 'Superhero moment',
    caption: 'If Spider-Man showed up for dinner.',
    category: 'fun',
  },
  {
    id: 'g-10',
    image: photos.spidergwen,
    title: 'Spider-Gwen',
    caption: 'And this one\'s you, obviously.',
    category: 'fun',
  },
  {
    id: 'g-11',
    image: photos.roses,
    title: 'For you',
    caption: 'Just because.',
    category: 'romantic',
    featured: true,
  },
  {
    id: 'g-12',
    image: photos.elevatorUs,
    title: 'Elevator vibes',
    caption: 'Sunglasses on, world off.',
    category: 'couple',
  },
  {
    id: 'g-13',
    image: photos.lobbyWalk,
    title: 'Making an entrance',
    caption: 'You walk into a room and own it.',
    category: 'portrait',
  },
  {
    id: 'g-14',
    image: photos.navyDress,
    title: 'Sunday best',
    caption: 'That smile + those sunglasses = perfection.',
    category: 'portrait',
  },
  {
    id: 'g-15',
    image: photos.storeUs,
    title: 'Shopping together',
    caption: 'You always find the right things.',
    category: 'couple',
  },
];

// ─── Reasons I Love You ───────────────────────────────────────────────────────
// Edit or add more reasons — each one reveals on click / tap.
export const loveReasons: LoveReason[] = [
  {
    id: 'r-1',
    title: 'Your smile',
    description:
      'The one that lights up your whole face when you think something is genuinely funny. I could watch that smile for the rest of my life.',
    emoji: '✨',
  },
  {
    id: 'r-2',
    title: 'How you make me feel',
    description:
      'Like I can say anything and it will land safely. That kind of ease is rare, and I don\'t take it for granted.',
    emoji: '🌿',
  },
  {
    id: 'r-3',
    title: 'Your playfulness',
    description:
      'The Spider-Man photos. The pointing. The blowing a kiss at a camera when you think no one\'s watching. That\'s you, and it\'s wonderful.',
    emoji: '🕷️',
  },
  {
    id: 'r-4',
    title: 'The way you carry yourself',
    description:
      'Walking into a hotel lobby like you belong there. Sunglasses on. Head high. You are effortlessly cool.',
    emoji: '🕶️',
  },
  {
    id: 'r-5',
    title: 'Ordinary days with you',
    description:
      'Shopping trips that go nowhere. Dinners that go on too long. Elevator selfies. Those quiet ordinary days are the ones I treasure most.',
    emoji: '☕',
  },
  {
    id: 'r-6',
    title: 'Your kindness',
    description:
      'The quiet, understated way you care. It\'s in the small things — and those small things add up to something very big.',
    emoji: '🌸',
  },
  {
    id: 'r-7',
    title: 'Your laugh',
    description:
      'When something catches you off guard and it just comes out — honest, loud, completely unguarded. That laugh is everything.',
    emoji: '🎵',
  },
  {
    id: 'r-8',
    title: 'Your style',
    description:
      'The white eyelet top. The navy printed dress. The hearts-and-bows shirt. You always look exactly like yourself.',
    emoji: '👗',
  },
  {
    id: 'r-9',
    title: 'How you understand me',
    description:
      'Without needing everything explained. That kind of understanding doesn\'t come easily and I\'m grateful every day.',
    emoji: '🫶',
  },
  {
    id: 'r-10',
    title: 'That you exist, in my life',
    description:
      'Of all the versions of things that could have happened, this version — where you\'re here — is my favourite by far.',
    emoji: '🌙',
  },
];

// ─── Future Plans ─────────────────────────────────────────────────────────────
export const futurePlans: FuturePlan[] = [
  {
    id: 'fp-1',
    title: 'A trip we haven\'t planned yet',
    description: 'Somewhere new. Just us, a map, and no agenda.',
    emoji: '✈️',
  },
  {
    id: 'fp-2',
    title: 'More mirror selfies',
    description: 'In every store, every elevator, every reflective surface we can find.',
    emoji: '🪞',
  },
  {
    id: 'fp-3',
    title: 'A lazy Sunday',
    description: 'No plans, no rush. Just coffee, comfort, and you.',
    emoji: '☀️',
  },
  {
    id: 'fp-4',
    title: 'More dessert cafe dates',
    description: 'Life is sweet, after all.',
    emoji: '🧁',
  },
  {
    id: 'fp-5',
    title: 'A long, quiet walk',
    description: 'Somewhere with a view. We don\'t have to talk the whole time.',
    emoji: '🌿',
  },
  {
    id: 'fp-6',
    title: 'Every ordinary day, over and over',
    description: 'Because with you, ordinary is actually extraordinary.',
    emoji: '🌙',
  },
];

// ─── Relationship Stats ───────────────────────────────────────────────────────
// The "days together" stat is calculated dynamically from config.relationshipStartDate.
// Edit or add custom stats below.
export const staticStats: RelationshipStat[] = [
  {
    id: 'st-photos',
    label: 'Photos Together',
    value: 10000,
    suffix: '+',
    isNumeric: true,
  },
  {
    id: 'st-places',
    label: 'Places We\'ve Been',
    value: 'Many',
    isNumeric: false,
  },
  {
    id: 'st-smiles',
    label: 'Times You Made Me Smile',
    value: 'Too Many to Count',
    isNumeric: false,
  },
  {
    id: 'st-memories',
    label: 'Memories Made',
    value: 'A Lifetime\'s Worth',
    isNumeric: false,
  },
];
