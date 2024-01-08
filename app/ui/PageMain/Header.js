
import Link from "next/link";
import styles from "./styles.module.scss";


export default async function Header() {

  return (
    <div className={styles.header}>
      <ul>
        <li>
          <p>Retail</p>
        </li>
        <li>
          <p>Gadgets</p>
        </li>
        <li>
          <p>Timepieces</p>
        </li>
        <li>
          <p>Product Category</p>
        </li>
        <li>
          <p>Smartphone</p>
        </li>
        <li>
          <p>Tech Devices</p>
        </li>
        <li>
          <p>Desktops</p>
        </li>
        <li>
          <p>Gaming Console</p>
        </li>
        <li>
          <p>Apparel</p>
        </li>
        <li>
          <p>Shoes</p>
        </li>
      </ul>
    </div>
  );
}
