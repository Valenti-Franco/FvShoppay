import Image from "next/image";
import electronic from "../../../public/electronic.webp";
const Electronics = () => {
  return (
    <Image
      width={1000}
      height={1000}
      className="w-full margin-auto left-0 absolute  h-full object-contain "
      src={electronic.src}
    >
      {/* <svg
        className="w-10 m-auto md:w-full"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            // fill="#000000"
            d="M472,232H424V120a24.028,24.028,0,0,0-24-24H40a24.028,24.028,0,0,0-24,24V366a24.028,24.028,0,0,0,24,24H212v50H152v32H304V440H244V390h92v58a24.027,24.027,0,0,0,24,24H472a24.027,24.027,0,0,0,24-24V256A24.027,24.027,0,0,0,472,232ZM336,256V358H48V128H392V232H360A24.027,24.027,0,0,0,336,256ZM464,440H368V264h96Z"
            class="ci-primary"
          ></path>{" "}
        </g>
      </svg> */}
    </Image>
  );
};

export default Electronics;
