import React from "react";
import styles from "../../../styles/browse.module.scss";

const BrowseTags = ({ categories }) => {
  return (
    <div>
      <div className={styles.browse__path}>Home / Browse</div>
      <div className={styles.browse__tags}>
        {categories.map((c) =>
          c.subCategory.map((sub) => (
            <a href={`/browse?search=all&idSubCategory=${sub.id}`} key={sub.id}>
              {sub.nombre}
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseTags;
