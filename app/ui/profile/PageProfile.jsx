import { getSession, useSession } from "next-auth/react";
import Layout from "./layout/PageLayout";
import Shipping from "../checkout/shipping";
import styles from "../../../styles/profile.module.scss";

import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MdAddLocationAlt,
  MdHelp,
  MdMapsHomeWork,
  MdOutlineMapsHomeWork,
  MdOutlinePayment,
  MdOutlineSecurity,
  MdShoppingCart,
} from "react-icons/md";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

export default async function PageProfile() {
  return (
    <>
      <section class="bg-white h-full   px-4 lg:px-16">
        <div class="container w-full sticky top-10 px-[12px] md:px-0 xl:px-12 nanum2">
          <div class="grid grid-cols-1   lg:grid-cols-3  gap-x-4 gap-y-28 lg:gap-y-16">
            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="/profile/orders" class="block">
                <div class="h-28">
                  <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-red-500 rounded-xl justify-items-center align-middle">
                    <MdShoppingCart
                      src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                      class="w-36 h-36 text-white mt-6 m-auto"
                      alt="Automotive"
                      title="Automotive"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div class="p-6   z-10 w-full   ">
                  <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                    ORDERS
                  </p>
                </div>
              </a>
            </div>

            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="/profile/address" class="block">
                <div class="h-28">
                  <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-green-500 rounded-xl justify-items-center align-middle">
                    <MdAddLocationAlt
                      src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                      class="w-36 h-36 text-white mt-6 m-auto"
                      alt="Automotive"
                      title="Automotive"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div class="p-6   z-10 w-full   ">
                  <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                    ADDRESS
                  </p>
                </div>
              </a>
            </div>

            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="/profile/payment" class="block">
                <div class="h-28">
                  <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-blue-500 rounded-xl justify-items-center align-middle">
                    <MdOutlinePayment
                      src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                      class="w-36 h-36 text-white  mt-6 m-auto"
                      alt="Automotive"
                      title="Automotive"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div class="p-6   z-10 w-full   ">
                  <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                    PAYMENT
                  </p>
                </div>
              </a>
            </div>

            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="/profile/wishlist" class="block">
                <div class="h-28">
                  <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-yellow-500 rounded-xl justify-items-center align-middle">
                    <BsFillBookmarkHeartFill
                      ingCart
                      src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                      class="w-36 h-36  text-white mt-6 m-auto"
                      alt="Automotive"
                      title="Automotive"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div class="p-6   z-10 w-full   ">
                  <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                    WHISLIST
                  </p>
                </div>
              </a>
            </div>

            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="/profile" class="block">
                <div class="h-28">
                  <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-sky-500 rounded-xl justify-items-center align-middle">
                    <MdOutlineSecurity
                      src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                      class="w-36 h-36  text-white mt-6 m-auto"
                      alt="Automotive"
                      title="Automotive"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div class="p-6   z-10 w-full   ">
                  <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                    SEGURITY
                  </p>
                </div>
              </a>
            </div>
            <div class="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="/profile" class="block">
                <div class="h-28">
                  <div class="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 bg-purple-500 rounded-xl justify-items-center align-middle">
                    <MdHelp
                      src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                      class="w-36 h-36 text-white c-  mt-6 m-auto"
                      alt="Automotive"
                      title="Automotive"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div class="p-6   z-10 w-full   ">
                  <p class="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                    HELP
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <div className={styles.header}>
        <h1>PROFILE</h1>
      </div>
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            height: "300px",
            width: "300px",
            margin: "10px",
            borderRadius: "50%",
            border: "5px solid #ccc",
          }}
        >
          <Image
            src={session?.user?.imagen?.url}
            alt="Profile Image"
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div> */}

      {/* <div
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              Name:
            </span>
            <span style={{ fontSize: "18px" }}>{session?.user?.nombre}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              Email:
            </span>
            <span style={{ fontSize: "18px" }}>{session?.user?.email}</span>
          </div>
        </div>*/}

      {/* </div> */}
    </>
  );
}
