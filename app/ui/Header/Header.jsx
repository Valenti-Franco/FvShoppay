"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Top from "./Top";
import Ad from "./Ad";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import logo from "../../../public/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => ({ ...state }));
  const valor = useSearchParams();
  const search = valor.get("search");

  const [query, setQuery] = useState(search || "all");
  const { data: session, status } = useSession();

  const country = {
    name: "Argentina",
    flag: "https://static.vecteezy.com/system/resources/previews/011/571/494/original/circle-flag-of-argentina-free-png.png",
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (query.length > 1) {
      router.push(`/browse?search=${query}`);
    }
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
        <div className=" flex justify-center w-1/2 gap-5">
          <Link href={"/"}>
            <Image width={120} height={50} src={logo.src} />
          </Link>
          <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
            <input
              className={styles.inputSeach}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <a
              href={`/browse?search=${query ? query : "all"}`}
              type="submit"
              className={styles.search__icon}
            >
              <RiSearch2Line />
            </a>
          </form>
          <Link className={styles.cart} href="/cart">
            <FaOpencart />
            <span>{cart.cartItems.length}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
