import { Anime } from "../../components/Anime/types";

export interface AnimeData {
  Page: Page
}

export interface Page {
  pageInfo: PageInfo
  media: Anime[]
}

export interface PageInfo {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
}