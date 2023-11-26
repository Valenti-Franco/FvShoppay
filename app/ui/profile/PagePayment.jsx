import Layout from "./layout/PageLayout";
import Payment from "../checkout/payment";
import styles from "../../../styles/profile.module.scss";
import { useSession } from "next-auth/react";

export default async function PagePayment() {
  //   const { data: session, status } = useSession();

  return (
    // <Layout session={session.user}>
    <>
      <div className={styles.header}>
        <h1>MY PAYMENT METHODS</h1>
      </div>
      <Payment />
    </>
    // </Layout>
  );
}
