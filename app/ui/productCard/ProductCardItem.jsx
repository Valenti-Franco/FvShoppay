import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import axios from "axios";
import { Suspense } from "react";
const ProductCardItem = async ({ product }) => {
  //   function delay(ms) {
  //     return new Promise((resolve) => setTimeout(resolve, ms));
  //   }
  //   await delay(300);
  console.log(product);
  return (
    <div className={styles.product} key={product.id}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.id}`}>
          <div>
            {/* <Suspense fallback={<div>loading..</div>}> */}

            <ProductSwiper images={product.imagenes} />
            {/* </Suspense> */}
          </div>
        </Link>
        {!product.discount ? (
          <div className={styles.product__discount}>-15%</div>
        ) : (
          ""
        )}
        <div className={styles.product__infos}>
          <h1>
            {product.nombre?.length > 45
              ? `${product.nombre.substring(0, 45)}...`
              : product.nombre}
          </h1>
          <span>USD${product.precio}$</span>
          <div className={styles.product__colors}>
            {/* Your color mapping logic here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
