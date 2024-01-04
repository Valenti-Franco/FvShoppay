"use client";
import React, { useState } from "react";
import Create from "./Create";
import List from "./List";

import Layout from "../../../ui/admin/layout";

const CategoryAdmin = ({ categoriesData }) => {
  const [categories, setCategories] = useState(categoriesData);
  //   const [subcategories, setSubcategories] = useState(subcategoriesData);

  return (
    <Layout>
      <Create />
      <List categories={categories} setCategories={setCategories} />
    </Layout>
  );
};

export default CategoryAdmin;
