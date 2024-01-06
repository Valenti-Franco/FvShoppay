"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Infos from "./infos/Infos";
import MainSwiper from "./mainSwiper";
import styles from "../../../styles/product.module.scss";
import styles1 from "./infos/styles.module.scss";
import { Helmet } from "react-helmet";
import { useParams } from "next/navigation";
import ContentLoader from "react-content-loader";
import Link from "next/link";

const ProductPage = () => {
  const id = useParams();
  const [product, setProduct] = useState([]);
  const [activeImg, setActiveImg] = useState("");

  const fetchProduct = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 300000));
    try {
      const response = await axios.get(
        `https://fvecommerce.somee.com/api/Productos/${id.id}`
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
      {product.precio && product.nombre ? (
        <>
          <Helmet>
            <title>Home / Product / {product.nombre}</title>
            <meta property="og:title" content="My page title" key="title" />
            <link rel="icon" href="/favicon.ico" />
          </Helmet>
          {/* <Header country={country} /> */}
          <div className={styles.product}>
            <div className={styles.product__container}>
              <div className={styles.path}>
                <Link href="/">Home </Link> / Product{" "}
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
      ) : (
        <div className={styles.product}>
          <div className={styles.product__container}>
            {/* <div className={styles.path}></div> */}
            <div className={styles.product__main}>
              <div className={styles.swiper}>
                <ContentLoader
                  speed={2}
                  width={"100%"}
                  height={"300"}
                  className="h-600 sm:hidden"
                  backgroundColor="#dfdddd"
                  foregroundColor="#d0cdcf"
                >
                  <rect
                    x="0"
                    y="0"
                    rx="10"
                    ry="10"
                    width="100%"
                    height="100%"
                  />
                </ContentLoader>

                <ContentLoader
                  speed={2}
                  width={"100%"}
                  height={"600"}
                  className="sm:h-300 hidden sm:block"
                  backgroundColor="#dfdddd"
                  foregroundColor="#d0cdcf"
                >
                  <rect
                    x="0"
                    y="0"
                    rx="10"
                    ry="10"
                    width="100%"
                    height="100%"
                  />
                </ContentLoader>
              </div>

              {/* <Infos product={product} setActiveImg={setActiveImg} /> */}
              <div className={styles1.infos}>
                {/* <DialogModal /> */}
                <div className={styles1.infos__container}>
                  <h1 className={styles1.infos__name}>
                    <ContentLoader
                      speed={2}
                      width={"100%"}
                      height={"50"}
                      className=" my-2"
                      backgroundColor="#dfdddd"
                      foregroundColor="#d0cdcf"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </h1>
                  <h2 className={styles1.infos__sku}>
                    <ContentLoader
                      speed={2}
                      width={"100%"}
                      height={"50"}
                      className=" my-2"
                      backgroundColor="#dfdddd"
                      foregroundColor="#d0cdcf"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </h2>
                  <div className={styles1.infos__rating}>
                    <ContentLoader
                      speed={2}
                      width={"100%"}
                      height={"50"}
                      className=" my-2"
                      backgroundColor="#dfdddd"
                      foregroundColor="#d0cdcf"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </div>
                  <div className={styles1.infos__price}>
                    {/* {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}$</h1>} */}
                    <h1>
                      <ContentLoader
                        speed={2}
                        width={"100%"}
                        height={"50"}
                        className=" my-2"
                        backgroundColor="#dfdddd"
                        foregroundColor="#d0cdcf"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="10"
                          ry="10"
                          width="100%"
                          height="100%"
                        />
                      </ContentLoader>
                    </h1>
                    {/* {product.discount > 0 ? ( */}
                    <h3>
                      <span>
                        <ContentLoader
                          speed={2}
                          width={"100%"}
                          height={"50"}
                          className=" my-2"
                          backgroundColor="#dfdddd"
                          foregroundColor="#d0cdcf"
                        >
                          <rect
                            x="0"
                            y="0"
                            rx="10"
                            ry="10"
                            width="100%"
                            height="100%"
                          />
                        </ContentLoader>
                      </span>
                      <span>
                        <ContentLoader
                          speed={2}
                          width={"100%"}
                          height={"50"}
                          className=" my-2"
                          backgroundColor="#dfdddd"
                          foregroundColor="#d0cdcf"
                        >
                          <rect
                            x="0"
                            y="0"
                            rx="10"
                            ry="10"
                            width="100%"
                            height="100%"
                          />
                        </ContentLoader>
                      </span>
                    </h3>
                  </div>
                  <span className={styles1.infos__shipping}>
                    <ContentLoader
                      speed={2}
                      width={"100%"}
                      height={"30"}
                      className=" my-2"
                      backgroundColor="#dfdddd"
                      foregroundColor="#d0cdcf"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </span>
                  <div className={styles1.infos__qty}>
                    <ContentLoader
                      speed={2}
                      width={"100%"}
                      height={"100"}
                      className=" my-2"
                      backgroundColor="#dfdddd"
                      foregroundColor="#d0cdcf"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </div>
                  <div className={styles1.infos__actions}>
                    <ContentLoader
                      speed={2}
                      width={"100%"}
                      height={"150"}
                      className=" my-2"
                      backgroundColor="#dfdddd"
                      foregroundColor="#d0cdcf"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                      />
                    </ContentLoader>
                  </div>
                </div>
              </div>
            </div>
            {/* <Reviews product={product} /> */}
            {/*
        <ProductsSwiper products={related} />
        */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
