"use client";

// import styles from "../styles/browse.module.scss";
import styles from "../../../styles/browse.module.scss";
import ProductFilters from "../../ui/productCard/ProductFilters";
// import db from "../utils/db";
// import Product from "../models/Product";
// import Category from "../models/Category";
// import Header from "../components/header";
// import SubCategory from "../models/SubCategory";
import {
  filterArray,
  randomize,
  removeDuplicates,
} from "../.../../../../utils/arrays_utils";
// } from "../.../../../../utils";

import Link from "next/link";
import ProductCard from "../productCard";
import CategoryFilter from "./categoryFilter";
import SizesFilter from "./sizesFilter";
import ColorsFilter from "./colorsFilter";
import BrandsFilter from "./brandsFilter";
// import StylesFilter from "./stylesFilter";
// import PatternsFilter from "./patternsFilter";
// import MaterialsFilter from "./materialsFilter";
// import GenderFilter from "./genderFilter";
import HeadingFilters from "./headingFilters";
// import { useRouter } from "next/router";
// import router from "next/router";

import { Pagination } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
  redirect,
} from "next/navigation";
import { useState } from "react";
import Head from "next/head";

export default function Browse({ categories, sizes, colors, brands }) {
  // console.log(categories);
  const router = useRouter();
  const { push } = useRouter();
  const valor = useSearchParams();

  const search = valor.get("search");
  const size = valor.getAll("idDetallesTamano");
  const color = valor.getAll("idColores");
  const brand = valor.getAll("idMarca");
  const minPrice = valor.getAll("minPrice");
  const maxPrice = valor.getAll("maxPrice");
  const SubCategory = valor.getAll("idSubCategory");

  const totalFilters =
    (search !== "all" ? 1 : 0) +
    size.length +
    color.length +
    brand.length +
    minPrice.length +
    maxPrice.length;

  const categoryHandler = (category) => {
    console.log(category);
  };

  const brandHandler = (brand) => {
    console.log(brands);
  };
  const updateQueryString = (selectedValues, type) => {
    const existingSearch = valor.get("search") || "all";
    const existingColors = valor.getAll("idColores") || false;
    const existingSizes = valor.getAll("idDetallesTamano") || false;
    const existingBrand = valor.getAll("idMarca") || false;
    const existingMinPrice = valor.getAll("minPrice") || false;
    const existingMaxPrice = valor.getAll("maxPrice") || false;
    const existingSubcategory = valor.getAll("idSubCategory") || false;

    let queryStringColors = "";
    let queryStringSizes = "";
    let queryStringBrand = "";
    let queryStringMinPrice = "";
    let queryStringMaxPrice = "";
    let queryStringSubcategory = "";

    if (type === "subcategory") {
      queryStringSubcategory = selectedValues
        .map((subcategory) => `idSubCategory=${subcategory}`)
        .join("&");

      if (existingColors) {
        queryStringColors = existingColors
          .map((color) => `idColores=${color}`)
          .join("&");
      }
      if (existingSizes) {
        queryStringSizes = existingSizes
          .map((size) => `idDetallesTamano=${size}`)
          .join("&");
      }
      if (existingBrand) {
        queryStringBrand = existingBrand
          .map((brand) => `idMarca=${brand}`)
          .join("&");
      }
      if (existingMinPrice) {
        queryStringMinPrice = existingMinPrice
          .map((minPrice) => `minPrice=${minPrice}`)
          .join("&");
      }
      if (existingMaxPrice) {
        queryStringMaxPrice = existingMaxPrice
          .map((maxPrice) => `maxPrice=${maxPrice}`)
          .join("&");
      }
    }
    if (type === "color") {
      queryStringColors = selectedValues
        .map((color) => `idColores=${color}`)
        .join("&");

      if (existingSubcategory) {
        queryStringSubcategory = existingSubcategory
          .map((subcategory) => `idSubCategory=${subcategory}`)
          .join("&");
      }

      if (existingSizes) {
        queryStringSizes = existingSizes
          .map((size) => `idDetallesTamano=${size}`)
          .join("&");
      }
      if (existingBrand) {
        queryStringBrand = existingBrand
          .map((brand) => `idMarca=${brand}`)
          .join("&");
      }
      if (existingMinPrice) {
        queryStringMinPrice = existingMinPrice
          .map((minPrice) => `minPrice=${minPrice}`)
          .join("&");
      }
      if (existingMaxPrice) {
        queryStringMaxPrice = existingMaxPrice
          .map((maxPrice) => `maxPrice=${maxPrice}`)
          .join("&");
      }
    } else if (type === "size") {
      queryStringSizes = selectedValues
        .map((size) => `idDetallesTamano=${size}`)
        .join("&");

      if (existingColors) {
        queryStringColors = existingColors
          .map((color) => `idColores=${color}`)
          .join("&");
      }
      if (existingSubcategory) {
        queryStringSubcategory = existingSubcategory
          .map((subcategory) => `idSubCategory=${subcategory}`)
          .join("&");
      }
      if (existingBrand) {
        queryStringBrand = existingBrand
          .map((brand) => `idMarca=${brand}`)
          .join("&");
      }
      if (existingMinPrice) {
        queryStringMinPrice = existingMinPrice
          .map((minPrice) => `minPrice=${minPrice}`)
          .join("&");
      }
      if (existingMaxPrice) {
        queryStringMaxPrice = existingMaxPrice
          .map((maxPrice) => `maxPrice=${maxPrice}`)
          .join("&");
      }
    } else if (type === "brand") {
      // console.log(existingBrand);
      if (selectedValues) {
        queryStringBrand = `idMarca=${selectedValues}`;
      }
      // console.log(first)

      if (existingSubcategory) {
        queryStringSubcategory = existingSubcategory
          .map((subcategory) => `idSubCategory=${subcategory}`)
          .join("&");
      }
      if (existingColors) {
        queryStringColors = existingColors
          .map((color) => `idColores=${color}`)
          .join("&");
      }
      if (existingSizes) {
        queryStringSizes = existingSizes
          .map((size) => `idDetallesTamano=${size}`)
          .join("&");
      }
      if (existingMinPrice) {
        queryStringMinPrice = existingMinPrice
          .map((minPrice) => `minPrice=${minPrice}`)
          .join("&");
      }
      if (existingMaxPrice) {
        queryStringMinPrice = existingMinPrice
          .map((minPrice) => `minPrice=${minPrice}`)
          .join("&");
      }
    } else if (type === "minPrice") {
      queryStringMinPrice = `minPrice=${selectedValues}`;

      if (existingColors) {
        queryStringColors = existingColors
          .map((color) => `idColores=${color}`)
          .join("&");
      }
      if (existingSubcategory) {
        queryStringSubcategory = existingSubcategory
          .map((subcategory) => `idSubCategory=${subcategory}`)
          .join("&");
      }
      if (existingSizes) {
        queryStringSizes = existingSizes
          .map((size) => `idDetallesTamano=${size}`)
          .join("&");
      }
      if (existingBrand) {
        queryStringBrand = existingBrand
          .map((brand) => `idMarca=${brand}`)
          .join("&");
      }
      if (existingMaxPrice) {
        queryStringMaxPrice = existingMaxPrice
          .map((maxPrice) => `maxPrice=${maxPrice}`)
          .join("&");
      }
    } else if (type === "maxPrice") {
      queryStringMaxPrice = `maxPrice=${selectedValues}`;

      if (existingColors) {
        queryStringColors = existingColors
          .map((color) => `idColores=${color}`)
          .join("&");
      }
      if (existingSubcategory) {
        queryStringSubcategory = existingSubcategory
          .map((subcategory) => `idSubCategory=${subcategory}`)
          .join("&");
      }
      if (existingSizes) {
        queryStringSizes = existingSizes
          .map((size) => `idDetallesTamano=${size}`)
          .join("&");
      }
      if (existingBrand) {
        queryStringBrand = existingBrand
          .map((brand) => `idMarca=${brand}`)
          .join("&");
      }
      if (existingMinPrice) {
        queryStringMinPrice = existingMinPrice
          .map((minPrice) => `minPrice=${minPrice}`)
          .join("&");
      }
    } else if (type === "price") {
      queryStringMinPrice = `minPrice=${selectedValues[0]}`;
      queryStringMaxPrice = `maxPrice=${selectedValues[1]}`;

      if (existingColors) {
        queryStringColors = existingColors
          .map((color) => `idColores=${color}`)
          .join("&");
      }
      if (existingSubcategory) {
        queryStringSubcategory = existingSubcategory
          .map((subcategory) => `idSubCategory=${subcategory}`)
          .join("&");
      }
      if (existingSizes) {
        queryStringSizes = existingSizes
          .map((size) => `idDetallesTamano=${size}`)
          .join("&");
      }
      if (existingBrand) {
        queryStringBrand = existingBrand
          .map((brand) => `idMarca=${brand}`)
          .join("&");
      }
    }

    return `/browse?search=${existingSearch}&${queryStringSizes}&${queryStringColors}&${queryStringSubcategory}&${queryStringBrand}&${queryStringMinPrice}&${queryStringMaxPrice}`;
  };

  // const colorHandler = (selectedColors) => {
  //   const existingSearch = valor.get("search") || "all";
  //   const existingSizes = valor.getAll("idDetallesTamano") || false;

  //   let queryStringSizes = "";
  //   let queryStringColors = "";

  //   queryStringColors = selectedColors
  //     .map((color) => `idColores=${color}`)
  //     .join("&");

  //   if (existingSizes) {
  //     queryStringSizes = existingSizes
  //       .map((size) => `idDetallesTamano=${size}`)
  //       .join("&");
  //   }

  //   push(
  //     `/browse?search=${existingSearch}&${
  //       existingSizes ? queryStringSizes : null
  //     }&${queryStringColors}`
  //   );
  // };

  const patternHandler = (pattern) => {
    filter({ pattern });
  };
  const materialHandler = (material) => {
    filter({ material });
  };
  const genderHandler = (gender) => {
    if (gender == "Unisex") {
      filter({ gender: {} });
    } else {
      filter({ gender });
    }
  };
  // const priceHandler = (price, type) => {
  //   // console.log("price --->", price);
  //   // let priceQuery = router.query?.price?.split("_") || "";
  //   // if (type == "min") {
  //   //   console.log("newPrice ---->", price);
  //   //   setminprice(price);
  //   // } else {
  //   //   console.log("maxPrice ---->", price);
  //   //   setmaxprice(price);
  //   // }
  // };
  const multiPriceHandler = (min, max) => {
    filter({ price: `${min}_${max}` });
  };
  const shippingHandler = (shipping) => {
    filter({ shipping });
  };
  const ratingHandler = (rating) => {
    filter({ rating });
  };
  const sortHandler = (sort) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };
  const pageHandler = (e, page) => {
    filter({ page });
  };
  //----------
  function checkChecked(queryName, value) {
    if (router.query[queryName]?.search(value) !== -1) {
      return true;
    }
    return false;
  }

  return (
    <div className={styles.browse}>
      <head>
        <title>Home / Browse</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className={styles.browse__container}>
        <div>
          <div className={styles.browse__path}>Home / Browse</div>
          <div className={styles.browse__tags}>
            {categories.map((c) =>
              c.subCategory.map((sub) => (
                <a
                  href={`/browse?search=all&idSubCategory=${sub.id}`}
                  key={sub.id}
                >
                  {sub.nombre}
                </a>
              ))
            )}
          </div>
        </div>
        <div className={`${styles.browse__store} `}>
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <a className={styles.browse__clearBtn} href={"/browse?search=all"}>
              Clear All ({totalFilters})
            </a>
            <CategoryFilter
              categories={categories}
              SubCategory={SubCategory}
              // subCategories={subCategories}
              categoryHandler={categoryHandler}
              updateQueryString={updateQueryString}

              // replaceQuery={replaceQuery}
            />
            <SizesFilter
              sizes={sizes}
              sizeid={size}
              // sizeHandler={sizeHandler}
              updateQueryString={updateQueryString}
            />
            <ColorsFilter
              colorid={color}
              colors={colors}
              // colorHandler={colorHandler}
              updateQueryString={updateQueryString}

              // replaceQuery={replaceQuery}
            />
            <BrandsFilter
              brand={brand}
              brands={brands}
              brandHandler={brandHandler}
              updateQueryString={updateQueryString}

              // replaceQuery={replaceQuery}
            />

            {/* <PatternsFilter
              patterns={patterns}
              patternHandler={patternHandler}
              replaceQuery={replaceQuery}
            />
            <MaterialsFilter
              materials={materials}
              materialHandler={materialHandler}
              replaceQuery={replaceQuery}
            />
            <GenderFilter
              genderHandler={genderHandler}
              replaceQuery={replaceQuery}
            /> */}
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters
              updateQueryString={updateQueryString}
              minPrice={minPrice}
              maxPrice={maxPrice}
              // priceHandler={priceHandler}
              // multiPriceHandler={multiPriceHandler}
              // shippingHandler={shippingHandler}
              // ratingHandler={ratingHandler}
              // replaceQuery={replaceQuery}
              // sortHandler={sortHandler}
            />
            <div className={styles.browse__store_products}>
              <ProductFilters
                search={search}
                brand={brand}
                size={size}
                color={color}
                minPrice={minPrice}
                maxPrice={maxPrice}
                SubCategory={SubCategory}
              />
            </div>
            <div className={styles.pagination}>
              {/* <Pagination
                count={paginationCount}
                defaultPage={Number(router.query.page) || 1}
                onChange={pageHandler}
                variant="outlined"
                color="primary"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   const { query } = ctx;
//   //-------------------------------------------------->
//   const searchQuery = query.search || "";
//   const categoryQuery = query.category || "";
//   const genderQuery = query.gender || "";
//   const priceQuery = query.price?.split("_") || "";
//   const shippingQuery = query.shipping || 0;
//   const ratingQuery = query.rating || "";
//   const sortQuery = query.sort || "";
//   const pageSize = 50;
//   const page = query.page || 1;

//   //-----------
//   const brandQuery = query.brand?.split("_") || "";
//   const brandRegex = `^${brandQuery[0]}`;
//   const brandSearchRegex = createRegex(brandQuery, brandRegex);
//   //-----------
//   //-----------
//   const styleQuery = query.style?.split("_") || "";
//   const styleRegex = `^${styleQuery[0]}`;
//   const styleSearchRegex = createRegex(styleQuery, styleRegex);
//   //-----------
//   //-----------
//   const patternQuery = query.pattern?.split("_") || "";
//   const patternRegex = `^${patternQuery[0]}`;
//   const patternSearchRegex = createRegex(patternQuery, patternRegex);
//   //-----------
//   //-----------
//   const materialQuery = query.material?.split("_") || "";
//   const materialRegex = `^${materialQuery[0]}`;
//   const materialSearchRegex = createRegex(materialQuery, materialRegex);
//   //-----------
//   const sizeQuery = query.size?.split("_") || "";
//   const sizeRegex = `^${sizeQuery[0]}`;
//   const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);
//   //-----------
//   const colorQuery = query.color?.split("_") || "";
//   const colorRegex = `^${colorQuery[0]}`;
//   const colorSearchRegex = createRegex(colorQuery, colorRegex);
//   //-------------------------------------------------->
//   const search =
//     searchQuery && searchQuery !== ""
//       ? {
//           name: {
//             $regex: searchQuery,
//             $options: "i",
//           },
//         }
//       : {};
//   const category =
//     categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};

//   const style =
//     styleQuery && styleQuery !== ""
//       ? {
//           "details.value": {
//             $regex: styleSearchRegex,
//             $options: "i",
//           },
//         }
//       : {};
//   const size =
//     sizeQuery && sizeQuery !== ""
//       ? {
//           "subProducts.sizes.size": {
//             $regex: sizeSearchRegex,
//             $options: "i",
//           },
//         }
//       : {};
//   const color =
//     colorQuery && colorQuery !== ""
//       ? {
//           "subProducts.color.color": {
//             $regex: colorSearchRegex,
//             $options: "i",
//           },
//         }
//       : {};
//   const brand =
//     brandQuery && brandQuery !== ""
//       ? {
//           brand: {
//             $regex: brandSearchRegex,
//             $options: "i",
//           },
//         }
//       : {};
//   const pattern =
//     patternQuery && patternQuery !== ""
//       ? {
//           "details.value": {
//             $regex: patternSearchRegex,
//             $options: "i",
//           },
//         }
//       : {};
//   const material =
//     materialQuery && materialQuery !== ""
//       ? {
//           "details.value": {
//             $regex: materialSearchRegex,
//             $options: "i",
//           },
//         }
//       : {};
//   const gender =
//     genderQuery && genderQuery !== ""
//       ? {
//           "details.value": {
//             $regex: genderQuery,
//             $options: "i",
//           },
//         }
//       : {};
//   const price =
//     priceQuery && priceQuery !== ""
//       ? {
//           "subProducts.sizes.price": {
//             $gte: Number(priceQuery[0]) || 0,
//             $lte: Number(priceQuery[1]) || Infinity,
//           },
//         }
//       : {};
//   const shipping =
//     shippingQuery && shippingQuery == "0"
//       ? {
//           shipping: 0,
//         }
//       : {};
//   const rating =
//     ratingQuery && ratingQuery !== ""
//       ? {
//           rating: {
//             $gte: Number(ratingQuery),
//           },
//         }
//       : {};
//   const sort =
//     sortQuery == ""
//       ? {}
//       : sortQuery == "popular"
//       ? { rating: -1, "subProducts.sold": -1 }
//       : sortQuery == "newest"
//       ? { createdAt: -1 }
//       : sortQuery == "topSelling"
//       ? { "subProducts.sold": -1 }
//       : sortQuery == "topReviewed"
//       ? { rating: -1 }
//       : sortQuery == "priceHighToLow"
//       ? { "subProducts.sizes.price": -1 }
//       : sortQuery == "priceLowToHigh"
//       ? { "subProducts.sizes.price": 1 }
//       : {};
//   //-------------------------------------------------->
//   //-------------------------------------------------->
//   function createRegex(data, styleRegex) {
//     if (data.length > 1) {
//       for (var i = 1; i < data.length; i++) {
//         styleRegex += `|^${data[i]}`;
//       }
//     }
//     return styleRegex;
//   }
//   let data = await axios
//     .get("https://api.ipregistry.co/?key=r208izz0q0icseks")
//     .then((res) => {
//       return res.data.location.country;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   //-------------------------------------------------->
//   db.connectDb();
//   let productsDb = await Product.find({
//     ...search,
//     ...category,
//     ...brand,
//     ...style,
//     ...size,
//     ...color,
//     ...pattern,
//     ...material,
//     ...gender,
//     ...price,
//     ...shipping,
//     ...rating,
//   })
//     .skip(pageSize * (page - 1))
//     .limit(pageSize)
//     .sort(sort)
//     .lean();
//   let products =
//     sortQuery && sortQuery !== "" ? productsDb : randomize(productsDb);
//   let categories = await Category.find().lean();
//   let subCategories = await SubCategory.find()
//     .populate({
//       path: "parent",
//       model: Category,
//     })
//     .lean();
//   let colors = await Product.find({ ...category }).distinct(
//     "subProducts.color.color"
//   );
//   let brandsDb = await Product.find({ ...category }).distinct("brand");
//   let sizes = await Product.find({ ...category }).distinct(
//     "subProducts.sizes.size"
//   );
//   let details = await Product.find({ ...category }).distinct("details");
//   let stylesDb = filterArray(details, "Style");
//   let patternsDb = filterArray(details, "Pattern Type");
//   let materialsDb = filterArray(details, "Material");
//   let styles = removeDuplicates(stylesDb);
//   let patterns = removeDuplicates(patternsDb);
//   let materials = removeDuplicates(materialsDb);
//   let brands = removeDuplicates(brandsDb);
//   let totalProducts = await Product.countDocuments({
//     ...search,
//     ...category,
//     ...brand,
//     ...style,
//     ...size,
//     ...color,
//     ...pattern,
//     ...material,
//     ...gender,
//     ...price,
//     ...shipping,
//     ...rating,
//   });
//   return {
//     props: {
//       categories: JSON.parse(JSON.stringify(categories)),
//       subCategories: JSON.parse(JSON.stringify(subCategories)),
//       products: JSON.parse(JSON.stringify(products)),
//       sizes,
//       colors,
//       brands,
//       stylesData: styles,
//       patterns,
//       materials,
//       paginationCount: Math.ceil(totalProducts / pageSize),
//       country:{name: data.name, flag: data.flag.emojitwo},

//     },
//   };
// }
