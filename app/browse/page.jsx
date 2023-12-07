import React from "react";
import PageBrowse from "../ui/browse/PageBrowse";
import axios from "axios";
const page = async () => {
  const responseCategory = await axios.get(
    `https://fvecommerce.somee.com/api/Category`
  );
  const categories = responseCategory.data;

  const responseColors = await axios.get(
    `https://fvecommerce.somee.com/api/Colores`
  );
  const colors = responseColors.data;

  const responseSize = await axios.get(
    `https://fvecommerce.somee.com/api/Tamanos`
  );
  const sizes = responseSize.data;

  const responseBrand = await axios.get(
    `https://fvecommerce.somee.com/api/Marcas`
  );
  const brands = responseBrand.data;

  return (
    <PageBrowse
      categories={categories}
      brands={brands}
      sizes={sizes}
      colors={colors}
    />
  );
};

export default page;
