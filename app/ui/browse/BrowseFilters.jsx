// "use client";
import React, { Suspense } from "react";
import styles from "../../../styles/browse.module.scss";
import ProductFilters from "../../ui/productCard/ProductFilters";
import CategoryFilter from "./categoryFilter";
import SizesFilter from "./sizesFilter";
import ColorsFilter from "./colorsFilter";
import BrandsFilter from "./brandsFilter";
import HeadingFilters from "./headingFilters";
import ClearFilter from "./ClearFilter";
const BrowseFilters = ({ categories, sizes, colors, brands }) => {
  return (
    <>
      <div className={`${styles.browse__store_filters} ${styles.scrollbar}`}>
        <ClearFilter />

        <CategoryFilter categories={categories} />
        <SizesFilter sizes={sizes} />
        <ColorsFilter colors={colors} />
        <BrandsFilter brands={brands} />
      </div>
      <div className={styles.browse__store_products_wrap}>
        <HeadingFilters />

        <div className={styles.browse__store_products}>
          <ProductFilters />
        </div>
      </div>
      {/* < className={styles.pagination}>
        {/* <Pagination
      count={paginationCount}
      defaultPage={Number(router.query.page) || 1}
      onChange={pageHandler}
      variant="outlined"
      color="primary"
    /> 
      </div> */}
    </>
  );
};

export default BrowseFilters;
