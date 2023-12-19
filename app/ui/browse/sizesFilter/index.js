// import { useRouter } from "next/router";
"use client"
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Size from "./Size";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GiResize } from "react-icons/gi";
export default function SizesFilter({ sizes, sizeid, sizeHandler, updateQueryString }) {
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (selectedSize) => {
    // Check if the current size is already selected
    const index = selectedSizes.indexOf(selectedSize);

    if (index !== -1) {
      // If the size is already selected, remove it
      setSelectedSizes((prevSizes) => [
        ...prevSizes.slice(0, index),
        ...prevSizes.slice(index + 1),
      ]);
    } else {
      // If the size is not selected, add it
      setSelectedSizes((prevSizes) => [...prevSizes, selectedSize]);
    }
  };

  const handleApplyFilters = () => {
    // Do something with the selected sizes, e.g., update the URL
    const queryString = selectedSizes.map((size) => `idDetallesTamano=${size}`).join("&");
    // router.push(`?${queryString}`);
    updateQueryString(selectedSizes, "size")
  };
  return (
    <div className={styles.filter}>
      <h3>
        <b className="flex gap-2 ">Sizes <GiResize /> </b>  <span onClick={() => setShow(!show)}>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {sizes.map((size, i) => (
            <div key={i}

            >
              <p>{size.tipo}</p>
              {size.detalleTamanos?.map((tamanos, i) => (
                <Size
                  sizeid={sizeid}
                  key={tamanos.id}
                  size={tamanos}
                  sizeHandler={() => handleSizeChange(tamanos.id)}
                />
              ))}
            </div>
          ))}
          <Link href={updateQueryString(selectedSizes, "size")}>Apply Sizes</Link>
        </div>
      )}
    </div>
  );
}
