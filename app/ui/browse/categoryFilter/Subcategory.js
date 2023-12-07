import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
export default function Subcategory({ subcategory, categoryHandler }) {
  const [show, setShow] = useState(false);

  return (
    <label htmlFor={subcategory} className={styles.filter__sizes_size}>
      <input onClick={() => categoryHandler(subcategory.id)} type="checkbox" name="size" id={subcategory} />


      <p key={subcategory.id}>{subcategory.nombre}</p>

      {/* <label htmlFor={size}>{size.tipo}</label> */}
    </label>
  );
}
