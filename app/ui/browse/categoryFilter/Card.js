import styles from "../styles.module.scss";
import Subcategory from "./Subcategory"
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function Card({ category, updateQueryString, selectedSubcategory, onSubcategoryChange }) {
  const [show, setShow] = useState(false);
  // const check = replaceQuery("category", category._id);
  return (
    <>
      {/*  */}

      <section className={show ? " rounded-xl  bg-gray-200" : " rounded-full "}>
        <div onClick={() => setShow(!show)} className="  flex p-4 rounded-md m-4 items-center justify-between text-center  hover:bg-gray-200">
          <div className="flex  gap-4 items-center">  <p className="flex text-base  gap-2">{category.nombre}</p> </div>
          <span className={show ? " p-2 rounded-full bg-red-300" : " p-2 rounded-full bg-gray-200"} >{show ? <FaMinus /> : <BsPlusLg />}</span>
        </div>
        {show ?
          category.subCategory.map((subcategory, i) =>
            <>
              <Subcategory
                key={subcategory.id}
                subcategory={subcategory}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={onSubcategoryChange}
              />
              {selectedSubcategory.length > 0 && selectedSubcategory[0] === subcategory.id && (

                <a className="flex justify-center items-center text-xs bg-gray-200 font-extrabold  hover:bg-gray-400  p-4 rounded-md border-solid border-2 border-sky-500 " href={updateQueryString(selectedSubcategory, "subcategory")}> <div className="flex justify-center gap-4 ">Apply Categories <MdSearch className=" text-lg" /></div> </a>
              )}
            </>

          )
          : null}

      </section>
    </>
  );
}
