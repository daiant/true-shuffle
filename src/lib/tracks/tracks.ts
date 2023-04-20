import { PlaylistItem } from "../../types/playlists.types";
import { Track } from "../../types/track.types";

export async function getTracks(href: string, token: string): Promise<unknown> {
  const params = new URLSearchParams();
  // params.append('limit', '10');
  const tracks = await fetch(href + '?' + params, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  return tracks.json();
}