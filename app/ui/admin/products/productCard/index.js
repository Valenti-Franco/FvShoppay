"use client"
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
export default function ProductCard({ product }) {
  console.log(product);
  return (
    <div className={styles.product}>
      <h1 className={styles.product__name}>{product.nombre}</h1>
      <h2 className={styles.product__category}>#{product.categoryId}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        style={{ padding: "5px 0 5px 5px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.imagenes.map(image => (
          <SwiperSlide key={image.id}>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={image?.url} alt="" />

              </div>

              <div className={styles.product__actions}>
                <Link href={`/admin/dashboard/product/${product.id}`}>
                  <TbEdit />
                </Link>
                <Link href={`/product/${product.id}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>
    </div>
  );
}
