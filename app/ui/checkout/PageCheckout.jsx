"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/checkout.module.scss";
import Shipping from "./shipping";
import Payment from "./payment";
import Summary from "./summary";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Products from "./products";
import { useRouter } from "next/navigation";

const PageCheckout = () => {
  useEffect(() => {
    setAddresses(session?.user?.dirreccion);
  }, []);

  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const router = useRouter();

  if (!session) {
    // Redirect to sign-in page if not authenticated
    router.replace("/Signin");
    return null;
  }
  // console.log(session);

  //   console.log("cart --->", cart.cartItems);
  return (
    <>
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={session?.user}
            addresses={addresses}
            setAddresses={setAddresses}
            token={session?.user.token}
          />
          <Products cart={cart.cartItems} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
          // paymentMethod={paymentMethod}
          // setPaymentMethod={setPaymentMethod}
          />
          <Summary
            // totalAfterDiscount={totalAfterDiscount}
            // setTotalAfterDiscount={setTotalAfterDiscount}
            user={session?.user}
            cart={cart}
            // paymentMethod={paymentMethod}
            // selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
};

export default PageCheckout;
