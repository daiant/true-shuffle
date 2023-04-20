import { Track } from "../../types/track.types";

export async function play(songs: Array<Track>, device: string, token: string) {
  const uris = parseSongs(songs);
  const params = new URLSearchParams();
  params.append("device_id", device);
  fetch(`https://api.spotify.com/v1/me/player/play?${params}`, {
    method: "PUT", body: JSON.stringify({ uris: uris }), headers: { Authorization: `Bearer ${token}` }
  });
}
function parseSongs(songs: Array<Track>): Array<string> {
  return songs.map((song: Track) => 'spotify:track:' + song.id);
}

export async function getDevices(token: string) {
  const devices = await fetch('https://api.spotify.com/v1/me/player/devices', {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return devices.json();
}