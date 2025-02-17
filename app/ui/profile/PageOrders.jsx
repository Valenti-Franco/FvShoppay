"use client";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { ordersLinks } from "../../data/profile";
// import Order from "../../models/Order";
import styles from "../../../styles/profile.module.scss";
import { FiExternalLink } from "react-icons/fi";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import verficado from "../../../public/verified.png";
import UnVerficado from "../../../public/unverified.png";

export default function PageOrders() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await axios.get(
          `https://fvecommerce.somee.com/api/OrdenCompra/usuario/${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado
        setOrders(ordersData.data);
        // console.log(ordersData.data);
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
  }, []);
  const [orders, setOrders] = useState([]);

  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    // Redirect to sign-in page if not authenticated
    router.replace("/Signin");
    return null;
  }

  return (
    <>
      <head>
        <title>Profile / Orders</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className={styles.orders}>
        <div className={styles.header}>
          <h1>MY ORDERS</h1>
        </div>
        <nav>
          <ul>
            {ordersLinks.map((link, i) => (
              <li
                key={i}
                // className={
                //   router.query.q &&
                //   router.query.q.includes("__") &&
                //   slugify(link.name, { lower: true }) ===
                //     router.query.q.split("__")[0]
                //     ? styles.active
                //     : ""
                // }
              >
                <Link
                  href={`/profile/orders?&q=${slugify(link.name, {
                    lower: true,
                  })}__${link.filter}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <table>
          <thead>
            <tr>
              <td>Order id</td>
              <td>Products</td>
              <td>Payment Method</td>
              <td>Total</td>
              <td>Paid</td>
              <td>Status</td>
              <td>view</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td className={styles.orders__images}>
                  {order.detalleCompra.map((p) => (
                    <img src={p.producto.imagenes[0].url} key={p._id} alt="" />
                  ))}
                </td>
                <td>Paypal</td>
                <td>{order.total}$</td>
                <td className={styles.orders__paid}>
                  {order.valorPago !== "null" ? (
                    <img src={verficado.src} alt="" />
                  ) : (
                    <img src={UnVerficado.src} alt="" />
                  )}
                </td>
                <td>{order.estado}</td>
                <td>
                  <Link href={`/order/${order.id}`}>
                    <FiExternalLink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
