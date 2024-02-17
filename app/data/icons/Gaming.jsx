import React from "react";
import gaming from "../../../public/gaming.webp";
import Image from "next/image";

const Gaming = () => {
  return (
    <Image
      width={500}
      height={500}
      className="w-full margin-auto left-0 absolute  h-full object-contain "
      src={gaming.src}
    ></Image>
  );
};

export default Gaming;
