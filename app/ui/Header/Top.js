import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeartFill } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);




  // console.log(session)
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}

            className={styles.li}

          >
            <img src={country?.flag} alt="" />
            <span>{country?.name} / USD</span>
          </motion.li>
          {/* <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li> */}
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}

            className={styles.li}>
            <BsSuitHeartFill style={{ fill: 'red' }} />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </motion.li>
          <ul className={styles.li} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>

            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img src={session.user?.imagen?.url ? session.user.imagen.url : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} alt="" />
                  <span>{session?.user?.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (

              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )
            }
            <AnimatePresence>

              {visible && <UserMenu session={session} />}
            </AnimatePresence>

          </ul>
        </ul>
      </div>
    </div>
  );
}
