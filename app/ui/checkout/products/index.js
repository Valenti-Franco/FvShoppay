import { FaStaylinked } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Products({ cart }) {

  const total = cart.reduce((acc, product) => {
    return acc + product.qty * product.precio;
  }, 0);
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {cart.products?.length == 1
            ? "1 item"
            : `${cart?.length} items`}
        </span>
      </div>
      <div className={styles.products__wrap}>
        {cart.map((product) => (
          <div key={product.id} className={styles.product}>
            <div className={styles.product__img}>
              <img src={product.imagenes[0].url} alt="" />
              <div className={styles.product__infos}>
                {/* <img src={product.color.image} alt="" /> */}
                {/* <span>{product.size}</span> */}
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className={styles.product__name}>
              {product.nombre.length > 18
                ? `${product.nombre.substring(0, 18)}...`
                : product.nombre}
            </div>
            <div className={styles.product__price}>
              {(product.precio * product.qty).toFixed(2)}$
            </div>
          </div>
        ))}
      </div>
      <div className={styles.products__total}>
        Subtotal : <b>{total}$</b>
      </div>
    </div>
  );
}
