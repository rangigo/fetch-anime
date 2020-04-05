import { AnimeFormat } from "../../components/Anime/types";

export interface ListType {
  value: AnimeFormat
  label: string
}

export const listTypes: ListType[] = [
  {
    value: AnimeFormat.TV,
    label: 'Television',
  },
  {
    value: AnimeFormat.MOVIE,
    label: 'Movies',
  },
  {
    value: AnimeFormat.TV_SHORT,
    label: 'TV Short',
  },
  {
    value: AnimeFormat.ONA,
    label: 'ONA',
  },
  {
    value: AnimeFormat.OVA,
    label: 'OVA',
  },
  {
    value: AnimeFormat.SPECIAL,
    label: 'Special',
  },
  {
    value: AnimeFormat.ALL,
    label: 'All',
  },
]
