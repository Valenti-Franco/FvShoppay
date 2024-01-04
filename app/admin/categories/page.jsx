import React from "react";
import CategoryAdmin from "../../ui/admin/categories/CategoryAdmin";

import axios from "axios";

const page = async () => {
  const data = await axios.get("https://fvecommerce.somee.com/api/Category");
  const dataSub = await axios.get(
    "https://fvecommerce.somee.com/api/SubCategory"
  );

  return (
    <>
      <CategoryAdmin
        categoriesData={data.data}
        subcategoriesData={dataSub.data}
      />
    </>
  );
};

export default page;
