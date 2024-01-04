import React from "react";
import SubCategoryAdmin from "../../ui/admin/subCategories/SubCategoryAdmin";
import axios from "axios";

const page = async () => {
  const data = await axios.get("https://fvecommerce.somee.com/api/Category");
  const dataSub = await axios.get(
    "https://fvecommerce.somee.com/api/SubCategory"
  );
  return (
    <SubCategoryAdmin
      categoriesData={data.data}
      subcategoriesData={dataSub.data}
    />
  );
};

export default page;
