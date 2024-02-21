"use client"
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useRouter } from "next/router";
import { TbBrandAuth0 } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import UpdateQueryString from "../UpdateQueryString";

export default function BrandsFilter({ brands }) {
  const router = useRouter();
  const { brand, updateQueryString } = UpdateQueryString();
  // brand={brand}
  // updateQueryString={updateQueryString}
  const [show, setShow] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(brand ? parseInt(brand) : "");

  const handleSizeChange = (selectedBrandid) => {
    if (selectedBrand === selectedBrandid) {
      setSelectedBrand("")
    } else {
      setSelectedBrand(selectedBrandid)
    }

  }
  return (
    <div className={styles.filter}>
      <div onClick={() => setShow(!show)} className="  hover:bg-gray-200 flex p-4 rounded-md m-4 items-center justify-between text-center">
        <div className="flex  gap-4 items-center">  <b className="flex text-xl  gap-2">Brand{" "}</b> <TbBrandAuth0 /></div>
        <span >{show ? <FaMinus /> : <BsPlusLg />}</span>
      </div>
      {show && (
        <div className={styles.filter__brand}>
          {brands.map((brand, i) => {
            // const check = replaceQuery("brand", brand);
            const isSelected = selectedBrand === brand.id;
            return (
              <button key={brand.id}
                className={`${styles.filter__brand} ${isSelected ? styles.activeFilter : ""}`}
                // ${check?.active ? styles.activeFilter : ""
                onClick={() => handleSizeChange(brand.id)}

              >
                {/* <img src={`../../../images/brands/${brand}.png`} alt="" /> */}
                <p>{brand.marca}</p>
              </button>
            );
          })}

          {/* <a href={updateQueryString(selectedBrand, "brand")}>Apply Sizes</a> */}

        </div>

      )}
      {selectedBrand > 0 && (

        <a className="flex w-full justify-center items-center text-xs bg-gray-200 font-extrabold  hover:bg-gray-400  p-4 rounded-md border-solid border-2 border-sky-500 " href={updateQueryString(selectedBrand, "brand")}> <div className="flex justify-center gap-4 ">Apply Brand <MdSearch className=" text-lg" /></div> </a>
      )}
    </div>
  );
}
