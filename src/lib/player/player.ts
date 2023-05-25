import { Playback } from "../../types/playback.types";
import { Track } from "../../types/track.types";

export async function play(songs?: Array<Track>, device?: string, token?: string) {
  if (!songs || !device) {
    return fetch('https://api.spotify.com/v1/me/player/play', { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
  }
  const uris = parseSongs(songs);
  const params = new URLSearchParams();
  params.append("device_id", device);
  fetch(`https://api.spotify.com/v1/me/player/play?${params}`, {
    method: "PUT", body: JSON.stringify({ uris: uris }), headers: { Authorization: `Bearer ${token}` }
  });
}

export async function togglePlay(token: string): Promise<void> {
  const playbackState = await getState(token);

  if (playbackState?.is_playing) {
    pause(token);
  } else {
    play(undefined, undefined, token);
  }
}

export async function pause(token: string): Promise<void> {
  fetch('https://api.spotify.com/v1/me/player/pause', { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
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

export async function getState(token: string): Promise<Playback | undefined> {
  const response = await fetch('https://api.spotify.com/v1/me/player', { headers: { Authorization: `Bearer ${token}` } });
  if (response.ok && response.body) {
    return response.json();
  }
}