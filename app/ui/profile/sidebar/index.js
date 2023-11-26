import Image from "next/image";
import { sidebarData } from "../../../data/profile";
import Item from "./Item";
import styles from "./styles.module.scss";

export default function Sidebar({ data }) {
  // console.log(data);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <Image width={100} height={100} src={data?.imagen?.url} alt="" />
        <span className={styles.sidebar__name}>{data.nombre}</span>
        <ul>
          {sidebarData.map((item, i) => (
            <Item
              key={i}
              item={item}
              visible={data.tab == i.toString()}
              index={i.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
