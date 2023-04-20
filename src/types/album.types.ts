import { Artist } from "./artist.types"
import { Image } from "./image.types"
import { ExternalUrls } from "./playlists.types"
import { ExternalIds } from "./track.types"
export interface Album {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: Restrictions
  type: string
  uri: string
  copyrights: Copyright[]
  external_ids: ExternalIds
  genres: string[]
  label: string
  popularity: number
  album_group: string
  artists: Artist[]
}
export interface Restrictions {
  reason: string
}
export interface Copyright {
  text: string
  type: string
}