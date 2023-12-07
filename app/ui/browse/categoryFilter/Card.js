import styles from "../styles.module.scss";
import Subcategory from "./Subcategory"
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
export default function Card({ category, categoryHandler, replaceQuery }) {
  const [show, setShow] = useState(false);
  // const check = replaceQuery("category", category._id);
  return (
    <>
      {/*  */}
      <section>
        <li onClick={() => setShow(!show)} >
          {/* <input
            type="radio"
            name="filter"
            id={category.id}
            checked={check.active}
          /> */}
          <label htmlFor={category.id}>
            <h2>{category.nombre}</h2>
          </label>
          <span >{show ? <FaMinus /> : <BsPlusLg />}</span>


        </li>
        {show ?
          category.subCategory.map((subcategory, i) =>
            <Subcategory categoryHandler={categoryHandler} key={subcategory.id} subcategory={subcategory} />
          )
          : null}
      </section>
    </>
  );
}
