import React from "react";

import ContentLoader from "react-content-loader";
import styles from "./styles.module.scss";

const HeaderPlaceHolder = () => {
  return (
    <div className={styles.header}>
      <ContentLoader
        speed={2}
        width={290}
        height={30}
        // viewBox="0 0 290 40"
        backgroundColor="#dfdddd"
        foregroundColor="#d0cdcf"
      >
        <rect x="0" y="0" rx="10" ry="10" width="250" height="30" />
      </ContentLoader>
    </div>
  );
};

export default HeaderPlaceHolder;
