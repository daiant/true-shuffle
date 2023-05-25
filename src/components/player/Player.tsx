import { useEffect, useState } from 'react';
import { Device } from '../../types/device.types';
import { Track } from '../../types/track.types';
import styles from './Player.module.css';
import { Playback } from '../../types/playback.types';

export default function Player(props: { track?: Track, playPause: Function, devices: Array<Device>, setDevice: Function, selected: string, getState: Function }) {
  const [devicesList, setDevicesList] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  function showDevices() {
    setDevicesList((value) => !value);
  }
  useEffect(() => {
  }, [])
  setInterval(async () => {
    if (!props.track) return;
    const response: Playback | undefined = await props.getState()
    if (response) {
      const progressPercentage = response.progress_ms / response.item.duration_ms * 100;
      setProgress(progressPercentage);
    }
  }, 1000);
  return <footer className={styles.wrapper} style={{ '--progress': progress } as React.CSSProperties}>
    <div className={styles.song_info}>
      {props.track && <>
        <p>{props.track.name}</p>
        <span>-</span>
        <p>{props.track.artists[0].name || 'nose'}</p>
      </>}
    </div>
    <div className={styles.actions}>
      <div className={styles.devices}>
        <div onClick={showDevices}>
          <img src="/laptop.svg" alt="" />
        </div>
        {devicesList && <ul className={styles.devices_list}>
          <p className={styles.title}>Dispositivos</p>
          {props.devices.map((device: Device) =>
            <li
              key={device.id}
              aria-selected={device.id === props.selected}
              onClick={() => props.setDevice(device)}
            >
              <span>{device.name}</span>
              <img src="/device.svg" alt="device" />
            </li>
          )}
        </ul>}
      </div>
      <div className={styles.play_pause} onClick={() => props.playPause()}>
        <img src="/pause.svg" />
      </div>
    </div>
    {devicesList && <div className={styles.devices_mask} onClick={showDevices}></div>}
  </footer >
}