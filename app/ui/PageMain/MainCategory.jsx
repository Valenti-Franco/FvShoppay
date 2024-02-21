"use client";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import Gaming from "../../data/icons/Gaming";
import Electronic from "../../data/icons/Electronic";
import Clothing from "../../data/icons/Clothing";
import WomenClothing from "../../data/icons/WomenClothing";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import Link from "next/link";

const MainCategory = ({ category }) => {
  const [selected, setselected] = useState("");
  return (
    <AnimatePresence>
      {category.map((category) =>
        selected !== "" && category.id !== selected ? null : (
          <motion.div
            // initial={{ x: -100 }}
            // animate={{ x: 0 }}
            // exit={{ opacity: 0, x: -100 }}
            // transition={{ duration: 0.5 }}
            // className={
            //   styles.ItemCategory + " " + selected === 1
            //     ? styles.animate1
            //     : selected === 2
            //     ? styles.animate2
            //     : selected === 3
            //     ? styles.animate3
            //     : selected === 4
            //     ? styles.animate4
            //     : ""
            // }
            className={
              styles.ItemCategory +
              " " +
              (selected === 1
                ? styles.animate1 + " " + styles.selected
                : selected === 2
                ? styles.animate2 + " " + styles.selected
                : selected === 3
                ? styles.animate3 + " " + styles.selected
                : selected === 4
                ? styles.animate4 + " " + styles.selected
                : "")
            }
            onClick={() => setselected(category.id)}
            key={category.id}
          >
            <picture className="relative  flex justify-center items-center w-full h-full">
              <motion.div className=" h-full w-1/2">
                {category.id === 1 ? <Clothing /> : ""}
                {category.id === 2 ? <Electronic /> : ""}
                {category.id === 3 ? <Gaming /> : ""}
                {category.id === 4 ? <WomenClothing /> : ""}
              </motion.div>
              <p className=" absolute bottom-0 z-10 font-extrabold   bg-opacity-40">
                {category.nombre}{" "}
              </p>
            </picture>
          </motion.div>
        )
      )}
      {selected !== "" && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: -700 }}
          transition={{ duration: 0.5, delay: 1 }}
          animate={{ opacity: 1, x: -10, y: 0 }}
          className=" bg-gradient-to-r bg-slate-200  rounded-e-md  w-1/2 h-full gap-4 flex flex-col justify-top items-center"
        >
          <motion.button
            className={styles.btns__back}
            initial={{ opacity: 0, y: -700 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            onClick={() => setselected("")}
          >
            <p>Back</p>
          </motion.button>
          {category.map((category) =>
            category.id === selected ? (
              <motion.div key={category.id} className={styles.subCategory}>
                {category.subCategory.map((sub, index) => (
                  <Link
                    href={`/browse?search=all&idSubCategory=${sub.id}`}
                    key={sub.id}
                  >
                    <motion.button
                      initial={{ opacity: 0, y: 700 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1 + index / 4,
                      }}
                      className={styles.btns}
                      key={sub.id}
                    >
                      <p>{sub.nombre}</p>
                    </motion.button>
                  </Link>
                ))}
              </motion.div>
            ) : null
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainCategory;
