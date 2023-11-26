"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Infos from "./infos/Infos";
import MainSwiper from "./mainSwiper";
import styles from "../../../styles/product.module.scss";
import { useParams } from "next/navigation";

const ProductPage = () => {
  const id = useParams();
  const [product, setProduct] = useState([]);
  const [activeImg, setActiveImg] = useState("");

  const fetchProduct = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const response = await axios.get(
        `https://fvshoppay.somee.com/api/Productos/${id.id}`
      );

      setProduct(response.data);
      // setSelectedImage('');
      // setLightboxKey((prevKey) => prevKey + 1); // Actualizar la clave del componente SlideshowLightbox
      const puntoEncontrado = response.data.puntos.find(
        (punto) => punto.usuarioId === Auth.auth.id
      );
      // setPuntoUsuario(puntoEncontrado)
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);
  // console.log(id.id);

  return (
    <>
      {product.precio ? (
        <>
          {/* <Header country={country} /> */}
          <div className={styles.product}>
            <div className={styles.product__container}>
              <div className={styles.path}>
                Home / Product / {product.id}
                {/* {product.subCategories.map((sub) => ( */}
                <span> / {product.nombre}</span>
                {/* ))} */}
              </div>
              <div className={styles.product__main}>
                {product.imagenes ? (
                  <MainSwiper images={product.imagenes} activeImg={activeImg} />
                ) : (
                  <div> Loading.. </div>
                )}
                <Infos product={product} setActiveImg={setActiveImg} />
              </div>
              {/* <Reviews product={product} /> */}
              {/*
        <ProductsSwiper products={related} />
        */}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProductPage;
