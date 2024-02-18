"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from "../../data/home";
import Image from "next/image";
import { motion } from "framer-motion";

export default function User() {
  const { data: session } = useSession();

  // console.log(session.user)
  return (
    <div className={styles.user}>
      {/* <Image
        width={200}
        height={200}
        src="/images/userHeader.jpg"
        alt=""
        className={styles.user__header}
      /> */}
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <Image
              width={200}
              height={200}
              src={session.user?.imagen?.url ? session.user.imagen.url : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} alt="" />
            <h4>{session?.user?.nombre}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <Image
              width={200}
              height={200}
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt=""
            />
            <div className={styles.user__infos_btns}>
              <Link
                href="/Signin"
              >
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}

                >
                  Register
                </motion.p>
              </Link>
              <Link
                className="bg-white"
                href="/Signin"
              >
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}

                >
                  Login
                </motion.p>
              </Link>

            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/profile">

              <IoSettingsOutline />

            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >


            <Link href="/profile/orders">

              <HiOutlineClipboardList />

            </Link>
          </motion.li>


          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >


            <Link href="/profile/wishlist">

              <BsHeart />

            </Link>
          </motion.li>
        </ul >

      </div >
      {/* <img
        src="../../../images/userHeader.jpg"
        alt=""
        className={styles.user__footer}
      /> */}


      <div className={styles.user__swiper}>
        {/* <img
          src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
          alt=""
          className={styles.new}
        /> */}
        <Swiper
          effect={"cards"}
          grabCursor={true}
          // navigation={true}
          modules={[EffectCards, Navigation]}
          className="user__swiper"
          style={{
            maxWidth: "180px",
            height: "240px",
            marginTop: "1rem",
          }}
        >
          {userSwiperArray.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                width="180"
                height="240"
                style={{
                  maxWidth: "180px",
                  height: "240px",
                  borderRadius: "10px"
                  // marginTop: "1rem",
                }}
                src={item.image} alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div >
  );
}
