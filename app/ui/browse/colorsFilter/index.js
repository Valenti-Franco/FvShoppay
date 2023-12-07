"use client"
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Link from "next/link";

export default function ColorsFilter({ colors, colorid, colorHandler, replaceQuery, updateQueryString }) {
  const [show, setShow] = useState(true);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    // Convierte los números en colorid a enteros y filtra los colores correspondientes
    const initialSelectedColorIds = colorid.map(id => parseInt(id, 10));
    setSelectedColors(initialSelectedColorIds);
  }, [colorid]);

  const handleColorsChange = (selectedColorId) => {
    // Check if the current color ID is already selected
    const isSelected = selectedColors.includes(selectedColorId);

    if (isSelected) {
      // If the color is already selected, remove its ID
      setSelectedColors((prevColorIds) => prevColorIds.filter(id => id !== selectedColorId));
    } else {
      // If the color is not selected, add its ID
      setSelectedColors((prevColorIds) => [...prevColorIds, selectedColorId]);
    }
  }
  const handleApplyFilters = () => {
    // Do something with the selected colors, e.g., update the URL
    // router.push(`?${queryString}`);
    const queryString = selectedColors.map((size) => `idDetallesTamano=${size}`).join("&");

    // console.log(selectedColors);
    console.log(updateQueryString(selectedColors, "color"))

  };

  return (
    <div className={styles.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => {
            const isSelected = selectedColors.some(selectedColor => selectedColor === color.id);
            return (
              <button
                key={color.id}
                style={{ background: `${color.style}` }}
                className={isSelected ? styles.activeFilterColor : ""}
                onClick={() => handleColorsChange(color.id)}
              ></button>
            );
          })}

        </div>

      )}
      <a href={updateQueryString(selectedColors, "color")}>Apply Colors</a>
      <Link href={updateQueryString(selectedColors, "color")}>Apply Colors</Link>



    </div>
  );
}
