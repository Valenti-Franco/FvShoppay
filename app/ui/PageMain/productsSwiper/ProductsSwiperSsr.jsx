import React from "react";
import ProductsSwiper from "./index";
import { fetchProducts } from "../../../lib/data";
const ProductsSwiperSsr = async ({ bg, header, category }) => {
  const products = await fetchProducts();

  return (
    <ProductsSwiper
      products={products}
      bg={bg}
      header={header}
      category={category}
    />
  );
};

export default ProductsSwiperSsr;
