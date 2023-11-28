import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import axios from "axios";
import { Suspense } from "react";
import ProductCardItem from "./ProductCardItem";
import { SwiperSlide } from "swiper/react";

export default async function ProductCard() {
  const response = await axios.get('https://fvshoppay.somee.com/api/Productos');
  const products = response.data;

  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // // Define the Menu function as an async function
  // // Use the delay function to pause execution for 3000 milliseconds (3 seconds)
  // await delay(3000);

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
