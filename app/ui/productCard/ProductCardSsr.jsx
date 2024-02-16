import React from "react";
import ProductCard from "./index";
import { fetchProductsMain } from "../../lib/data";

const ProductCardSsr = async () => {
  const products = await fetchProductsMain();

  return <ProductCard products={products} />;
};

export default ProductCardSsr;
