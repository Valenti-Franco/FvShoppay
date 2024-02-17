import Image from "next/image";

import dress from "../../../public/dress.webp";
const WomenClothing = () => {
  return (
    <Image
      width={1000}
      height={1000}
      className="w-full margin-auto left-0 absolute  h-full object-contain "
      src={dress.src}
    />
  );
};

export default WomenClothing;
