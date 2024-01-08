import React from "react";

import ContentLoader from "react-content-loader";
import styles from "./styles.module.scss";
import { Skeleton } from "@mui/material";

const HeaderPlaceHolder = () => {
  return (
    <div className={styles.menu}>
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={"100%"}
        sx={{ bgcolor: "#dfdddd" }}
        // viewBox="0 0 290 40"
        // animation="wave"
        // backgroundColor=""
        // foregroundColor="#d0cdcf"
      />
      {/* <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" /> */}
    </div>
  );
};

export default HeaderPlaceHolder;
