"use client"
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function Size({ size, sizeHandler, sizeid }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if the current size.id is present in sizeid array
    setIsChecked(sizeid.includes(String(size.id)));
  }, [sizeid, size.id]);

  const handleSizeChange = () => {
    setIsChecked(!isChecked);
    sizeHandler(size.id); // Call the sizeHandler function with the size ID
  };


  return (
    <label htmlFor={size.id} className={styles.filter__sizes_size}>
      <input
        onChange={handleSizeChange}
        type="checkbox"
        name="size"
        id={size.id}
        checked={isChecked}
      />


      <p key={size.id}>{size.tamanio}</p>

      <label htmlFor={size}>{size.tipo}</label>
    </label>
  );
}
