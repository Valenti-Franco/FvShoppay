"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Top from "./Top";
import Ad from "./Ad";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import logo from "../../../public/logo.png";
require("dotenv").config();
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams, navigate } from "next/navigation";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => ({ ...state }));
  const valor = useSearchParams();
  const search = valor.get("search");

  const [query, setQuery] = useState(search || "all");
  const { data: session, status } = useSession();
  const [Names, setNames] = useState([]);
  const [country, setcountry] = useState("");
  // const countryGet = async () => {
  //   const response = await axios.get(`https://api.ipregistry.co/?key={procces.env.IPREGISTER}`);
  //   const data = await response.json();
  //   console.log(data);

  // }
  // Fetch the data from the API

  const CountryGet = async () => {
    try {
      const hasFetchedData = localStorage.getItem("hasFetchedData");

      if (hasFetchedData) {
        // Si ya se ha hecho la solicitud, no se hace nuevamente
        setcountry(JSON.parse(hasFetchedData));
        return;
      }

      const response = await axios.get(
        `https://api.ipregistry.co/?key=m28ilfla102o193t`
      );
      const responseData = response.data;
      setcountry({
        name: responseData.location.country.name,
        flag: responseData.location.country.flag.emojitwo,
      });

      // Almacenar el valor en el almacenamiento local para recordar que se ha hecho la solicitud
      //guarda la respuesta
      localStorage.setItem(
        "hasFetchedData",
        JSON.stringify({
          name: responseData.location.country.name,
          flag: responseData.location.country.flag.emojitwo,
        })
      );
      // localStorage.setItem("hasFetchedData", {
      //   name: responseData.location.country.name,
      //   flag: responseData.location.country.flag.emojitwo,
      // });
    } catch (error) {
      console.log("first");
      console.error("Error fetching data:", error);
      setcountry({
        name: "Argentina",
        flag: "https://cdn.ipregistry.co/flags/emojitwo/ar.svg",
      });
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fvecommerce.somee.com/api/Productos?pagina=1&tamanoPagina=1000"
      );

      const responseData = response.data;

      // Assuming responseData is an array of objects and each object has a 'nombre' property
      const namesArray = responseData.map((item) => item.nombre);

      // Set the names in the state
      // console.log(namesArray);
      setNames(namesArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the fetchData function
  useEffect(() => {
    fetchData();
    CountryGet();
  }, []);

  // const Names = [
  //   { label: "The Shawshank Redemption", year: 1994 },
  //   { label: "The Godfather", year: 1972 },
  //   { label: "The Godfather: Part II", year: 1974 },
  //   { label: "The Dark Knight", year: 2008 },
  //   { label: "12 Angry Men", year: 1957 },
  //   { label: "Schindler's List", year: 1993 },
  //   { label: "Pulp Fiction", year: 1994 },
  // ];

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log(query);
  //   if (query) {
  //     router.refresh();

  //     router.push(`/browse?search=${query}`);
  //     console.log(query);
  //   }
  //   // ();
  // };
  const handleAutocompleteChange = (event, value) => {
    // 'value' is the selected option from Autocomplete
    setQuery(value || ""); // Set the query to the selected value or an empty string if nothing is selected
  };
  return (
    <>
      <Ad />
      <div className=" w-full text-center shadow-sm bg-gray-50 h-12 flex justify-end flex-row items-center ">
        <Top country={country} />
        {/* <Link href="#" class="relative block">
        <Image
          height={50}
          width={50}
          alt="profil"
          src="https://www.tailwind-kit.com/images/person/1.jpg"
          class="mx-auto object-cover rounded-full h-10 w-10 "
        />
      </Link> */}
      </div>
      <div className=" flex justify-center w-full gap-5">
        <div className=" flex justify-center  xl:w-1/2 sm:flex-row  flex-col  w-full gap-5">
          <Link href={"/"}>
            <Image width={120} height={50} src={logo.src} />
          </Link>
          <div className="flex items-center w-full">
            <div className={styles.search}>
              {/* <input
              className={styles.inputSeach}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            /> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Names}
                value={query === "all" ? "" : query}
                onChange={handleAutocompleteChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => setQuery(e.target.value)}
                    {...params}
                    label="Search"
                  />
                )}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <a
                  href={`/browse?search=${query ? query : "all"}`}
                  // type="submit"
                  className={styles.search__icon}
                >
                  <RiSearch2Line />
                </a>
              </motion.button>
            </div>
            <Link className={styles.cart} href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaOpencart />
                <span>{cart.cartItems.length}</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
