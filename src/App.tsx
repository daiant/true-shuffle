import { useEffect, useState } from 'react'
import './App.css'
import { beginAuthFlow } from './lib/auth/auth'
import { UserProfile } from './types/user.types';
import { getPlaylists } from './lib/playlist/playlist';
import { PlaylistItem, Playlists, Tracks } from './types/playlists.types';
import { getTracks } from './lib/tracks/tracks';
import { play } from './lib/player/player';
import { shuffle } from './lib/random/random';

function App() {
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [tracks, setTracks] = useState<any[]>([]);

  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code && !user) {
      setCode(code);
      handleLogin(code);
    }
  }, []);

  function handleLogin(override?: string) {
    beginAuthFlow(override || code).then((value: { user: UserProfile, token: string } | undefined) => {
      if (value) {
        setUser(value.user);
        setToken(value.token)
        getPlaylists(value.user.id, value.token).then((value: Playlists) => {
          setPlaylists(([{ id: 'hehe', name: 'Liked Songs', tracks: { href: 'https://api.spotify.com/v1/me/tracks' } }] as PlaylistItem[]).concat(value.items));
        });
      }
      else { setCode(undefined); }
    });
  }
  function selectPlaylist(playlist: PlaylistItem) {
    if (!token) return;
    getTracks(playlist.tracks.href, token).then((value) => { setTracks(value.items) });
  }
  function getMore() {
    // TODO: FIX types and arrays
  }
  function playSong(id: any) {
    if (!token) return;
    play(id, token);
  }
  function randomize() {
    const res = shuffle(tracks);
    setTracks([].concat(...res));
  }
  function playAll() {
    const res = tracks.map((track) => track.track.id);
    playSong(res);
  }
  return (
    <div className="App">
      <div className="aside">
        <div className="user">
          {user &&
            <p>ya te logiaste: {user?.display_name}</p>
          }
          {!code &&
            <button onClick={() => handleLogin()}>Login puto</button>
          }
        </div>
        <div className="playlists">
          {user &&
            <ul>
              {playlists.map((item: PlaylistItem) => <a key={item.id}><li onClick={() => selectPlaylist(item)}>{item.name}</li></a>)}
            </ul>
          }
        </div>
      </div>
      <div className="songs">
        {tracks.length > 0 && <>
          <button onClick={randomize}>Randomize</button>
          <button onClick={playAll} className='play'>Play All</button>
          <ul>
            {tracks.map((track: any) => {
              return <li key={track.track.id} onClick={() => playSong([track.track.id])}>{track.track.name}</li>
            })}
          </ul>
          <button onClick={getMore}>More songs</button>
        </>}
      </div>
    </div>
  )
}

export default App
