"use client"


import styles from "./styles.module.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import ima from '../../../public/swiper'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default function MainSwiper() {
  // await delay(3000);
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.mainSwiper}
      >
        {/* <h1>hola</h1> */}
        {[...Array(10).keys()].map((i, index) => (
          <SwiperSlide
            key={index}>
            <Image width={1000} height={1000} src={`/swiper/${i + 1}.jpg`} alt="" />
            <Image className={styles.imgBg} width={1000} height={500} src={`/swiper/${i + 1}.jpg`} alt="" />

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
