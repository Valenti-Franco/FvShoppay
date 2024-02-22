"use client";
import Layout from "../../ui/admin/layout";
import styles from "../../../styles/dashboard.module.scss";

import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "../../ui/admin/dashboard/dropdown";
import Notifications from "../../ui/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, navigate } from "next/navigation";
import { signOut, signIn } from "next-auth/react";

export default function IndexAdmin() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Users = await axios.get(
          `https://fvecommerce.somee.com/api/Usuarios/Admin`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado
        setUsers(Users.data);
      } catch (error) {
        // Manejar errores
        router.push("/Signin");

        signOut();
        console.error("Error al logear Admin", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
        throw error;
      }
      try {
        const Products = await axios.get(
          `https://fvecommerce.somee.com/api/Productos?pagina=1&tamanoPagina=100`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado
        setProducts(Products.data);
        // console.log(addressNew.data);
      } catch (error) {
        // Manejar errores
        router.push("/Signin");

        signOut();
        console.error("Error al logear Admin", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
        throw error;
      }
      try {
        const Orders = await axios.get(
          `https://fvecommerce.somee.com/api/OrdenCompra`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado
        setOrders(Orders.data);
        // console.log(Orders.data);

        // console.log(addressNew.data);
      } catch (error) {
        // Manejar errores
        router.push("/Signin");

        signOut();

        console.error("Error al logear Admin", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
      }
    };
    if (status === "authenticated") {
      fetchData();
    } else {
      router.push("/Signin");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Shoppay - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.imagen.url} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              {orders && (
                <>
                  <h4>+{orders.reduce((a, val) => a + val.total, 0)}$</h4>
                  <h5>
                    -
                    {orders
                      .filter((o) => o.valorPago !== "null")
                      .reduce((a, val) => a + val.total, 0)}
                    $ Unpaid yet.
                  </h5>
                </>
              )}

              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/orders">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.usuarioId}</td>
                    <td>{order.total} $</td>
                    <td>
                      {order.valorPago !== "null" ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.estado} ${
                          order.estado == "pendiente"
                            ? styles.not_processed
                            : order.estado == "Processing"
                            ? styles.processing
                            : order.estado == "Dispatched"
                            ? styles.dispatched
                            : order.estado == "Cancelled"
                            ? styles.cancelled
                            : order.estado == "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.estado}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order.id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>
            <table>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id}>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img
                          src={
                            user.imagen
                              ? user.imagen.url
                              : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <td>
                        <h4>{user.nobre}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}
