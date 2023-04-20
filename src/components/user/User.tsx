import { Image } from "../../types/image.types";
import { UserProfile } from "../../types/user.types";
import styles from './User.module.css';

export default function User(props: { user: UserProfile }) {
  function getImage(): string {
    return props.user.images.find((value: Image) => value.url)?.url || ''
  }
  return <div className={styles.wrapper}>
    <p className={styles.display_name}>{props.user.display_name}</p>
    <div className={styles.img}>
      <img src={getImage()} alt="" />
    </div>
  </div>
}