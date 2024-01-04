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
    <div class="flex  flex-row items-center">
      <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={size.id}>
        <input type="checkbox"
          onClick={handleSizeChange}
          name="size"
          id={size.id}
          checked={isChecked}
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
      <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor={size.id}>
        {size.tamanio}
      </label>
    </div>
    // <label htmlFor={size.id} className={styles.filter__sizes_size}>
    //   <input
    //     onChange={handleSizeChange}
    //     type="checkbox"
    //     name="size"
    //     id={size.id}
    //     checked={isChecked}
    //   />


    //   <p key={size.id}>{size.tamanio}</p>

    //   <label htmlFor={size}>{size.tipo}</label>
    // </label>
  );
}
