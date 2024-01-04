"use client";
import React, { useState } from "react";
import List from "./List";
import Create from "./Create";

import Layout from "../layout";
const DetailSizes = ({ datasize, dataDetail }) => {
  const [detail, setDetail] = useState(dataDetail);

  return (
    <Layout>
      <Create sizes={detail} setSizes={setDetail} subcategories={datasize} />
      <List sizes={detail} setSizes={setDetail} />
    </Layout>
  );
};

export default DetailSizes;
