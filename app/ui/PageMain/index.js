import styles from "./styles.module.scss";
import { menuArray } from "../../data/home"
import Link from "next/link";
//-------

import axios from "axios";

//-------
export default async function Menu() {

  const category = await axios("https://fvecommerce.somee.com/api/Category")


  return (
    <div className={styles.menu}>

      <div class="max-w-screen-xl mx-auto px-5  min-h-sceen">
        <div class="flex flex-col items-center">

          <p class="text-neutral-900 text-xl mt-3">
            Category
          </p>
        </div>
        {category.data.map(category => (

          <div key={category.id} class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span> {category.nombre}</span>
                  <span class="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                {category.subCategory.map(subCategory => (
                  <p key={subCategory.id}>

                    <Link class="text-neutral-600 mt-3 group-open:animate-fadeIn" href={`/browse?search=all&idSubCategory=${subCategory.id}`} >{subCategory.nombre}</Link>
                  </p>
                ))}
                {/* <p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
      SAAS platform is a cloud-based software service that allows users to access
      and use a variety of tools and functionality.
    </p> */}
              </details>
            </div>




          </div>

        ))


        }

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
  );
}


