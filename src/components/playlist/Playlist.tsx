import { Image } from "../../types/image.types";
import { PlaylistItem } from "../../types/playlists.types";
import styles from './Playlist.module.css';

export default function Playlist(props: { playlist: PlaylistItem, onClick: Function, selected: boolean }) {
  function getImage(): string {
    // TODO: Set image bonita para liked songs
    return props.playlist.images?.find((value: Image) => value.url)?.url || 'https://picsum.photos/200/300';
  }
  return <li className={styles.wrapper}>
    <img src={getImage()} />
    <div onClick={() => props.onClick()} className={styles.name}>{props.playlist.name}</div>
    {/* TODO: Get Icon */}
    <div className={styles.actions}>---</div>
  </li>
}