import { Image } from '../../types/image.types';
import { Track } from '../../types/track.types';
import styles from './Track.module.css';

export default function TrackItem(props: { track: Track, onClick: Function, selected: boolean }) {
  function getImage(): string {
    // TODO: Set image bonita para liked songs
    return props.track.album.images?.find((value: Image) => value.url)?.url || 'https://picsum.photos/200/300';
  }
  return <li className={styles.wrapper} aria-selected={props.selected}>
    <img src={getImage()} />
    <div onClick={() => props.onClick()} className={styles.info}>
      <p>{props.track.name}</p>
      <p>{props.track.artists[0].name}</p>
    </div>
    {/* TODO: Get icon */}
    <div className={styles.actions}>-</div>
  </li>

}