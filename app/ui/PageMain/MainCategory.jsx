"use client";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
const MainCategory = () => {
  const [category, setcategory] = useState(false);
  const getCategory = async () => {
    const cat = await axios("https://fvecommerce.somee.com/api/Category");
    console.log(cat.data);
    setcategory(cat.data);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    category && (
      <div className={styles.menu}>
        <div class=" w-full max-w-full max-h-full overflow-auto bg-gray-300 max-w-screen-xl rounded-3xl flex m-0 flex-col gap-2 mx-auto  min-h-sceen">
          <div class="flex flex-col items-center">
            <h1 class="text-neutral-900 uppercase font-semibold text-2xl p-4 bg-blue-800 text-white w-full text-center ">
              Category
            </h1>
          </div>
          {category.map((category) => (
            <ul className="px-5 " key={category.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<MdArrowDropDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{category.nombre}</Typography>
                </AccordionSummary>
                {category.subCategory.map((subCategory) => (
                  //

                  <AccordionDetails key={subCategory.id}>
                    <Typography>
                      <Link
                        class="text-neutral-600 mt-3 group-open:animate-fadeIn"
                        href={`/browse?search=all&idSubCategory=${subCategory.id}`}
                      >
                        - {subCategory.nombre}
                      </Link>
                    </Typography>
                  </AccordionDetails>
                ))}
              </Accordion>
            </ul>

            //       <div key={category.id} class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            //         <div class="py-5">
            //           <details class="group">
            //             <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
            //               <span> {category.nombre}</span>
            //               <span class="transition group-open:rotate-180">
            //                 <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
            //                 </svg>
            //               </span>
            //             </summary>
            //             {category.subCategory.map(subCategory => (
            //               <p key={subCategory.id}>

            //                 <Link class="text-neutral-600 mt-3 group-open:animate-fadeIn" href={`/browse?search=all&idSubCategory=${subCategory.id}`} >{subCategory.nombre}</Link>
            //               </p>
            //             ))}
            //             {/* <p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
            //   SAAS platform is a cloud-based software service that allows users to access
            //   and use a variety of tools and functionality.
            // </p> */}
            //           </details>
            //         </div>

            //       </div>
          ))}
        </div>

        {/* <ul>
          <li>
            <a className={styles.menu__header}>
              <BiCategory />
              <b>Categories</b>
            </a>
          </li>
          <div className={styles.menu__list}>
            {menuArray.map((item, i) => (
              <li key={i}>
                <Link href={item.link}>
  
                  {i == 0 ? (
                    <GiLargeDress />
                  ) : i == 1 ? (
                    <GiClothes />
                  ) : i == 2 ? (
                    <GiHeadphones />
                  ) : i == 3 ? (
                    <GiWatch />
                  ) : i == 4 ? (
                    <HiOutlineHome />
                  ) : i == 5 ? (
                    <GiHealthCapsule />
                  ) : i == 6 ? (
                    <GiBallerinaShoes />
                  ) : i == 7 ? (
                    <GiBigDiamondRing />
                  ) : i == 8 ? (
                    <GiSportMedal />
                  ) : i == 9 ? (
                    <FaBaby />
                  ) : i == 10 ? (
                    <BiCameraMovie />
                  ) : i == 11 ? (
                    <MdOutlineSportsEsports />
                  ) : i == 12 ? (
                    <BsPhoneVibrate />
                  ) : i == 13 ? (
                    <MdOutlineSmartToy />
                  ) : i == 14 ? (
                    <BiGift />
                  ) : i == 15 ? (
                    <Gi3DHammer />
                  ) : i == 16 ? (
                    <AiOutlineSecurityScan />
                  ) : (
                    ""
                  )}
                  <span>{item.name}</span>
  
                </Link>
              </li>
            ))}
          </div>
        </ul> */}
      </div>
    )
  );
};

export default MainCategory;
