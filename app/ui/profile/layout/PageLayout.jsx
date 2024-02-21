"use client";
import styles from "./styles.module.scss";
import Head from "next/head";
// import Header from "../../header";
import Sidebar from "../sidebar";
import { useSession } from "next-auth/react";
import { Helmet } from "react-helmet";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
export default function Layout({ isUser, user, address, children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  // si isUser es falso, se redirige a la página de inicio y se cierra sesión
  console.log(isUser);
  if (!isUser) {
    if (session) {
      signOut();
    }
    router.push("/Signin");
  }

  return (
    <div className={styles.layout}>
      {user && (
        <head>
          <title>Profile </title>
          <meta property="og:title" content="My page title" key="title" />
          <link rel="icon" href="/favicon.ico" />
        </head>
      )}
      {/* <Header /> */}
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            ...user,
          }}
          address={address}
        />

        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
