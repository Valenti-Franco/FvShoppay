import Link from "next/link";
import styles from "./styles.module.scss";
import adImg from "../../../public/ad.jpg"

export default function Ad() {

  return (
    <Link href="/browse">
      <div className={styles.ad} style={{ backgroundImage: `url("${adImg.src}")` }}></div>
    </Link>
  );
}
