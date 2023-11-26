import Image from "next/image";
import styles from "./styles.module.scss";

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCPET</h3>
      <div className={styles.footer__flexwrap}>
        <Image width={100} height={100} src="/payment/visa.webp" alt="" />
        <Image width={100} height={100} src="/payment/mastercard.webp" alt="" />
        <Image width={100} height={100} src="/payment/paypal.webp" alt="" />
      </div>
    </div>
  );
}
