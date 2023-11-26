import { paymentMethods } from "../../../data/paymentMethods";

// import data from "../../../../public/checkout/"
import styles from "./styles.module.scss";

export default function Payment({ paymentMethod, setPaymentMethod, profile }) {


  return (
    <div className={styles.payment}>
      {!profile && (
        <div className={styles.header}>
          <h3>Payment Method</h3>
        </div>
      )}
      {paymentMethods.map((pm, index) => (
        <label
          htmlFor={pm.id}
          key={pm.id}
          className={styles.payment__item}
          // onClick={() => setPaymentMethod(pm.id)}
          style={{ background: `${paymentMethod == pm.id ? "#f5f5f5" : ""}` }}
        >
          {index === 0 ? (
            <input
              type="radio"
              name="payment"

              id={pm.id}
              checked={paymentMethod == pm.id}
            />
          ) : null

          }

          <img src={`../../../../checkout/${pm.id}.webp`} alt={pm.name} />
          <div className={styles.payment__item_col}>
            <span>Pay with {pm.name}</span>
            <p>
              {pm.images.length > 0
                ? pm.images.map((img) => (
                  <img key={img} src={`../../../../payment/${img}.webp`} alt="" />
                ))
                : pm.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
