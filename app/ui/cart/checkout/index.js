import Link from "next/link";
import styles from "./styles.module.scss";

export default function Checkout({
  subtotal,
  shippingFee,
  total,
  selected,
  saveCartHandler,

}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Order Summary</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>US${subtotal}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Shipping</span>
        <span>free +0$</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>US{total}$</span>
      </div>
      <div className={styles.submit}>
        <Link
          disabled={selected.length == 0}

          href={"/checkout"}

        >
          <button
            onClick={() => saveCartHandler()}
            disabled={selected.length == 0}
            style={{
              background: `${selected.length == 0 ? "#eee" : ""}`,
              cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
            }}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
