import AcmeLogo from "@/app/ui/acme-logo";
import Image from "next/image";
import Menu from "../PageMain/index";
import Offers from "../PageMain/offers";
import Header from "../PageMain/Header";
import Footer from "../PageMain/footer";

import UserSsr from "../PageMain/UserSsr";
import MainSwiperSrr from "../PageMain/MainSwiperSSr";

import ProductsSwiper from "../PageMain/productsSwiper/ProductsSwiperSsr";
// import ProductCard from "../productCard/ProductCardSsr";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
import { Navigation } from "swiper";
import styles from "../PageMain/styles.module.scss";
// import styles2 from "../PageMain/productsSwiper/styles.module.scss";

import FlashDeals from "../flashDeals";

// import { useMediaQuery } from "react-responsive";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../../data/home";

import Category from "../PageMain/category";

import Link from "next/link";
// import axios from 'axios';
import { Suspense } from "react";
import ContentLoader from "react-content-loader";
import HeaderPlaceHolder from "../PageMain/HeaderPlaceHolder";
import MenuPlaceHolder from "../PageMain/MenuPlaceHolder";
import OffersPlaceHolder from "../PageMain/OffersPlaceHolder";
import MainSwiperPlaceHolder from "../PageMain/MainSwiperPlaceHolder";
import UserPlaceHolder from "../PageMain/UserPlaceHolder";

import FlashDealsPlaceHolder from "../flashDeals/flashPlaceHolder";

export default function Main() {
  //   const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  //   const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div style={{ contain: "content" }}>
      <div className={styles.main}>
        <head>
          <title>Home - FV Shoppay</title>
          <meta property="og:title" content="My page title" key="title" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <Suspense fallback={<HeaderPlaceHolder />}>
          <Header />
        </Suspense>

        <Suspense fallback={<MenuPlaceHolder />}>
          <Menu />
        </Suspense>
        <Suspense fallback={<MainSwiperPlaceHolder />}>
          <MainSwiperSrr />
        </Suspense>
        <Suspense fallback={<OffersPlaceHolder />}>
          <Offers />
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

      <Suspense fallback={<FlashDealsPlaceHolder />}>
        <ProductsSwiper
          products={women_swiper}
          bg="#ff82ff"
          category="1"
          header="Clothes"
        />
      </Suspense>
      <Suspense fallback={<FlashDealsPlaceHolder />}>
        <ProductsSwiper
          products={gamingSwiper}
          bg="#2f82ff"
          category="2"
          header="Electronics"
        />
      </Suspense>
      <Suspense fallback={<FlashDealsPlaceHolder />}>
        <ProductsSwiper
          products={homeImprovSwiper}
          header="For Gamers"
          bg="#5a31f4"
          category="3"
        />
      </Suspense>
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
  );
}
{
  /* <div className={styles2.category} style={{ background: `red` }}>
      <div className={styles.category__header}>
      <h1>Products</h1>

        {/* <BsArrowRightCircle /> */
}
