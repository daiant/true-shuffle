export async function getPlaylists(user: string, token: string) {
  const playlists = await fetch("https://api.spotify.com/v1/users/" + user + "/playlists", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  })
  return playlists.json();
}