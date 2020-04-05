type FuzzyDate = {
  year: number
  month: number
  day: number
}

export interface AnimeTrailer {
  id: number
  site: string
}

export interface Studio {
  name: string
}

export interface StudioConnection {
  nodes: Studio[]
}

export interface ExternalLink {
  url: string
  site: string
}

export interface AnimeTitle {
  english: string
  romaji: string
  native: string
}

export interface AiringSchedule {
  episode: number
  timeUntilAiring?: number
  airingAt?: number
}

export interface AnimeCoverImage {
  extraLarge: string
  large: string
}

export interface AiringScheduleConnection {
  nodes: AiringSchedule[]
}

export enum AnimeFormat {
  TV = 'TV',
  MOVIE = 'MOVIE',
  TV_SHORT = 'TV_SHORT',
  ONA = 'ONA',
  OVA = 'OVA',
  SPECIAL = 'SPECIAL',
  ALL = ' All',
}

export interface Anime {
  startDate: FuzzyDate
  id: number
  idMal: number
  trailer: AnimeTrailer
  genres: string[]
  episodes: number
  duration: number
  source: string
  studios: StudioConnection
  externalLinks: ExternalLink[]
  title: AnimeTitle
  nextAiringEpisode: AiringSchedule
  description: string
  coverImage: AnimeCoverImage
  format: AnimeFormat
  airingSchedule: AiringScheduleConnection
}

export interface AnimeProps extends Anime {
  viewWidth: number
}