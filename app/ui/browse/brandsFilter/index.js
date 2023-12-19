"use client"
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useRouter } from "next/router";
import { TbBrandAuth0 } from "react-icons/tb";

export default function BrandsFilter({ brands, brand, brandHandler, updateQueryString, replaceQuery }) {
  const router = useRouter();
  const [show, setShow] = useState(true);
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
      <h3>
        <b className="flex gap-2"> Brands <TbBrandAuth0 /> </b>  <span onClick={() => setShow(!show)}>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
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
          <a href={updateQueryString(selectedBrand, "brand")}>Apply Sizes</a>

        </div>

      )}
    </div>
  );
}
