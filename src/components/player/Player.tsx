import { Track } from '../../types/track.types';
import styles from './Player.module.css';

export default function Player(props: { track?: Track }) {
  return <footer className={styles.wrapper}>
    <div className={styles.song_info}>
      {props.track && <>
        <p>{props.track.name}</p>
        <span>-</span>
        <p>{props.track.album?.name || 'nose'}</p>
      </>}
    </div>
    <div className={styles.actions}>
      <div className={styles.devices}>dev</div>
      <div className={styles.play_pause}>pl</div>
    </div>
  </footer>
}