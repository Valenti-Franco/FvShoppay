import Menu from "./ui/PageMain/index";
import OffersSsr from "./ui/PageMain/OffersSsr";
import Header from "./ui/PageMain/Header";
import Footer from "./ui/PageMain/footer";

import ProductsSwiperSrr from "./ui/PageMain/productsSwiper/ProductsSwiperSsr";
// import ProductCard from "./ui/productCard";
// import ProductCard from './ui/productCard'
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Navigation } from "swiper";
// import { useSession } from "next-auth/react";
import styles from "./ui/PageMain/styles.module.scss";
import styles2 from "./ui/PageMain/productsSwiper/styles.module.scss";
import FlashDeals from "./ui/flashDeals";

import { useMediaQuery } from "react-responsive";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "./data/home";

import Category from "./ui/PageMain/category";

import Link from "next/link";
// import axios from 'axios';
// import { Suspense, useEffect } from 'react';
import ContentLoader from "react-content-loader";
import { Suspense } from "react";
import HeaderPlaceHolder from "./ui/PageMain/HeaderPlaceHolder";
import MenuPlaceHolder from "./ui/PageMain/MenuPlaceHolder";
import OffersPlaceHolder from "./ui/PageMain/OffersPlaceHolder";
import MainSwiperPlaceHolder from "./ui/PageMain/MainSwiperPlaceHolder";
import UserPlaceHolder from "./ui/PageMain/UserPlaceHolder";
import MainSwiperSSr from "./ui/PageMain/MainSwiperSSr";
import UserSsr from "./ui/PageMain/UserSsr";

import FlashDealsPlaceHolder from "./ui/flashDeals/flashPlaceHolder";
import { fetchProducts } from "./lib/data";

export const metadata = {
  title: "FV Shoppay, shop for your favorite products",
  description:
    "Welcome to FV Shoppay, the best place to shop for your favorite products",
};

export default async function Page() {
  const products = await fetchProducts();
  return (
    <>
      <head>
        <title>Home - FV Shoppay</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main>
        <div style={{ contain: "content" }}>
          <div className={styles.main}>
            <Suspense fallback={<HeaderPlaceHolder />}>
              <Header />
            </Suspense>

            <Suspense fallback={<MenuPlaceHolder />}>
              <Menu />
            </Suspense>
            <Suspense fallback={<MainSwiperPlaceHolder />}>
              <MainSwiperSSr />
            </Suspense>
            <Suspense fallback={<OffersPlaceHolder />}>
              <OffersSsr />
            </Suspense>
            <Suspense fallback={<UserPlaceHolder />}>
              <UserSsr />
            </Suspense>
          </div>

          <Suspense fallback={<FlashDealsPlaceHolder />}>
            <FlashDeals />
          </Suspense>

          <div className=" flex justify-around  max-md:flex-col ">
            <Suspense fallback={<FlashDealsPlaceHolder />}>
              <Category
                header="Dresses"
                products={women_dresses}
                background="#5a31f4"
              />
            </Suspense>

            <div className=" hidden lg:block ">
              <Suspense fallback={<FlashDealsPlaceHolder />}>
                <Category
                  header="Shoes"
                  products={women_shoes}
                  background="#3c811f"
                />
              </Suspense>
            </div>
            <div className=" lg:hidden block ">
              <Suspense fallback={<FlashDealsPlaceHolder />}>
                <Category
                  header="Shoes"
                  products={women_shoes}
                  background="#3c811f"
                />
              </Suspense>
            </div>
            <Suspense fallback={<FlashDealsPlaceHolder />}>
              <Category
                header="Accessories"
                products={women_accessories}
                background="#000"
              />
            </Suspense>
          </div>

          {/* <Suspense fallback={<FlashDealsPlaceHolder />}> */}
          <ProductsSwiperSrr
            products={products}
            bg="#ff82ff"
            category="1"
            header="Clothes"
          />
          {/* </Suspense> */}
          {/* <Suspense fallback={<FlashDealsPlaceHolder />}> */}
          <ProductsSwiperSrr
            products={products}
            bg="#2f82ff"
            category="2"
            header="Electronics"
          />
          {/* </Suspense> */}
          {/* <Suspense fallback={<FlashDealsPlaceHolder />}> */}
          <ProductsSwiperSrr
            products={products}
            header="For Gamers"
            bg="#5a31f4"
            category="3"
          />
          {/* </Suspense> */}
          {/* <div className={styles2.wrapper}>
        <div className={styles2.header} style={{ background: `red` }}>
          Products
        </div> */}
          {/* <Suspense
           fallback={
             <div className="flex">
               <SwiperSlide style={{ width: "300px" }}>
                 <ContentLoader
                   speed={2}
                   width={290}
                   height={450}
                   viewBox="0 0 290 400"
                   backgroundColor="#dfdddd"
                   foregroundColor="#d0cdcf"
                 >
                   <rect x="1" y="-1" rx="25" ry="25" width="290" height="380" />
                 </ContentLoader>
               </SwiperSlide>
               <SwiperSlide style={{ width: "300px" }}>
                 <ContentLoader
                   speed={2}
                   width={290}
                   height={450}
                   viewBox="0 0 290 400"
                   backgroundColor="#dfdddd"
                   foregroundColor="#d0cdcf"
                 >
                   <rect x="1" y="-1" rx="25" ry="25" width="290" height="380" />
                 </ContentLoader>
               </SwiperSlide>
               <SwiperSlide style={{ width: "300px" }}>
                 <ContentLoader
                   speed={2}
                   width={290}
                   height={450}
                   viewBox="0 0 290 400"
                   backgroundColor="#dfdddd"
                   foregroundColor="#d0cdcf"
                 >
                   <rect x="1" y="-1" rx="25" ry="25" width="290" height="380" />
                 </ContentLoader>
               </SwiperSlide>
               <SwiperSlide style={{ width: "300px" }}>
                 <ContentLoader
                   speed={2}
                   width={290}
                   height={450}
                   viewBox="0 0 290 400"
                   backgroundColor="#dfdddd"
                   foregroundColor="#d0cdcf"
                 >
                   <rect x="1" y="-1" rx="25" ry="25" width="290" height="380" />
                 </ContentLoader>
               </SwiperSlide>
             </div>
           }
         >
           <ProductCard />
         </Suspense> */}
          {/* </div> */}
          <Footer />
        </div>
      </main>
    </>
  );
}
{
  /* <div className={styles2.category} style={{ background: `red` }}>
      <div className={styles.category__header}>
      <h1>Products</h1>

        {/* <BsArrowRightCircle /> */
}
