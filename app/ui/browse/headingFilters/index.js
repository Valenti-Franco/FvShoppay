"use client"
import { Tooltip } from "@mui/material";
import styles from "./styles.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdateQueryString from "../updateQueryString";
// import { useRouter } from "next/router";

export default function HeadingFilters({

}) {
  const { minPrice, maxPrice, updateQueryString } = UpdateQueryString();
  const router = useRouter();
  const [show, setShow] = useState(false);


  const [selectedPrice, setSelectedPrice] = useState(minPrice.length ? parseInt(minPrice) : 0);
  const [selectedPriceMax, setSelectedPriceMax] = useState(maxPrice.length ? parseInt(maxPrice) : 1000);

  const [ishovermin, setishovermin] = useState(false)
  const [ishovermax, setishovermax] = useState(false)

  const onChangeMin = (e) => {

    setSelectedPrice(e.target.value)
    setishovermin(true)

  }
  const onChangeMax = (e) => {

    setSelectedPriceMax(e.target.value, "max")
    setishovermax(true)

  }

  // const check = replaceQuery(
  //   "shipping",
  //   router.query?.shipping == "0" ? false : "0"
  // );
  // const checkRating = replaceQuery("rating", "4");
  const sortQuery = "";
  // console.log("sortQuery", sortQuery);
  return (
    <div className={styles.filters}>
      <div className={styles.filters__price}>
        <div className="flex gap-4 items-center">
          <span>Price :</span>
          <div className=" flex relative flex-col">
            <input
              type="number"
              placeholder={selectedPrice}
              min={0}
              value={selectedPrice}
              onChange={(e) => onChangeMin(e)}
            />

          </div>

          <div className=" flex relative flex-col">

            <input
              type="number"
              placeholder={selectedPriceMax}
              min={selectedPrice}
              value={selectedPriceMax}
              onChange={(e) => onChangeMax(e)}
            />


          </div>
        </div>

        {selectedPriceMax < selectedPrice ? (
          null
        ) : (
          (ishovermin || ishovermax) && (

            <a className="  flex w-full justify-center items-center text-xs bg-gray-200 font-extrabold  hover:bg-gray-400  p-1 rounded-md border-solid border-2 border-sky-500 " href={updateQueryString([selectedPrice, selectedPriceMax], "price")}>Apply </a>

          )
        )}
      </div>
      <div className={styles.filers__priceBtns}>
        <Tooltip
          title={<h2>Check out products under 10$</h2>}
          placement="top"
          arrow
        // onClick={() => multiPriceHandler(0, 10)}
        >
          <button className={styles.tooltip_btn}>
            <a href={updateQueryString([0, 10], "price")} >
              <span style={{ height: "10%" }}></span>
            </a>
          </button>

        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 10$ and 50$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <a href={updateQueryString([10, 50], "price")} >

              <span style={{ height: "25%" }}></span>
            </a>

          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 50$ and 100$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <a href={updateQueryString([50, 100], "price")} >

              <span style={{ height: "50%" }}></span>
            </a>

          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 100$ and 500$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <a href={updateQueryString([100, 500], "price")} >

              <span style={{ height: "75%" }}></span>
            </a>

          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products for more than 500$</h2>}
          placement="top"
          arrow
        >
          <button className={styles.tooltip_btn}>
            <a href={updateQueryString([500, 9999], "price")} >


              <span style={{ height: "100%" }}></span>
            </a>
          </button>
        </Tooltip>
      </div>
      {/* <div
        className={styles.filters__shipping}
      // onClick={() => shippingHandler(check.result)}
      >
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
          // checked={router.query.shipping == "0"}
          checked={false}

        />
        <label htmlFor="shipping">Free Shipping</label>
      </div> */}
      {/* <div
        className={styles.filters__rating}
        onClick={() => ratingHandler(checkRating.result)}
      >
        <input
          type="checkbox"
          name="rating"
          id="rating"
          // checked={router.query.rating == "4"}
          checked={false}


        />
        <label htmlFor="rating">
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar /> & up
        </label>
      </div> */}
      {/* <div className={styles.filters__sort}>
        <span>Sort by</span>
        <div
          className={styles.filters__sort_list}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button>
            {sortQuery == ""
              ? "Recommend"
              : sortingOptions.find((x) => x.value == sortQuery).name}
            <div
              style={{ tarnsform: `${show ? "rotate(180deg)" : "rotate(0"}` }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            {sortingOptions.map((option, i) => (
              <li key={i} onClick={() => sortHandler(option.value)}>
                <a>
                  {sortQuery == option.value ? (
                    <b>{option.name}</b>
                  ) : (
                    option.name
                  )}{" "}
                  {sortQuery == option.value ? <BsCheckLg /> : ""}
                  {sortQuery !== option.value ? (
                    <div className={styles.check}>
                      <BsCheckLg />
                    </div>
                  ) : (
                    ""
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}
const sortingOptions = [
  {
    name: "Recommend",
    value: "",
  },
  {
    name: "Most Popular",
    value: "popular",
  },
  {
    name: "New Arrivals",
    value: "newest",
  },
  {
    name: "Top Selling",
    value: "topSelling",
  },
  {
    name: "Top Reviewed",
    value: "topReviewed",
  },
  {
    name: "Price (low to high)",
    value: "priceLowToHight",
  },
  {
    name: "Price (high to low)",
    value: "priceHighToLow",
  },
];
