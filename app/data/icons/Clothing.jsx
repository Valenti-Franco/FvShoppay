import Image from "next/image";

import nike from "../../../public/nike.webp";
const Clothing = () => {
  return (
    <Image
      width={1000}
      height={1000}
      className="w-full margin-auto left-0 absolute  h-full object-contain "
      src={nike.src}
    />
  );
};

export default Clothing;
