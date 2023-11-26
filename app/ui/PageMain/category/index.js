import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function Category({ header, products, background }) {
  await delay(30);

  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.slice(0, 6).map((product, index) => (
          <div key={index} className={styles.product}>
            <Image width={150} height={100} src={product.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
