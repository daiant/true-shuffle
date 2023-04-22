import { useState } from 'react';
import { Device } from '../../types/device.types';
import { Track } from '../../types/track.types';
import styles from './Player.module.css';

export default function Player(props: { track?: Track, playPause: Function, devices: Array<Device>, setDevice: Function, selected: string }) {
  const [devicesList, setDevicesList] = useState<boolean>(false);
  function showDevices() {
    setDevicesList((value) => !value);
  }
  return <footer className={styles.wrapper}>
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