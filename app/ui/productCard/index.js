"use client"
import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import axios from "axios";
import { Suspense } from "react";
import ProductCardItem from "./ProductCardItem";
import { SwiperSlide } from "swiper/react";

export default function ProductCard({ products }) {

  return (

    <div className="flex flex-wrap justify-center">

      {products.map(product => (
        <SwiperSlide key={product.id} style={{ width: "300px" }} >
          <Suspense key={product.id} fallback={<div>Cargando Producto</div>}>

            <ProductCardItem product={product} key={product.id} />
          </Suspense>
        </ SwiperSlide>
      ))}
    </div>

  );
}
