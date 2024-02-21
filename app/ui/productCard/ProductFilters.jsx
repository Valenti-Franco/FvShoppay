"use client";
import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import ProductCardItem from "./ProductCardItem";
import { SwiperSlide } from "swiper/react";
import UpdateQueryString from "../browse/updateQueryString";

export default function ProductFilters() {
  const [products, setProducts] = useState([]);

  const { search, sizeid, colorid, brand, minPrice, maxPrice, SubCategory } =
    UpdateQueryString();
  let sizesQuery = false;
  let colorQuery = false;
  let brandQuery = false;
  let SubCategoryQuery = false;

  if (sizeid.length > 0) {
    sizesQuery = sizeid.map((size) => `idDetallesTamano=${size}`).join("&");
  }

  if (colorid.length > 0) {
    colorQuery = colorid.map((color) => `idColores=${color}`).join("&");
  }
  if (brand.length > 0) {
    brandQuery = brand.map((brand) => `idMarca=${brand}`);
  }
  if (SubCategory.length > 0) {
    SubCategoryQuery = SubCategory.map(
      (SubCategory) => `idSubcategoria=${SubCategory}`
    );
  }

  const queryParams = [sizesQuery, colorQuery, brandQuery, SubCategoryQuery]
    .filter(Boolean)
    .join("&");

  const separator = sizesQuery && colorQuery ? "&" : "";

  const dataFetch = async () => {
    try {
      const url = `https://fvecommerce.somee.com/api/Productos/Filtrar?${queryParams}&pagina=1&tamanoPagina=10&nombre=${search}`;
      const response = await axios.get(url);
      const products = response.data;
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);
  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(product.precio);
    // console.log(minPrice, maxPrice);
    // Verifica si el producto está dentro del rango de precios solo si priceMin y priceMax están presentes y no están vacíos
    return (
      (!minPrice ||
        minPrice.length === 0 ||
        productPrice >= parseFloat(minPrice)) &&
      (!maxPrice ||
        maxPrice.length === 0 ||
        productPrice <= parseFloat(maxPrice))
    );
  });
  // // Define the Menu function as an async function
  // // Use the delay function to pause execution for 3000 milliseconds (3 seconds)
  // await delay(3000);

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="flex flex-wrap  justify-center">
          {filteredProducts?.map((product) => (
            <SwiperSlide key={product.id} style={{ width: "300px" }}>
              <Suspense
                key={product.id}
                fallback={<div>Cargando Producto</div>}
              >
                <ProductCardItem product={product} key={product.id} />
              </Suspense>
            </SwiperSlide>
          ))}
        </div>
      ) : (
        <div class="flex mt-4 items-center w-full h-full justify-center bg-fixed bg-cover bg-bottom error-bg">
          <div class="row">
            <div class="col-sm-8 offset-sm-2 text-gray-900 text-center ">
              <div class=" w-16 h-16 ">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M9 17C9.85038 16.3697 10.8846 16 12 16C13.1154 16 14.1496 16.3697 15 17"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                    <ellipse
                      cx="15"
                      cy="10.5"
                      rx="1"
                      ry="1.5"
                      fill="#1C274C"
                    ></ellipse>{" "}
                    <ellipse
                      cx="9"
                      cy="10.5"
                      rx="1"
                      ry="1.5"
                      fill="#1C274C"
                    ></ellipse>{" "}
                    <path
                      d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>

                <span class="absolute  top-0   -ml-12  text-gray-600 font-semibold">
                  Oops!
                </span>
              </div>
              <h5 class="text-gray-600 font-semibold -mr-10 -mt-3">
                Page not found
              </h5>
              <p class="text-gray-600 mt-2 mb-6">
                We´re sorry, but we couldn´t find any products with the filters
                you requested.
              </p>
              <a
                href="/browse?search=all"
                class="bg-red-400  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
              >
                Clear Filters
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
