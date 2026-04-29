export interface Devotional {
  title: string;
  verse: string;
  verseReference: string;
  reflection: string;
  prayer: string;
  date?: string;
  author?: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

export interface PrayerRequest {
  name: string;
  request: string;
  isPrivate: boolean;
}

export enum NavSection {
  HOME = 'home',
  DEVOTIONAL = 'devocional',
  EVENTS = 'eventos',
  PRAYER = 'oracao',
  GIVING = 'dizimos',
}