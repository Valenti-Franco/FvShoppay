import React from "react";

import ContentLoader from "react-content-loader";
import styles from "./styles.module.scss";

const FlashDealsPlaceHolder = () => {
  return (
    <div style={{ height: "100%" }} className={styles.flashDeals}>
      <ContentLoader
        speed={2}
        width={"100%"}
        height={275}
        // viewBox="0 0 290 40"
        backgroundColor="#dfdddd"
        foregroundColor="#d0cdcf"
      >
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="275" />
      </ContentLoader>
    </div>
  );
};

export default FlashDealsPlaceHolder;
