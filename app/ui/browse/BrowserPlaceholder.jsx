import React from "react";
import ContentLoader from "react-content-loader";
import styles from "../../../styles/browse.module.scss";

const BrowserPlaceholder = () => {
  return (
    <div className={styles.browse__container}>
      <div className={styles.browse__path}>Home / Browse</div>
      <div className={styles.browse__tags}>
        <ContentLoader
          speed={2}
          width={"100%"}
          height={"100%"}
          // viewBox="0 0 290 40"
          backgroundColor="#dfdddd"
          foregroundColor="#d0cdcf"
        >
          <rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
        </ContentLoader>
      </div>

      <div className={`${styles.browse__store} `}>
        {/* <ContentLoader
          speed={2}
          width={290}
          height={"100%"}
          // viewBox="0 0 290 40"
          backgroundColor="#dfdddd"
          foregroundColor="#d0cdcf"
        >
          <rect x="0" y="0" rx="10" ry="10" width="250" height="100%" />
        </ContentLoader> */}
        <div className={`${styles.browse__store_filters} ${styles.scrollbar}`}>
          <ContentLoader
            speed={2}
            className="my-2"
            width={290}
            height={"100"}
            // viewBox="0 0 290 40"
            backgroundColor="#dfdddd"
            foregroundColor="#d0cdcf"
          >
            <rect x="0" y="0" rx="10" ry="10" width="250" height="100" />
          </ContentLoader>
          <ContentLoader
            className="my-2"
            speed={2}
            width={290}
            height={"100"}
            // viewBox="0 0 290 40"
            backgroundColor="#dfdddd"
            foregroundColor="#d0cdcf"
          >
            <rect x="0" y="0" rx="10" ry="10" width="250" height="100" />
          </ContentLoader>
          <ContentLoader
            speed={2}
            className="my-2"
            width={290}
            height={"100"}
            // viewBox="0 0 290 40"
            backgroundColor="#dfdddd"
            foregroundColor="#d0cdcf"
          >
            <rect x="0" y="0" rx="10" ry="10" width="250" height="100" />
          </ContentLoader>
          <ContentLoader
            className="my-2"
            speed={2}
            width={290}
            height={"100"}
            // viewBox="0 0 290 40"
            backgroundColor="#dfdddd"
            foregroundColor="#d0cdcf"
          >
            <rect x="0" y="0" rx="10" ry="10" width="250" height="100" />
          </ContentLoader>
        </div>
        <div className={styles.browse__store_products_wrap}>
          <ContentLoader
            speed={2}
            width={"100%"}
            height={100}
            // viewBox="0 0 290 40"
            backgroundColor="#dfdddd"
            foregroundColor="#d0cdcf"
          >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="100" />
          </ContentLoader>

          <div className={styles.browse__store_products}>
            <ContentLoader
              className="mt-4"
              speed={2}
              width={"100%"}
              height={"500"}
              // viewBox="0 0 290 40"
              backgroundColor="#dfdddd"
              foregroundColor="#d0cdcf"
            >
              <rect x="0" y="0" rx="10" ry="10" width="100%" height="500" />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserPlaceholder;
