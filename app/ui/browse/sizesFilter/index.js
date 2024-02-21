// import { useRouter } from "next/router";
"use client"
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Size from "./Size";
import Link from "next/link";
import { GiResize } from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import UpdateQueryString from "../updateQueryString";
import { string } from "zod";
export default function SizesFilter({ sizes }) {
  const { sizeid, updateQueryString } = UpdateQueryString();

  const [show, setShow] = useState(false);

  console.log(sizeid)
  const [selectedSizes, setSelectedSizes] = useState(sizeid);

  const handleSizeChange = (selectedSize) => {
    // Check if the current size is already selected
    const index = selectedSizes.indexOf(selectedSize.toString());
    if (index !== -1) {
      // If the size is already selected, remove it
      setSelectedSizes((prevSizes) => [
        ...prevSizes.slice(0, index),
        ...prevSizes.slice(index + 1),
      ]);
    } else {
      // If the size is not selected, add it
      setSelectedSizes((prevSizes) => [...prevSizes, selectedSize.toString()]);
    }
  };


  return (
    <div className={styles.filter}>
      {/* <h3>
        <b className="flex gap-2 ">Sizes <GiResize /> </b>  <span onClick={() => setShow(!show)}>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3> */}
      <div onClick={() => setShow(!show)} className="  hover:bg-gray-200 flex p-4 rounded-md m-4 items-center justify-between text-center">
        <div className="flex  gap-4 items-center">  <b className="flex text-xl  gap-2">Sizes{" "}</b> <GiResize /></div>
        <span >{show ? <FaMinus /> : <BsPlusLg />}</span>
      </div>
      {show && (
        <div className={styles.filter__sizes}>
          {sizes.map((size, i) => (
            <div key={i}
              className="m-2"


            >
              <label class="mt-px font-extrabold text-gray-700 cursor-pointer select-none">
                {size.tipo}
              </label>
              <div
                key={i}
                className="flex flex-wrap p-2"
              >
                {size.detalleTamanos?.map((tamanos, i) => (
                  <>
                    <Size
                      sizeid={sizeid}
                      key={tamanos.id}
                      size={tamanos}
                      sizeHandler={() => handleSizeChange(tamanos.id)}
                    />

                  </>
                ))}
              </div>

            </div>
          ))}
          {selectedSizes.length > 0 && (

            <a className="flex justify-center items-center text-xs bg-gray-200 font-extrabold  hover:bg-gray-400  p-4 rounded-md border-solid border-2 border-sky-500 " href={updateQueryString(selectedSizes, "size")}> <div className="flex justify-center gap-4 ">Apply Sizes <MdSearch className=" text-lg" /></div> </a>
          )}

          {/* <Link href={updateQueryString(selectedSizes, "size")}>Apply Sizes</Link> */}
        </div>
      )}
    </div>
  );
}
