"use client";
import Payment from "../checkout/payment";
import styles from "../../../styles/profile.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PagePayment() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (!session) {
    // Redirect to sign-in page if not authenticated
    router.replace("/Signin");
    return null;
  }
  return (
    // <Layout session={session.user}>
    <>
      <head>
        <title>Profile / Payment</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className={styles.header}>
        <h1>MY PAYMENT METHODS</h1>
      </div>
      <Payment />
    </>
    // </Layout>
  );
}
