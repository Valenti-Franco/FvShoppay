"use client";
import styles from "./styles.module.scss";
import Head from "next/head";
// import Header from "../../header";
import Sidebar from "../sidebar";
import { useSession } from "next-auth/react";

export default function Layout({ user, address, children }) {
  // const { data: session, status } = useSession();

  return (
    <div className={styles.layout}>
      <Head>
        <title>{user?.nombre}</title>
      </Head>
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
