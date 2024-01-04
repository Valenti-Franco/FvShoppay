"use client";
import React, { useState } from "react";
import Create from "./Create";
import List from "./List";

import Layout from "../layout";
import { ToastContainer } from "react-toastify";

const SizesAdmin = ({ datasize, dataDetail, dataSubcategory }) => {
  const [sizes, setSizes] = useState(datasize);
  //   const [subcategories, setSubcategories] = useState(subcategoriesData);

  return (
    <Layout>
      <ToastContainer />
      <Create
        sizes={sizes}
        setSizes={setSizes}
        subcategories={dataSubcategory}
      />
      <List sizes={sizes} setSizes={setSizes} />
    </Layout>
  );
};

export default SizesAdmin;
