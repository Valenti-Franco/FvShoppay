// "use client";
// import styles from "../../../styles/product.module.scss";
// import React, { useEffect, useState } from "react";
import Loading from "../../ui/loaders/dotLoader";

import { Suspense } from "react";
import ProductPage from "../../ui/productPage/ProductPage";

const Page = async () => {
  return <ProductPage />;
};

export default Page;
