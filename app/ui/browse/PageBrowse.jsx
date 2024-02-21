import styles from "../../../styles/browse.module.scss";
import BrowseFilters from "./BrowseFilters";
import BrowseTags from "./BrowseTags";
// import ProductFilters from "../../ui/productCard/ProductFilters";
// import CategoryFilter from "./categoryFilter";
// import SizesFilter from "./sizesFilter";
// import ColorsFilter from "./colorsFilter";
// import BrandsFilter from "./brandsFilter";
// import HeadingFilters from "./headingFilters";

export default function Browse({ categories, sizes, colors, brands }) {
  return (
    <div className={styles.browse}>
      <head>
        <title>Home / Browse</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className={styles.browse__container}>
        <BrowseTags categories={categories} />
        <div className={`${styles.browse__store} `}>
          <BrowseFilters
            categories={categories}
            sizes={sizes}
            colors={colors}
            brands={brands}
          />
        </div>
      </div>
    </div>
  );
}
