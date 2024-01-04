"use client";
import React, { useState } from "react";
import Create from "./Create";
import List from "./List";

import Layout from "../../../ui/admin/layout";

const CategoryAdmin = ({ subcategoriesData, categoriesData }) => {
  const [categories, setCategories] = useState(categoriesData);

  const [subcategories, setSubcategories] = useState(subcategoriesData);

  return (
    <Layout>
      <Create categories={categories} setSubCategories={setSubcategories} />
      <List
        categories={categories}
        subCategories={subcategories}
        setSubCategories={setSubcategories}
      />
    </Layout>
  );
};

export default CategoryAdmin;
