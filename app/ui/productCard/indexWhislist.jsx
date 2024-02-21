"use client";
import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import ProductCardItem from "./ProductCardItem";
import { SwiperSlide } from "swiper/react";
import { useSession } from "next-auth/react";
// import { BsHeart } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
// MdDelete
export default function ProductCard() {
  const { data: session, status } = useSession();

  const [products, setproducts] = useState([]);

  const DeleteFavorito = async (id) => {
    try {
      const ordersData = await axios.delete(
        `https://fvecommerce.somee.com/api/Usuarios/Favorito/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      // Si la solicitud fue exitosa, actualiza las direcciones en el estado
      fetchData();
      console.log(ordersData);
    } catch (error) {
      // Manejar errores
      console.error("Error al cambiar la dirección activa:", error);
      // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
      throw error;
    }
  };
  const fetchData = async () => {
    // console.log(session?.user.token);
    try {
      const ordersData = await axios.get(
        `https://fvecommerce.somee.com/api/Usuarios/Favoritos/Usuario`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      // Si la solicitud fue exitosa, actualiza las direcciones en el estado
      setproducts(ordersData.data);

      console.log(ordersData.data);
    } catch (error) {
      // Manejar errores
      // console.log("xd");
      // console.log(products);
      // console.error("Error al cambiar la dirección activa:", error);
      // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
      // throw error;
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, []);
  // console.log(products);
  return (
    <>
      <head>
        <title>Profile / Wishlist</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      WISHLIST
      <div className="flex flex-wrap justify-center">
        {products.length === 0 ? (
          <h2>You have no products in your Wishlist</h2>
        ) : (
          products.map((product) => (
            <div className="flex flex-col  p-3" key={product.id}>
              <button
                onClick={() => DeleteFavorito(product.id)}
                class=" w-auto inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
              <SwiperSlide key={product.id} style={{ width: "300px" }}>
                <Suspense
                  key={product.id}
                  fallback={<div>Cargando Producto</div>}
                >
                  <ProductCardItem
                    product={product.producto}
                    key={product.id}
                  />
                </Suspense>
              </SwiperSlide>
            </div>
          ))
        )}
      </div>
    </>
  );
}
