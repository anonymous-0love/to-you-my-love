export interface Memory {
  id: string;
  date?: string;
  title: string;
  description?: string;
  image: string;
  location?: string;
  category?: 'couple' | 'portrait' | 'outing' | 'fun' | 'romantic';
  featured?: boolean;
  caption?: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  location?: string;
  side?: 'left' | 'right';
}

export interface LoveReason {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface VideoMemory {
  id: string;
  youtubeId?: string;
  localSrc?: string;
  title: string;
  caption: string;
  thumbnailOverride?: string;
}

export interface FuturePlan {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface RelationshipStat {
  id: string;
  label: string;
  value: number | string;
  suffix?: string;
  isNumeric: boolean;
}

export interface HiddenMessage {
  id: string;
  trigger: string;
  message: string;
}

export interface LoveStoryConfig {
  yourName: string;
  girlfriendName: string;
  relationshipStartDate: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  finalPhoto: string;
  finalMessage: string;
  finalClosingText: string;
  musicFile: string;
  loveLetter: string;
  surpriseButtonText: string;
  youtubeVideoId: string;
  localVideoFile: string;
  videoSectionTitle: string;
  videoCaption: string;
  entryLine1: string;
  entryLine2: string;
  entryButtonText: string;
  loadingMessages: string[];
}
