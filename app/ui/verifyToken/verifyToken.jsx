"use client";
import axios from "axios";
import { useParams, redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../loaders/dotLoader/index";
const VerifyToken = () => {
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(true);

  const token = useParams();

  const fetchData = async () => {
    try {
      const data = await axios.post(
        `https://fvecommerce.somee.com/api/Usuarios/VerificarEmail?token=${token.id}`,
        {}
      );

      seterror(false);
    } catch (error) {
      seterror(error.message);
      console.log(error.message);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-start ">
      {loading ? (
        <Loading />
      ) : !error ? (
        <div className="flex gap-4 m-10 bg-gray-100 p-14 rounded-lg flex-col">
          <h3 className=" text-2xl font-bold">Email verified correctly!</h3>

          <svg
            className="h-36"
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M964.6 202.2L599.8 528.7c-48.4 43.3-121.6 43.3-169.9 0L65 202.2c-19 13.5-31.5 35.5-31.5 60.6v507c0 41.1 33.3 74.4 74.4 74.4h813.6c41.1 0 74.4-33.3 74.4-74.4v-507c0.2-25.1-12.3-47.1-31.3-60.6z"
                fill="#9DC6AF"
              ></path>
              <path
                d="M921.7 857H108c-48.1 0-87.2-39.1-87.2-87.2v-507c0-28.1 13.8-54.6 36.8-71l8.3-5.9 372.5 333.3c43.6 39 109.3 39 152.8 0l372.5-333.3 8.3 5.9c23.1 16.4 36.8 43 36.8 71v507c0.1 48.1-39 87.2-87.1 87.2zM64.8 219.1c-11.6 11.5-18.3 27.2-18.3 43.7v507c0 34 27.6 61.6 61.6 61.6h813.6c34 0 61.6-27.6 61.6-61.6v-507c0-16.4-6.7-32.2-18.3-43.7L608.4 538.2c-53.3 47.7-133.7 47.7-187 0L64.8 219.1z"
                fill="#191919"
              ></path>
              <path
                d="M429.9 503.9L65 830.4c12.2 8.6 26.9 13.8 43 13.8h813.6c16.1 0 30.8-5.2 43-13.8L599.8 503.9c-48.4-43.3-121.5-43.3-169.9 0z"
                fill="#FAFCFB"
              ></path>
              <path
                d="M921.7 857H108c-18.1 0-35.5-5.6-50.4-16.2-3.2-2.3-5.2-5.8-5.4-9.7-0.2-3.9 1.3-7.7 4.2-10.3l364.8-326.5c53.3-47.7 133.7-47.7 187 0L973 820.8c2.9 2.6 4.5 6.4 4.2 10.3-0.2 3.9-2.2 7.5-5.4 9.7-14.6 10.6-32.1 16.2-50.1 16.2zM87.2 827.7c6.6 2.4 13.7 3.7 20.8 3.7h813.6c7.1 0 14.1-1.3 20.8-3.7L591.3 513.4c-43.6-39-109.3-39-152.8 0L87.2 827.7z"
                fill="#0F0F0F"
              ></path>
              <path
                d="M599.8 579.9l364.8-375.6c-12.2-9.9-26.9-15.9-43-15.9H108c-16.1 0-30.8 6-43 15.9l364.8 375.6c48.5 49.8 121.6 49.8 170 0z"
                fill="#FAFCFB"
              ></path>
              <path
                d="M514.8 630.1c-34.9 0-68.3-14.6-94.2-41.2L55.9 213.2c-2.5-2.6-3.8-6.1-3.6-9.7 0.2-3.6 1.9-6.9 4.7-9.2 15-12.3 32.7-18.8 51.1-18.8h813.6c18.4 0 36 6.5 51.1 18.8 2.8 2.3 4.5 5.6 4.7 9.2s-1.1 7.1-3.6 9.7L609 588.8c-25.8 26.6-59.3 41.3-94.2 41.3zM85.1 206.5l354 364.5c21 21.6 47.9 33.5 75.8 33.5s54.8-11.9 75.8-33.5l354-364.5c-7.3-3.5-15-5.4-22.9-5.4H108c-7.9 0.1-15.6 1.9-22.9 5.4z"
                fill="#0F0F0F"
              ></path>
              <path
                d="M260.1 351.7c0-24.6 17.2-44.8 38.2-44.8 21 0 38.2 20.1 38.2 44.8"
                fill="#FAFCFB"
              ></path>
              <path
                d="M336.6 364.5c-7.1 0-12.8-5.7-12.8-12.8 0-17.3-11.6-32-25.4-32-13.8 0-25.4 14.6-25.4 32 0 7.1-5.7 12.8-12.8 12.8-7.1 0-12.8-5.7-12.8-12.8 0-31.8 22.9-57.6 51.1-57.6 28.2 0 51.1 25.8 51.1 57.6-0.2 7.1-6 12.8-13 12.8z"
                fill="#0F0F0F"
              ></path>
              <path
                d="M693.1 351.7c0-24.6 17.2-44.8 38.2-44.8 21 0 38.2 20.1 38.2 44.8"
                fill="#FAFCFB"
              ></path>
              <path
                d="M769.6 364.5c-7.1 0-12.8-5.7-12.8-12.8 0-17.3-11.6-32-25.4-32-13.8 0-25.4 14.6-25.4 32 0 7.1-5.7 12.8-12.8 12.8s-12.8-5.7-12.8-12.8c0-31.8 22.9-57.6 51.1-57.6s51.1 25.8 51.1 57.6c-0.2 7.1-5.9 12.8-13 12.8z"
                fill="#0F0F0F"
              ></path>
              <path
                d="M419.7 383.4c0 46.3 42.8 84.2 95.1 84.2s95.1-37.9 95.1-84.2v-28.1H419.7v28.1z"
                fill="#5B5143"
              ></path>
              <path
                d="M514.8 480.4c-59.5 0-108-43.5-108-97v-28.1c0-7.1 5.7-12.8 12.8-12.8H610c7.1 0 12.8 5.7 12.8 12.8v28.1c0 53.5-48.4 97-108 97z m-82.3-112.3v15.3c0 18.7 8.4 36.4 23.6 49.9 15.7 13.9 36.5 21.5 58.7 21.5 22.2 0 43-7.6 58.7-21.5 15.2-13.5 23.6-31.2 23.6-49.9v-15.3H432.5z"
                fill="#141414"
              ></path>
              <path
                d="M458.6 413a54.7 27.6 0 1 0 109.4 0 54.7 27.6 0 1 0-109.4 0Z"
                fill="#D39E33"
              ></path>
            </g>
          </svg>
          <a
            href={`/Signin`}
            class="middle flex items-center justify-center none center mr-3 rounded-lg border border-pink-500 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-dark="true"
          >
            <h2 className="text-xs p-4">Login in</h2>
          </a>
        </div>
      ) : (
        <div className="flex gap-4 m-10 bg-gray-100 p-14 rounded-lg flex-col">
          <h3 className=" text-2xl font-bold">{error}</h3>

          <svg
            className="h-36"
            viewBox="0 0 64.00 64.00"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ff0000"
            stroke="#ff0000"
            stroke-width="0.00064"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <defs></defs>
              <title></title>
              <path
                class="cls-1"
                d="M18,6.5A1.5,1.5,0,1,0,16.5,5,1.5,1.5,0,0,0,18,6.5Zm0-2a.5.5,0,1,1-.5.5A.5.5,0,0,1,18,4.5Z"
              ></path>
              <circle class="cls-1" cx="22" cy="5" r="1"></circle>
              <circle class="cls-1" cx="14" cy="5" r="1"></circle>
              <path
                class="cls-1"
                d="M32,18.5A14.5,14.5,0,1,0,46.5,33,14.51,14.51,0,0,0,32,18.5Zm0,27A12.5,12.5,0,1,1,44.5,33,12.52,12.52,0,0,1,32,45.5Z"
              ></path>
              <path
                class="cls-1"
                d="M62.2,56.54A33.69,33.69,0,0,0,51.32,45.43a2,2,0,0,0-2.26.09L47.49,44A18.95,18.95,0,0,0,35,14.26V5a5,5,0,0,0-5-5H6A5,5,0,0,0,1,5V9a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1v2a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1V59a5,5,0,0,0,5,5H30a5,5,0,0,0,5-5V51.74a19,19,0,0,0,9.1-4.1l1.42,1.42a2,2,0,0,0-.09,2.26A33.69,33.69,0,0,0,56.54,62.2l.63.63a4,4,0,0,0,5.66-5.66ZM60.15,57l-1.56,1.57L57,60.15c-.72-.46-1.41-.95-2.08-1.45l1.88-1.88a.5.5,0,0,0-.71-.71l-2,2c-.52-.42-1-.86-1.52-1.31l4.18-4.17A32.45,32.45,0,0,1,60.15,57ZM49,33A17,17,0,0,1,33.89,49.89l-.44,0C33,50,32.49,50,32,50a17,17,0,0,1,0-34c.49,0,1,0,1.45.07l.44,0A17,17,0,0,1,49,33ZM6,2H30a3,3,0,0,1,3,2.5H30a4.34,4.34,0,0,0-3.35,1.65A3.45,3.45,0,0,1,24,7.5H12A3.45,3.45,0,0,1,9.35,6.15,4.34,4.34,0,0,0,6,4.5H3.05A3,3,0,0,1,6,2ZM33,52v7a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V5.5H6A3.45,3.45,0,0,1,8.65,6.85,4.34,4.34,0,0,0,12,8.5H24a4.34,4.34,0,0,0,3.35-1.65A3.45,3.45,0,0,1,30,5.5h3V14l-1,0a19,19,0,0,0-16.37,9.41L12,20.8a3.46,3.46,0,1,0-.63.78l3.79,2.7a18.87,18.87,0,0,0,2,20.47L12.55,48a2.5,2.5,0,0,0-1.05,2v2.52a3.5,3.5,0,1,0,1,0V50a1.49,1.49,0,0,1,.63-1.22l4.61-3.3A18.94,18.94,0,0,0,32,52ZM9,21.5A2.5,2.5,0,1,1,11.5,19,2.5,2.5,0,0,1,9,21.5Zm3,32A2.5,2.5,0,1,1,9.5,56,2.5,2.5,0,0,1,12,53.5Zm34.89-8.73,1.44,1.44-2.12,2.12L44.84,47A19.26,19.26,0,0,0,46.89,44.77Zm.24,5.47,3.12-3.12a32.12,32.12,0,0,1,5.85,4.76L51.88,56.1A31.73,31.73,0,0,1,47.13,50.24ZM61.41,61.41a2,2,0,0,1-2.82,0l2.82-2.82a2,2,0,0,1,0,2.82Z"
              ></path>
              <path
                class="cls-1"
                d="M33.23,25a1.55,1.55,0,0,0-2.46,0L23.44,35.61A2.16,2.16,0,0,0,25.21,39H38.79a2.16,2.16,0,0,0,1.77-3.39Zm5.7,11.89a.15.15,0,0,1-.14.09H25.21a.15.15,0,0,1-.14-.09.16.16,0,0,1,0-.16l6.92-10,6.92,10A.16.16,0,0,1,38.93,36.91Z"
              ></path>
              <path
                class="cls-1"
                d="M32,29.5a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,1,0V30A.5.5,0,0,0,32,29.5Z"
              ></path>
              <path
                class="cls-1"
                d="M32.19,34.54a.5.5,0,0,0-.38,0,.53.53,0,0,0-.27.27.43.43,0,0,0,0,.19.47.47,0,0,0,.15.35.36.36,0,0,0,.16.11.47.47,0,0,0,.38,0,.36.36,0,0,0,.16-.11.48.48,0,0,0,0-.7A.36.36,0,0,0,32.19,34.54Z"
              ></path>
              <path
                class="cls-1"
                d="M43.65,13.35a.48.48,0,0,0,.7,0l2-2a.49.49,0,1,0-.7-.7l-2,2A.48.48,0,0,0,43.65,13.35Z"
              ></path>
              <path
                class="cls-1"
                d="M48.78,13.55l-2,1a.5.5,0,0,0,.22.95.54.54,0,0,0,.22-.05l2-1a.5.5,0,0,0-.44-.9Z"
              ></path>
              <path
                class="cls-1"
                d="M42.5,11V9a.5.5,0,0,0-1,0v2a.5.5,0,0,0,1,0Z"
              ></path>
            </g>
          </svg>
          <a
            href={`/verifyToken/${token.id}`}
            class="middle flex items-center justify-center none center mr-3 rounded-lg border border-pink-500 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-dark="true"
          >
            Refresh
            <svg
              className=" h-14 w-14"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M512 281.6c71.221 0 136.396 32.619 179.2 85.526V256h51.2v204.8H537.6v-51.2h121.511c-32.857-47.165-87.235-76.8-147.111-76.8-98.97 0-179.2 80.23-179.2 179.2 0 98.97 80.23 179.2 179.2 179.2v-.02c73.665 0 138.994-44.857 166.176-111.988l47.458 19.216C690.689 684.711 606.7 742.38 512 742.38v.02c-127.246 0-230.4-103.154-230.4-230.4 0-127.246 103.154-230.4 230.4-230.4z"
                  fill="#000000"
                  fill-rule="nonzero"
                ></path>
              </g>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default VerifyToken;
