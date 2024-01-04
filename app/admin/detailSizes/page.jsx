import axios from "axios";
import React from "react";
import DetailSizes from "../../ui/admin/detailSizes/DetailSizes";

const page = async () => {
  const datasize = await axios.get("https://fvecommerce.somee.com/api/Tamanos");
  const dataDetail = await axios.get(
    "https://fvecommerce.somee.com/api/DetalleTamanos"
  );
  return (
    <DetailSizes
      datasize={datasize.data}
      dataDetail={dataDetail.data}
      //   dataSubcategory={dataSub.data}
    />
  );
};

export default page;
