"use client";
import styles from "./styles.module.scss";
import Head from "next/head";
// import Header from "../../header";
import Sidebar from "../sidebar";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      {/* <Header /> */}
      <div className={styles.layout__container}>
        {status === "authenticated" ? (
          <Sidebar
            data={{
              ...session.user,
            }}
          />
        ) : null}
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
