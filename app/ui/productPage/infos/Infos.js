"use client"

import styles from "./styles.module.scss";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Link from "next/Link";
import { TbPlus, TbMinus } from "react-icons/tb";
import { useEffect } from "react";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import axios from "axios";
import DialogModal from "../../dialogModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../../../store/cartSlice";

import { hideDialog, showDialog } from "../../../../store/DialogSlice"
import { signIn, signOut, useSession } from "next-auth/react";
export default function Infos({ product, setActiveImg }) {
  // const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [size, setSize] = useState(product.stock);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { cart } = useSelector((state) => ({ ...state }));
  const [inCart, setinCart] = useState(false)
  const [inWishlist, setinWishlist] = useState(false)
  const router = useRouter();
  // console.log(cart.cartItems)
  const inCartHandler = () => {
    let exist = cart?.cartItems?.find((p) => p.id === product.id);
    if (exist) {
      setinCart(true)
    }
    else {
      setinCart(false)
    }
  }
  useEffect(() => {
    inCartHandler()
  }, [cart])
  // se verifica que el producto no este en el carrito

  const fechdata = async () => {
    if (session) {
      const res = await axios.get(
        "https://fvecommerce.somee.com/api/Usuarios/Favoritos/Usuario",
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      const check = res.data.find((p) => p.producto.id == product.id);
      if (check) {
        setinWishlist(check)
      }
      else {
        setinWishlist(check)
      }
    }

  };
  //verificamos si el producto esta en la wishlist
  useEffect(() => {
    fechdata()
  }, []);

  const removeProduct = (id) => {
    let newCart = cart.cartItems.filter((p) => {
      return p._uid != id;
    });
    dispatch(updateCart(newCart));
    inCartHandler()
  };

  const addToCartHandler = async () => {
    // if (!router.query.size) {
    //   setError("Please Select a size");
    //   return;
    // }
    // console.log(`https://fvecommerce.somee.com/api/Productos${product.id}`)
    const { data } = await axios.get(
      `https://fvecommerce.somee.com/api/Productos/${product.id}`
    );
    if (qty > data.stock) {
      setError(
        "The Quantity you have choosed is more than in stock. Try and lower the Qty"
      );
    } else if (data.stock < 1) {
      setError("This Product is out of stock.");
      return;
    } else {
      // console.log(data.id)
      let _uid = `${data.id}`;

      let exist = cart?.cartItems?.find((p) => p._uid === _uid);

      if (exist) {
        let newCart = cart.cartItems.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        // console.log(newCart)
        dispatch(updateCart(newCart));
      } else {
        // console.log({
        //   ...data,
        //   qty,
        //   _uid,
        // })
        dispatch(
          addToCart({
            ...data,
            qty,
            _uid,
          })
        );
      }
    }
  };
  ///---------------------------------
  const handleWishlist = async () => {
    try {
      if (!session) {
        return router.push("/Signin")
      }
      if (inWishlist) {
        console.log(inWishlist)
        try {
          // delete
          await axios.delete(
            `https://fvecommerce.somee.com/api/Usuarios/Favorito/${inWishlist.id}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }

      } else {
        try {
          const { data } = await axios.post(
            "https://fvecommerce.somee.com/api/Usuarios/Favorito",
            {
              productoId: product.id,
            },
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            }
          );
        } catch (error) {

          signOut();
          router.navigate("/Signin")

        }
      }
      fechdata();
    }
    catch (error) {
      console.log(error);
    }
  }


  // console.log(product)
  return (
    <div className={styles.infos}>
      {/* <DialogModal /> */}
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.nombre}</h1>
        <h2 className={styles.infos__sku}>{product.descripcion}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.sumaDePuntos}
            precision={0.5}
            readOnly
            style={{ color: "#FACF19" }}
          />
          ({product.sumaDePuntos}
          {product.sumaDePuntos == 1 ? " review" : " reviews"})
        </div>
        <div className={styles.infos__price}>
          {/* {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}$</h1>} */}
          <h1>{product.precio}$</h1>
          {/* {product.discount > 0 ? ( */}
          <h3>
            <span>{product.precio + 15}$</span>
            <span>(-$15)</span>
          </h3>
          {/* ) : (
            ""
          )} */}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping
            ? `+${product.shipping}$ Shipping fee`
            : "Free Shipping"}
        </span>
        {/* <span>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available.
        </span> */}
        {/* <div className={styles.infos__sizes}>
          <h4>Select a Size : </h4>
          <div className={styles.infos__sizes_wrap}>
            {/* {product.tamanos.map((size, i) => (
              <Link
                key={i}
                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
              >
                <div
                  className={`${styles.infos__sizes_size} ${i == router.query.size && styles.active_size
                    }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))} 
      </div>
    </div> * /}
        {/* <div className={styles.infos__colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <span
                className={i == router.query.style ? styles.active_color : ""}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <img src={color.image} alt="" />
                </Link>
              </span>
            ))}
        </div> */}
        <div className={styles.infos__qty}>
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() => qty < product.stock && setQty((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.stock < 1}
            style={{ cursor: `${product.stock < 1 ? "not-allowed" : ""}` }}
            onClick={() => inCart ? removeProduct(product.id) : addToCartHandler()}
          >
            <BsHandbagFill />
            <b>

              {inCart ? "IN CART" : "ADD TO CART"}
            </b>
            {/* ADD TO CART</b> */}
          </button>
          <button onClick={() => handleWishlist()}>
            <BsHeart />
            <b>{inWishlist ? "IN WISHLIST" : "ADD TO WISHLIST"}</b>
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
        <Share />
        <Accordian details={[product.descripcion]} Puntos={product.sumaDePuntos} />
        <SimillarSwiper />
      </div >
    </div >
  );
}
