import MainCategory from "./MainCategory";

import { menuArray } from "../../data/home"
import Link from "next/link";
import axios from "axios";
import styles from "./styles.module.scss";

//-------


//-------
export default async function Menu() {

  const cat = await axios("https://fvecommerce.somee.com/api/Category");
  const category = cat.data;



  // return (
  // );
  return (
    <div className={styles.menu}>
      <div className="relative w-full max-w-full max-h-full overflow-auto  rounded-3xl flex m-0 flex-col gap-2 mx-auto min-h-sceen">
        <div className={styles.ContainerCategories}>
          <MainCategory category={category} />

        </div>
      </div>
    </div>
  );
}


