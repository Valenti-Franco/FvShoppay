import styles from "./styles.module.scss";
import protection from "../../../../public/protection.png"
import Image from "next/image";

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Payment Methods</h2>
      <div className={styles.images}>
        <Image width={40} height={20} src="/payment/visa.webp" alt="" />
        <Image width={40} height={20} src="/payment/mastercard.webp" alt="" />
        <Image width={40} height={20} src="/payment/paypal.webp" alt="" />
      </div>
      <h2 className={styles.header}>Buyer Protection</h2>
      <div className={styles.protection}>
        <Image width={40} height={40} src={protection.src} alt="" />
        Get full refund if the item is not as described or if it´s not
        delievered.
      </div>
    </div>
  );
}
