"use client";
import styles from "../../../styles/order.module.scss";
// import Header from "../../components/header";
// import Order from "../../models/Order";
// import User from "../../models/User";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "next/navigation";
// import db from "../../utils/db";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
// import StripePayment from "../ui/stripePayment";
import { getSession, useSession } from "next-auth/react";
import verficado from "../../../public/verified.png";
import UnVerficado from "../../../public/unverified.png";
function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
  }
}

export default function Order() {
  const { data: session, status } = useSession();
  const [orderData, setOrderData] = useState("");
  const id = useParams();
  //   console.log(session);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressNew = await axios.get(
          `https://fvshoppay.somee.com/api/OrdenCompra/${id.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado
        setOrderData(addressNew.data);
        // console.log(addressNew.data);
      } catch (error) {
        // Manejar errores
        console.error("Error al cambiar la dirección activa:", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
        throw error;
      }
    };
    if (status === "authenticated") {
      fetchData();
    }
  }, [session]);

  const postPaypalOrden = async () => {
    console.log(id.id);
    try {
      const response = await axios.post(
        `https://fvshoppay.somee.com/Paypal/OrdenCompra/${id.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        } // Agrega el encabezado con el token JWT
      );
      //   console.log(response);
      const paypalUrl = response.data.links[1].href;
      const popup = window.open(paypalUrl, "_blank", "width=600, height=400");
      if (popup) {
        // Puedes agregar más acciones aquí si es necesario
      } else {
        // Si la ventana emergente se bloqueó, puedes mostrar un mensaje al usuario.
        alert(
          "La ventana emergente se bloqueó. Por favor, habilite las ventanas emergentes en su navegador."
        );
      }

      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
    } catch (error) {
      console.error(error);
    }
  };
  //   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  //   const [dispatch] = useReducer(reducer, {
  //     loading: true,
  //     error: "",
  //     success: "",
  //   });
  //   useEffect(() => {
  //     if (!orderData._id) {
  //       dispatch({
  //         type: "PAY_RESET",
  //       });
  //     } else {
  //       paypalDispatch({
  //         type: "resetOptions",
  //         value: {
  //           "client-id": paypal_client_id,
  //           currency: "USD",
  //         },
  //       });
  //       paypalDispatch({
  //         type: "setLoadingStatus",
  //         value: "pending",
  //       });
  //     }
  //   }, [order]);
  function createOrderHanlder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderData.total,
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
  }
  function onApproveHandler(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/order/${orderData._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "PAY_ERROR", payload: error });
      }
    });
  }
  function onErroHandler(error) {
    console.log(error);
  }
  return (
    <>
      {/* <Header country="country" /> */}
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                {orderData.id}
              </div>
              <div className={styles.order__header_status}>
                Payment Status :{" "}
                {orderData.isPaid ? (
                  <img src={verficado.src} alt="paid" />
                ) : (
                  <img src={UnVerficado.src} alt="paid" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Order Status :
                <span
                  className={
                    orderData.estado == "Not Processed"
                      ? styles.not_processed
                      : orderData.estado == "pendiente"
                      ? styles.processing
                      : orderData.estado == "Dispatched"
                      ? styles.dispatched
                      : orderData.estado == "Cancelled"
                      ? styles.cancelled
                      : orderData.estado == "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {orderData.estado}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {orderData.detalleCompra?.map((product) => (
                <div className={styles.product} key={product._id}>
                  <div className={styles.product__img}>
                    <img
                      src={product.producto.imagenes[0].url}
                      alt={product.id}
                    />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.producto.id.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.producto.id}
                      ID
                    </h1>

                    <div className={styles.product__infos_priceQty}>
                      {product.producto.precio}$ x {product.cantidad}
                    </div>
                    <div className={styles.product__infos_total}>
                      {product.producto.precio * product.cantidad}$
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.order__products_total}>
                <div className={styles.order__products_total_sub}>
                  <span>Tax price</span>
                  <span>free tax +0$</span>
                </div>
                <div
                  className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                >
                  <span>TOTAL TO PAY</span>
                  <b>{orderData.total}$</b>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Customer's Order</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={session.user.imagen.url} alt="" />
                  <div>
                    <span>{session.user.nombre}</span>
                    <span>{session.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Shipping Address</h2>
                {session.user.dirreccion.map((dirreccion) =>
                  dirreccion.acitvo ? (
                    <div>
                      <span>
                        {dirreccion.nombre} {dirreccion.apellido}
                      </span>
                      <span>{dirreccion.address1}</span>
                      <span>{dirreccion.address2}</span>
                      <span>
                        {dirreccion.provincia},{dirreccion.ciudad}
                      </span>
                      <span>{dirreccion.zipCode}</span>
                      <span>{dirreccion.country}</span>
                    </div>
                  ) : null
                )}
              </div>
              {/* <div className={styles.order__address_shipping}>
                <h2>Billing Address</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.zipCode}</span>
                <span>{orderData.shippingAddress.country}</span>
              </div> */}
            </div>
            {orderData.valorPago === "null" ? (
              <div className={styles.order__payment}>
                <div>
                  <button
                    onClick={postPaypalOrden}
                    type="button"
                    class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                  >
                    <svg
                      class="mr-2 -ml-1 w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="paypal"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                      ></path>
                    </svg>
                    Check out with PayPal
                  </button>
                </div>

                {/* {orderData.paymentMethod == "credit_card" && (
                  <StripePayment
                    total={orderData.total}
                    order_id={orderData._id}
                    stripe_public_key={stripe_public_key}
                  />
                )}
                {orderData.paymentMethod == "cash" && (
                  <div className={styles.cash}>cash</div>
                )} */}
              </div>
            ) : (
              <h1>PAGADO</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
