import Image from "next/image";
import { sidebarData } from "../../../data/profile";
import Item from "./Item";
import styles from "./styles.module.scss";
import { Helmet } from 'react-helmet';

export default function Sidebar({ isUser, data, address }) {


  // console.log(address);
  const partesFecha = data.fechaPublicado.split('T');

  // La primera parte (partesFecha[0]) contiene la fecha en formato 'YYYY-MM-DD'
  const fechaSolo = partesFecha[0];
  return (
    <div className={styles.sidebar}>

      <div className={styles.sidebar__container}>
        {/* <Image width={100} height={100} src={data?.imagen?.url} alt="" />
        <span className={styles.sidebar__name}>{data.nombre}</span> */}
        <div class="  relative w-full bg-gray-50 flex justify-center items-center">
          <div class="h-56 top-0 w-72 absolute flex justify-center">
            <Image width={200} height={200} src={data?.imagen?.url ? data.imagen.url : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} alt="" />
          </div>

          <div
            class="
           
          mx-4
          w-5/6
          bg-gray-600
          rounded-3xl
          shadow-md
          sm:w-80 sm:mx-0
           py-16
        "
          >
            <div class="h-1/2 w-full flex justify-between items-baseline px-3 py-5">

            </div>

            <div
              class="
            bg-white
            
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center
          "
            >
              <div class="w-full h-1/2 flex justify-between items-center px-3 pt-2">
                <div class="flex flex-col justify-center items-center">
                  <h1 class="text-gray-500 text-xs">Orders</h1>
                  <h1 class="text-gray-600 text-sm">{data.compras.length}</h1>
                </div>
                <div class="flex flex-col justify-center items-center">
                  <h1 class="text-gray-500 text-xs">Creation</h1>

                  <h1 class="text-gray-600 text-sm">{fechaSolo}</h1>
                </div>
              </div>
              <div class="w-full h-3/4 flex flex-col justify-center items-center">
                <h1 class="text-gray-700 font-bold">{data.nombre}</h1>
                <h1 class="text-gray-500 text-sm">{data.email}</h1>

                <h1 class="text-gray-500 text-sm">{address.acitvo ? address?.ciudad + ", " + address.pais : <b>No address Active!</b>}</h1>

              </div>

              <ul className="
         bg-white-700
            h-full
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center">
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

        </div>

      </div>
    </div>
  );
}
