"use client"
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Link from "next/link";
import { MdInvertColors, MdSearch } from "react-icons/md";
import UpdateQueryString from "../updateQueryString";
export default function ColorsFilter({ colors }) {
  const { colorid, updateQueryString } = UpdateQueryString();
  const [show, setShow] = useState(false);

  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    // Convierte los números en colorid a enteros y filtra los colores correspondientes
    const initialSelectedColorIds = colorid.map(id => parseInt(id, 10));
    setSelectedColors(initialSelectedColorIds);
  }, []);

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
      {/* <h3>
        <b className="flex gap-2">  Colors <MdInvertColors /></b>  <span onClick={() => setShow(!show)}>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3> */}
      <div onClick={() => setShow(!show)} className="  hover:bg-gray-200 flex p-4 rounded-md m-4 items-center justify-between text-center">
        <div className="flex  gap-4 items-center">  <b className="flex text-xl  gap-2">Colors{" "}</b> <MdInvertColors /></div>
        <span >{show ? <FaMinus /> : <BsPlusLg />}</span>
      </div>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => {
            const isSelected = selectedColors.some(selectedColor => selectedColor === color.id);
            return (
              <div key={color.id} className="p-2 flex items-center gap-2">
                <button
                  key={color.id}
                  id={color.id + "color"}
                  style={{ background: `${color.style}` }}
                  className={isSelected ? styles.activeFilterColor : ""}
                  onClick={() => handleColorsChange(color.id)}
                ></button>
                <label htmlFor={color.id + "color"}>{color.color}</label>
              </div>

            );
          })}

          {selectedColors.length > 0 && (

            <a className="flex w-full justify-center items-center text-xs bg-gray-200 font-extrabold  hover:bg-gray-400  p-4 rounded-md border-solid border-2 border-sky-500 " href={updateQueryString(selectedColors, "color")}> <div className="flex justify-center gap-4 ">Apply Colors <MdSearch className=" text-lg" /></div> </a>
          )}
          {/* <a href={updateQueryString(selectedColors, "color")}>Apply Colors</a> */}
        </div>

      )}



    </div>
  );
}
