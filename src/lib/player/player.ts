export async function play(songs: Array<string>, token: string) {
  const uris = parseSongs(songs);
  const devices = await getDevices(token);
  const params = new URLSearchParams();
  params.append("device_id", devices.devices[0].id);
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?${params}`, {
    method: "PUT", body: JSON.stringify({ uris: uris }), headers: { Authorization: `Bearer ${token}` }
  });
  console.log(await response.status);
}
function parseSongs(songs: Array<string>): Array<string> {
  return songs.map((song: string) => 'spotify:track:' + song);
}

export async function getDevices(token: string) {
  const devices = await fetch('https://api.spotify.com/v1/me/player/devices', {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return devices.json();
}