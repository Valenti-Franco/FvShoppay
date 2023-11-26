"use client"
import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import img from "../../../../public/empty.png"
import Image from "next/image";

export default function Empty() {
  const { data: session } = useSession();

  return (
    <div className={styles.empty}>
      <Image width={100} height={100} src={img.src} alt="" />
      <h1>Cart is empty</h1>
      {!session && (
        <Link href={"/Signin"}>
          <button className={styles.empty__btn}>
            SIGN IN / REGISTER
          </button>
        </Link>

      )}
      <Link href="/browse">

        <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
          SHOP NOW
        </button>

      </Link>
    </div>
  );
}
