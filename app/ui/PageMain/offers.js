// "use client"

import styles from "./styles.module.scss";
import { offersAarray } from "../../data/home";
// import { useRef, useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// import React, { createContext } from 'react';
// import required modules

import Link from "next/link";
import Image from "next/image";

export default async function Offers() {
  await delay(70);
  // console.log(offersAarray)
  return (
    // <> xd</>
    <div className={styles.offers}>
      <div className={styles.offers__text}>
        <p>
          use code <b>“FRANCO”</b> for 30% off all products.
        </p>
        <Link href="/browse">Shop now</Link>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersAarray.map((offer, index) => (
          <SwiperSlide className={styles.offers__slider} key={index}>
            <Link href="">
              <Image width={200} height={300} src={offer.image} alt="" />
            </Link>
            <span>{offer.price}$</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
