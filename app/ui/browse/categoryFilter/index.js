"use client"
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

import Card from "./Card";
import { MdCategory, MdSearch } from "react-icons/md";
import UpdateQueryString from "../updateQueryString";
export default function CategoryFilter({ categories }) {

  const { SubCategory, updateQueryString } = UpdateQueryString()

  const [show, setShow] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(SubCategory?.length ? [parseInt(SubCategory[0])] : []);

  const handleSubcategoryChange = (subcategoryID) => {

    setSelectedSubcategory([subcategoryID]);
  };
  return (
    <div className={styles.filter}>

      <div onClick={() => setShow(!show)} className="  hover:bg-gray-200 flex p-4 rounded-md m-4 items-center justify-between text-center">
        <div className="flex  gap-4 items-center">  <b className="flex text-xl  gap-2">Category{" "}</b> <MdCategory /></div>
        <span >{show ? <FaMinus /> : <BsPlusLg />}</span>
      </div>
      {show ?
        categories.map((category, i) => (
          <Card
            key={i}
            category={category}

            updateQueryString={updateQueryString}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={handleSubcategoryChange}
          />
        )) : null}





    </div>
  );
}
