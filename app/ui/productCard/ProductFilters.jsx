import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import axios from "axios";
import { Suspense } from "react";
import ProductCardItem from "./ProductCardItem";
import { SwiperSlide } from "swiper/react";

export default async function ProductFilters({ search, brand, size, color }) {
  // console.log("search ------------------->", search);
  // console.log(size);
  let sizesQuery = false;
  let colorQuery = false;
  let brandQuery = false;

  if (size.length > 0) {
    sizesQuery = size.map((size) => `idDetallesTamano=${size}`).join("&");
  }

  if (color.length > 0) {
    colorQuery = color.map((color) => `idColores=${color}`).join("&");
  }
  if (brand.length > 0) {
    brandQuery = brand.map((brand) => `idMarca=${brand}`);
  }

  const queryParams = [sizesQuery, colorQuery, brandQuery]
    .filter(Boolean)
    .join("&");

  const separator = sizesQuery && colorQuery ? "&" : "";

  const url = `https://fvecommerce.somee.com/api/Productos/Filtrar?${queryParams}&pagina=1&tamanoPagina=10&nombre=${search}`;

  const response = await axios.get(url);
  const products = response.data;
  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // // Define the Menu function as an async function
  // // Use the delay function to pause execution for 3000 milliseconds (3 seconds)
  // await delay(3000);

  return (
    <div className="flex flex-wrap justify-center">
      {products?.map((product) => (
        <SwiperSlide key={product.id} style={{ width: "300px" }}>
          <Suspense key={product.id} fallback={<div>Cargando Producto</div>}>
            <ProductCardItem product={product} key={product.id} />
          </Suspense>
        </SwiperSlide>
      ))}
    </div>
  );
}
