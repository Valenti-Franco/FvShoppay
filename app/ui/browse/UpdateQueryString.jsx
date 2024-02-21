import React from "react";
import { useSearchParams } from "next/navigation";

const UpdateQueryString = () => {
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
    SubCategory.length +
    size.length +
    color.length +
    brand.length +
    minPrice.length +
    maxPrice.length;

  // console.log(totalFilters, "totalFilters")

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

  const updateQueryString = (selectedValues, type) => {
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
  return {
    updateQueryString,
    totalFilters,
    SubCategory,
    sizeid: size,
    colorid: color,
    brand,
    minPrice,
    maxPrice,
    search,
  };
};

export default UpdateQueryString;
