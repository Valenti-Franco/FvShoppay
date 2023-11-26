
import Link from "next/link";
import styles from "./styles.module.scss";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function Header() {
  await delay(30);
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Store</Link>
        </li>
        <li>
          <Link href="">Electronics</Link>
        </li>
        <li>
          <Link href="">Watches</Link>
        </li>
      </ul>
    </div>
  );
}
