"use client"

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ShippingInput from "../../inputs/shippingInput";
// import { applyCoupon } from "../../../requests/user";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [order_error, setOrder_Error] = useState("");
  const [total, setTotal] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(() => {
    // setShippingFee(
    //   selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    // );
    // setSubtotal(cart.reduce((a, c) => a + c.precio * c.qty, 0).toFixed(2));
    // console.log("cart --->", cart)
    if (cart.cartItems.length > 0) {

      setTotal(cart.cartItems.reduce((a, c) => a + c.precio * c.qty, 0).toFixed(2));
    }
  }, []);



  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Pleace enter a coupon first !"),
  });
  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError("");
    }
  };


  const handlerCrearOrden = async () => {
    try {

      const response = await axios.post(
        `https://fvshoppay.somee.com/api/OrdenCompra/${session.user.id}`, {},
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );



      // Itera a través de los productos en el carrito y crea detalles para cada uno
      for (const item of cart.cartItems) {
        await handlerCrearDetalle(item, response.data.id);
        // console.log(item)
      }
      console.log(response.data)
      router.push(`/order/${response.data.id}`);
    } catch (error) {
      console.log('Debes Iniciar Sesión para Pagar')


      console.error(error);
    }
  };

  const handlerCrearDetalle = async (item, idOrden) => {
    console.log(item)
    try {
      const response = await axios.post(
        `https://fvshoppay.somee.com/api/DetalleCompra/${idOrden}/${item.id}/${item.qty}`, {},
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      // console.log(response)
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Debes Iniciar Sesión para comprar", {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
        navigate("/login")
      } else {
        toast.error(error.response.data, {
          position: 'top-right', // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      console.error(error);
      // Manejar el error al crear el detalle
    }
  };
  const placeOrderHandler = async () => {
    try {

      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });
      Router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrder_Error(error.response.data.message);
    }
  };
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => {
            applyCouponHandler();
          }}
        >
          {(formik) => (
            <Form>
              {/* <ShippingInput
                name="coupon"
                placeholder="*Coupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error && <span className={styles.error}>{error}</span>}
              <button className={styles.apply_btn} type="submit">
                Apply
              </button> */}
              <div className={styles.infos}>
                <span>
                  Total : <b>{total}$</b>{" "}
                </span>
                {/* {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Coupon applied : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal &&
                  totalAfterDiscount != "" && (
                    <span>
                      New price : <b>{totalAfterDiscount}$</b>
                    </span>
                  )} */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => handlerCrearOrden()}>
        Place Order
      </button>
      {order_error && <span className={styles.error}>{order_error}</span>}
    </div>
  );
}
