import Link from "next/link";
import styles from "./styles.module.scss";

import { signOut, signIn } from "next-auth/react";
// import { ConnectingAirportsOutlined } from "@mui/icons-material";


export default function UserMenu({ session }) {


  return (

    <div className={styles.menu}>

      <h4>Welcome to FV Shoppay !</h4>
      {session ? (
        <div className={styles.flex}>
          <img src={session.user?.imagen?.url ? session.user.imagen.url : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} alt="" className={styles.menu__img} />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session?.user?.nombre}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <Link className={styles.btn_outlined} href={"/Signin"}>
            Login

          </Link>

        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>

        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
