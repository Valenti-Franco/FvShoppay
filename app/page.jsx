"use client";

import AcmeLogo from "@/app/ui/acme-logo";
import Image from "next/image";
import Menu from "./ui/PageMain/index";
import Offers from "./ui/PageMain/offers";
import Header from "./ui/PageMain/Header";
import User from "./ui/PageMain/User";
import MainSwiper from "./ui/PageMain/swiper";
import Footer from "./ui/PageMain/footer";
import ProductsSwiper from "./ui/PageMain/productsSwiper";
import ProductCard from "./ui/productCard";
// import ProductCard from './ui/productCard'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { useSession } from "next-auth/react";
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
export default function Page() {
  const { data: session, status } = useSession();

  // const [products, setProducts] = useState([])
  // const [loadingProducts, setLoadingProducts] = useState(true);
  // const [category, setCategory] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       // await new Promise(resolve => (resolve, 40000))
  //       const response = await axios.get("https://fvshoppay.somee.com/api/Productos");
  //       console.log(response);
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }finally {
  //       // Set loading to false whether the request succeeds or fails
  //       setLoadingProducts(false);
  //     }
  //   };

  //   const fetchCategory = async () => {
  //     try {
  //       const responseCategory = await axios.get("https://fvshoppay.somee.com/api/Category");
  //       console.log(responseCategory);
  //       setCategory(responseCategory.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   // Invoca la función para que se ejecute
  //   fetchProducts();

  //   fetchCategory()
  // }, []); // Asegúrate de pasar un arreglo vacío como dependencia si solo quieres que se ejecute una vez al montar el componente

  // console.log(products);
  // console.log(category);

  // Resto del código...

  const country = {
    name: "Morocco",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
  };
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div>
      <div className={styles.main}>
        <Suspense fallback={<div>Loaging..</div>}>
          <Header />
        </Suspense>

        <Suspense fallback={<div>Loaging..</div>}>
          <Menu />
        </Suspense>
        <Suspense fallback={<div>Loaging..</div>}>
          <MainSwiper />
        </Suspense>
        <Suspense fallback={<div>Loaging..</div>}>
          <Offers />
        </Suspense>
        <Suspense fallback={<div>Loaging..</div>}>
          <User />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loaging..</div>}>
        <FlashDeals />
      </Suspense>

      <div className=" flex justify-around  max-md:flex-col ">
        <Suspense fallback={<div>Loaging..</div>}>
          <Category
            header="Dresses"
            products={women_dresses}
            background="#5a31f4"
          />
        </Suspense>

        {!isMedium && (
          <Suspense fallback={<div>Loaging..</div>}>
            <Category
              header="Shoes"
              products={women_shoes}
              background="#3c811f"
            />
          </Suspense>
        )}
        {isMobile && (
          <Suspense fallback={<div>Loaging..</div>}>
            <Category
              header="Shoes"
              products={women_shoes}
              background="#3c811f"
            />
          </Suspense>
        )}
        <Suspense fallback={<div>Loaging..</div>}>
          <Category
            header="Accessories"
            products={women_accessories}
            background="#000"
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loaging..</div>}>
        <ProductsSwiper
          products={women_swiper}
          header="For Women"
          bg="#ff82ff"
        />
      </Suspense>
      <Suspense fallback={<div>Loaging..</div>}>
        <ProductsSwiper
          products={gamingSwiper}
          header="For Gamers"
          bg="#2f82ff"
        />
      </Suspense>
      <Suspense fallback={<div>Loaging..</div>}>
        <ProductsSwiper
          products={homeImprovSwiper}
          header="House Improvements"
          bg="#5a31f4"
        />
      </Suspense>

      <div className={styles2.wrapper}>
        <div className={styles2.header} style={{ background: `red` }}>
          Products
        </div>

        <Suspense
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
        </Suspense>
      </div>

      <Footer country={country} />
    </div>
  );
}
{
  /* <div className={styles2.category} style={{ background: `red` }}>
      <div className={styles.category__header}>
      <h1>Products</h1>

        {/* <BsArrowRightCircle /> */
}
