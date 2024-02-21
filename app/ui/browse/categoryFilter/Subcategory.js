import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
export default function Subcategory({ subcategory, updateQueryString, selectedSubcategory, onSubcategoryChange }) {
  const [show, setShow] = useState(false);
  const handleCheckboxChange = () => {
    // Actualizar la subcategoría seleccionada en el componente padre
    onSubcategoryChange(subcategory.id);
  };
  return (
    // <label htmlFor={subcategory} className={styles.filter__sizes_size}>
    //   <input onClick={handleCheckboxChange} type="checkbox" name="size" id={subcategory} checked={subcategory.id === selectedSubcategory[0]} />


    //   <p key={subcategory.id}>{subcategory.nombre}</p>

    //   {/* <label htmlFor={size}>{size.tipo}</label> */}
    // </label>
    <div class="inline-flex items-center">
      <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
        <input type="checkbox"
          onClick={handleCheckboxChange}
          name="size"
          id={subcategory.id}
          checked={subcategory.id === selectedSubcategory[0]}
          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
        />
        <span
          class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" stroke-width="1">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </span>
      </label>
      <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor={subcategory.id}>
        {subcategory.nombre}
      </label>
    </div>
  );
}
