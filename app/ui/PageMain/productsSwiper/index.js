"use client"
import styles from "./styles.module.scss";
// import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import Image from "next/image";
import ProductCardItem from "../../productCard/ProductCardItem";
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function ProductsSwiper({ header, products, bg, category }) {

  return (
    <div className={styles.wrapper}>
      {header && (
        <div
          className={styles.header}
          style={{ background: `${bg ? bg : ""}` }}
        >
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {/* solo los productos igual a product.categoryId = category */}
        {products
          .filter(product => product.categoryId == category)
          .map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCardItem product={product} key={product.id} />
              {/* <div className={styles.product}>
                <div className={styles.product__img}>
                  <Image width={150} height={100} src={product?.imagenes[0]?.url} alt="" />
                </div>
                <div className={styles.product__infos}>
                  <h1>
                    {product.nombre.length > 30
                      ? `${product.nombre.slice(0, 30)}...`
                      : product.nombre}
                  </h1>
                  {product.price && <span>USD{product.precio}$</span>}
                </div>
              </div> */}
            </SwiperSlide>
          ))}
      </Swiper>

    </div>
  );
}
