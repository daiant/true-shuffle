import { useEffect, useState } from 'react'
import './App.css'
import { beginAuthFlow } from './lib/auth/auth'
import { UserProfile } from './types/user.types';
import { getPlaylists } from './lib/playlist/playlist';
import { PlaylistItem, Playlists, Tracks } from './types/playlists.types';
import { getTracks } from './lib/tracks/tracks';
import { getDevices, play } from './lib/player/player';
import { shuffle } from './lib/random/random';
import Welcome from './components/welcome/Welcome';
import Playlist from './components/playlist/Playlist';
import Title from './components/title/Title';
import User from './components/user/User';
import Player from './components/player/Player';
import { Track } from './types/track.types';

function App() {
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selected, setSelected] = useState('');
  const [playing, setPlaying] = useState<Track | undefined>(undefined);

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
        getDevices(value.token).then((value: any) => {
          setDevices(value.devices);
          setSelectedDevice(value.devices[0].id);
        })
      }
      else { setCode(undefined); }
    });
  }
  function selectPlaylist(playlist: PlaylistItem) {
    if (!token) return;
    setSelected(playlist.id);
    getTracks(playlist.tracks.href, token).then((value: any) => {
      const tracks: Track[] = value.items.map((item: any) => item.track);
      setTracks(tracks);
    });
  }
  function getMore() {
    // TODO: FIX types and arrays
  }
  function playSong(track: Track | Track[]) {
    if (!token) return;
    play([track].flat(), selectedDevice, token);
    setPlaying([track].flat()[0]);
  }
  function randomize() {
    const res = shuffle(tracks);
    setTracks([].concat(...res));
  }
  function playAll() {
    playSong(tracks);
  }
  return (
    <div className="App">
      {!code && <Welcome onClick={handleLogin} />}
      {user && <>
        <div className="aside">
          <div className="user">
            <User user={user}></User>
          </div>
          <div className="playlists">
            <Title>Playlists</Title>
            <ul>
              {playlists.map((item: PlaylistItem) =>
                <Playlist key={item.id} playlist={item} onClick={() => selectPlaylist(item)} selected={item.id === selected}></Playlist>
              )}
            </ul>
          </div>
          <div className="devices">
            <p>Dispositos</p>
            <ul>
              {devices.map((device: any) =>
                <li key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={device.id === selectedDevice ? "selected" : ''}>
                  {device.name}
                </li>)}
            </ul>
          </div>
        </div>
        <div className="songs">
          {tracks.length > 0 && <>
            <div className="buttons">
              <button onClick={randomize}>Randomize</button>
              <button onClick={playAll} className='play'>Play All</button>
            </div>
            <ul>
              {tracks.map((track: Track) => {
                return <li key={track.id} onClick={() => playSong([track])}>{track.name}</li>
              })}
            </ul>
            <button className="loadMore" onClick={getMore}>More songs</button>
          </>}
        </div>
        <Player track={playing}></Player>
      </>}
    </div >
  )
}

export default App
