"use client";
import React from "react";
import styles from "../../../styles/browse.module.scss";
import UpdateQueryString from "./UpdateQueryString";
const ClearFilter = () => {
  const { totalFilters } = UpdateQueryString();
  return (
    <a className={styles.browse__clearBtn} href={"/browse?search=all"}>
      Clear All ({totalFilters})
    </a>
  );
};

export default ClearFilter;
