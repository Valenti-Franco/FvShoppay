import Link from "next/link";
import styles from "./styles.module.scss";

import { signOut, signIn } from "next-auth/react";
import { motion } from "framer-motion";
// import { ConnectingAirportsOutlined } from "@mui/icons-material";


export default function UserMenu({ session }) {

  return (

    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}


      className={styles.menu}>

      <h4>Welcome to FV Shoppay !</h4>
      {session ? (
        <div className={styles.flex}>
          <img src={session.user?.imagen?.url ? session.user.imagen.url : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} alt="" className={styles.menu__img} />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session?.user?.nombre}</h3>
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}

              onClick={() => signOut()}>Sign out</motion.span>
          </div>
        </div>
      ) : (
        <div className={styles.flex + " " + "justify-center"}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}

            className={styles.btn_primary + " " + "w-1/2"}>
            <Link href={"/Signin"}>
              Register

            </Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>

            <Link className={styles.btn_outlined + " " + "w-1/2"} href={"/Signin"}>
              Login

            </Link>
          </motion.button>

        </div>
      )}
      <ul>
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >

          <Link href="/profile">Account</Link>
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/profile/orders">My Orders</Link>
        </motion.li>

        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/profile/address">Address</Link>
        </motion.li>

        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href="/profile/wishlist">Wishlist</Link>
        </motion.li>

      </ul>
    </motion.div>
  );
}
