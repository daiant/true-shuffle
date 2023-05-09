import { PlaylistItem, PlaylistItemTrack, PlaylistTracks, Playlists } from "../../types/playlists.types";
import { Track } from "../../types/track.types";

export async function getTracks(href: string, token: string): Promise<{ tracks: Track[], next: any }> {
  const params = new URLSearchParams();
  const response = await fetch(href, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  const requestTracks: PlaylistTracks = await response.json();
  return { tracks: requestTracks.items.map((v) => v.track), next: requestTracks.next };
}
export async function getAllTracks(href: string, token: String): Promise<Track[]> {
  return recursiveTracks(href, token);
}
async function recursiveTracks(href: string, token: String): Promise<Track[]> {

  const response = await fetch(href, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  if (response.ok) {
    console.log(response.ok);
    const requestTracks: PlaylistTracks = await response.json();
    const tracks: Track[] = requestTracks.items.map((v) => v.track);
    if (requestTracks.next) return tracks.concat(await recursiveTracks(requestTracks.next, token));
    return tracks;
  }
  return [] as Track[];
}