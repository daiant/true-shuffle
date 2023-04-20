import { Album, Restrictions } from "./album.types"
import { Artist } from "./artist.types"
import { ExternalUrls } from "./playlists.types"

export interface Track {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  linked_from: {}
  restrictions: Restrictions
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  is_local: boolean
}
export interface ExternalIds {
  isrc: string
  ean: string
  upc: string
}