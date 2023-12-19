"use client"
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Link from "next/link";
import { MdInvertColors } from "react-icons/md";
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
        <b className="flex gap-2">  Colors <MdInvertColors /></b>  <span onClick={() => setShow(!show)}>{show ? <FaMinus /> : <BsPlusLg />}</span>
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

          <a href={updateQueryString(selectedColors, "color")}>Apply Colors</a>
        </div>

      )}



    </div>
  );
}
