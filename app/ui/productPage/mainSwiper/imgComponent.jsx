"use client";
import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import styles from "./styles.module.scss";

const ImgComponent = ({ images, activeImg }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className={styles.swiper__active}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "",
              isFluidWidth: true,
              src: activeImg || images[active]?.url,
            },
            largeImage: {
              src: activeImg || images[active]?.url,
              width: 1500,
              height: 1500,
            },
            enlargedImageContainerDimensions: {
              width: "200%",
              height: "100%",
            },
          }}
        />
      </div>
      <div className={styles.swiper__list}>
        {images.map((img, i) => (
          <div
            className={`${styles.swiper__list_item} ${
              i == active && styles.active
            }`}
            key={i}
            onMouseOver={() => setActive(i)}
          >
            <img src={img.url} alt="" key={i} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImgComponent;
