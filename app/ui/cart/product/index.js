import styles from "./styles.module.scss";
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../../store/cartSlice";
import storeImg from "../../../../public/store.webp"
import { useState, useEffect } from "react";
export default function Product({ product, selected, setSelected }) {
  const { cart } = useSelector((state) => ({ ...state }));
  const [active, setActive] = useState();

  // console.log("active:", cart);
  useEffect(() => {
    const check = selected.find((p) => p._uid == product._uid);
    setActive(check);
  }, [selected]);
  const dispatch = useDispatch();
  const updateQty = (type) => {
    let newCart = cart.cartItems.map((p) => {
      if (p._uid == product._uid) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }



      return p;
    });
    dispatch(updateCart(newCart));
  };
  const removeProduct = (id) => {
    let newCart = cart.cartItems.filter((p) => {
      return p._uid != id;
    });
    dispatch(updateCart(newCart));
  };
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((p) => p._uid !== product._uid));
    } else {
      setSelected([...selected, product]);
    }
  };


  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src={storeImg.src} alt="" />
        FV Official Store
      </div>
      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>
        <img src={product.imagenes[0]?.url} alt="" />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.nombre.length > 30
                ? `${product.nombre.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div
              style={{ zIndex: "2" }}
              onClick={() => removeProduct(product._uid)}
            >
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
            {/* <img src={product.color.image} alt="" /> */}
            {/* {product.size && <span>{product.size}</span>} */}
            {product.precio && <span>{product.precio.toFixed(2)}$</span>}
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{(product.precio * product.qty).toFixed(2)}$
              </span>
              {/* {product.precio !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD{product.priceBefore}$
                </span>
              )} */}
              <span className={styles.priceBefore}>
                USD{(product.precio + (product.precio * 15) / 100) * product.qty}$
              </span>
              {/* {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )} */}
              <span className={styles.discount}>-15%</span>

            </div>
            {!active ? (
              <div className={styles.product__priceQty_qty}>
                <button
                  disabled={product.qty < 2}
                  onClick={() => updateQty("minus")}
                >
                  -
                </button>
                <span>{product.qty}</span>
                <button
                  disabled={product.qty == product.quantity}
                  onClick={() => updateQty("plus")}
                >
                  +
                </button>
              </div>

            ) : (
              <div className={styles.product__priceQty_qty}>
                <button
                  style={{ backgroundColor: "#ccc" }}
                // disabled={true}
                // onClick={() => updateQty("minus")}
                >
                  -
                </button>
                <span>{product.qty}</span>
                <button
                  style={{ backgroundColor: "#ccc" }}


                // disabled={true}
                // onClick={() => updateQty("plus")}
                >
                  +
                </button>
              </div>
            )}

          </div>
          <div className={styles.product__shipping}>
            {/* {product.shipping */}
            {/* ? `+${product.shipping}$ Shipping fee` */}
            Free Shipping
          </div>
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to your wishlist it may get
              restocked.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
