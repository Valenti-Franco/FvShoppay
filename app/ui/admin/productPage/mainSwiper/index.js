import styles from "./styles.module.scss";
import ReactImageMagnify from "react-image-magnify";

import ImgComponent from "./imgComponent";

export default async function MainSwiper({ images, activeImg }) {
  return (
    <div className={styles.swiper}>

      <ImgComponent activeImg={activeImg} images={images} />

    </div>
  );
}
