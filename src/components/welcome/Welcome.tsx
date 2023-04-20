import styles from './Welcome.module.css';

export default function Welcome(props: { onClick: Function }) {
  return <div className={styles.wrapper}>
    <img src='/vite.svg'></img>
    <button onClick={() => props.onClick()}>Login puto</button>
  </div>
}