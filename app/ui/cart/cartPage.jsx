"use client";

import React from "react";
import { useEffect, useState } from "react";

import Empty from "../cart/empty";

import Header from "../cart/header";
import Product from "../cart/product";
import styles from "../../../styles/cart.module.scss";
import { updateCart } from "../../../store/cartSlice";
import CartHeader from "../cart/cartHeader";
import Checkout from "../cart/checkout";
import PaymentMethods from "../cart/paymentMethods";
import ProductsSwiper from "../productsSwiper";
import { women_swiper } from "../../data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { saveCart } from "../requests/user";

const CartPage = () => {
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  //-----------------------
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // setShippingFee(
    //   selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    // );
    setSubtotal(selected.reduce((a, c) => a + c.precio * c.qty, 0).toFixed(2));
    setTotal(selected.reduce((a, c) => a + c.precio * c.qty, 0).toFixed(2));
  }, [selected]);

  const saveCartHandler = () => {
    // Obtener los _uid de los productos seleccionados
    const uidsSeleccionados = selected.map((producto) => producto._uid);

    // Filtrar el carrito para mantener solo los productos cuyos _uid estén en uidsSeleccionados
    const nuevoCarrito = cart.cartItems.filter((producto) =>
      uidsSeleccionados.includes(producto._uid)
    );

    // Actualizar el carrito con los productos seleccionados
    dispatch(updateCart(nuevoCarrito));
  };
  return (
    <div className={styles.cart}>
      <head>
        <title>Cart</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      {cart.cartItems?.length > 0 ? (
        <div className={styles.cart__container}>
          <CartHeader
            cartItems={cart.cartItems}
            selected={selected}
            setSelected={setSelected}
          />
          <div className={styles.cart__products}>
            {cart.cartItems.map((product) => (
              <Product
                product={product}
                key={product._uid}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          <Checkout
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
            selected={selected}
            saveCartHandler={saveCartHandler}
          />
          <PaymentMethods />
        </div>
      ) : (
        <Empty />
      )}
      <ProductsSwiper products={women_swiper} />
    </div>
  );
};

export default CartPage;
