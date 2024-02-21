
import { simillar_products } from "../../../data/products";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules

import { Navigation } from "swiper";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
export default function SimillarSwiper() {
  const [products, setproducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get("https://fvecommerce.somee.com/api/Productos");
    setproducts(res.data);
    console.log(res.data)
  }
  useEffect(() => {
    getProducts();
  }, [])

  return (
    products.length > 0 && (
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        slidesPerGroup={3}
        navigation={true}
        modules={[Navigation]}
        className="swiper simillar_swiper products__swiper"
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 5,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <Link style={{ width: "100px", height: "300px", margin: "auto" }} href={`/product/${product.id}`}>
              <Image className=" object-fill" width={100} height={300} src={product?.imagenes[0].url} alt="" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}
