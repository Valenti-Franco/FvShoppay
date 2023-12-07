"use client"
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";


export default function BrandsFilter({ brands, brandHandler, replaceQuery }) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Brands <span onClick={() => setShow(!show)}>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            // const check = replaceQuery("brand", brand);
            return (
              <button key={brand.id}
                className={`${styles.filter__brand} 
                  }`}
              // ${check?.active ? styles.activeFilter : ""
              >
                {/* <img src={`../../../images/brands/${brand}.png`} alt="" /> */}
                <p>{brand.marca}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
