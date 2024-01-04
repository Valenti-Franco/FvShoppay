import axios from "axios";
import React from "react";
import SizesAdmin from "../../ui/admin/sizes/SizesAdmin";

const page = async () => {
  const datasize = await axios.get("https://fvecommerce.somee.com/api/Tamanos");
  const dataDetail = await axios.get(
    "https://fvecommerce.somee.com/api/DetalleTamanos"
  );
  const dataSub = await axios.get(
    "https://fvecommerce.somee.com/api/SubCategory"
  );

  return (
    <SizesAdmin
      datasize={datasize.data}
      dataDetail={dataDetail.data}
      dataSubcategory={dataSub.data}
    />
  );
};

export default page;
