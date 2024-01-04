import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { toggleSidebar } from "../../../../../store/ExpandSlice";
//-----------------------
import {
  MdArrowForwardIos,
  MdOutlineCategory,
  MdOutlineZoomIn,
  MdOutlineZoomOut,
  MdSpaceDashboard,
} from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
//-----------------------
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const router = useRouter();
  // const route = router.pathname.split("/admin/dashboard/")[1];
  const route = false
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${expand ? "rotate(180deg)" : ""}`,
            transition: "all .2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user?.imagen.url} alt="" />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>{session?.user?.nombre}</span>
          </div>
        </div>
        <ul className={styles.sidebar__list}>
          <Link href="/admin">
            <li className={route ? styles.active : ""}>
              <MdSpaceDashboard />
              <span className={styles.show}>Dashboard</span>
            </li>
          </Link>
          <Link href="/admin/sales">
            <li className={route == "sales" ? styles.active : ""}>
              <FcSalesPerformance />
              <span className={styles.show}>Sales</span>
            </li>
          </Link>
          <Link href="/admin/orders">
            <li className={route == "orders" ? styles.active : ""}>
              <IoListCircleSharp />
              <span className={styles.show}>Orders</span>
            </li>
          </Link>
          <Link href="/admin/users">
            <li className={route == "users" ? styles.active : ""}>
              <ImUsers />
              <span className={styles.show}>Users</span>
            </li>
          </Link>
          <Link href="/admin/messages">
            <li className={route == "messages" ? styles.active : ""}>
              <AiFillMessage />
              <span className={styles.show}>Messages</span>
            </li>
          </Link>
        </ul>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Product</div>
          </div>
          <ul className={styles.sidebar__list}>
            <Link href="/admin/product/all">
              <li className={route == "product/all" ? styles.active : ""}>
                <FaThList />
                <span className={styles.show}>All Products</span>
              </li>
            </Link>
            <Link href="/admin/product/create">
              <li className={route == "product/create" ? styles.active : ""}>
                <BsPatchPlus />
                <span className={styles.show}>Create Product</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Categories / Subs</div>
          </div>
          <ul className={styles.sidebar__list}>
            <Link href="/admin/categories">
              <li className={route == "categories" ? styles.active : ""}>
                <MdOutlineCategory />
                <span className={styles.show}>Categories</span>
              </li>
            </Link>
            <Link href="/admin/subCategories">
              <li className={route == "subCategories" ? styles.active : ""}>
                <div style={{ transform: "rotate(180deg)" }}>
                  <MdOutlineCategory />
                </div>
                <span className={styles.show}>Sub-Categories</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Sizes / DetailSizes</div>
          </div>
          <ul className={styles.sidebar__list}>
            <Link href="/admin/sizes">
              <li className={route == "categories" ? styles.active : ""}>
                <MdOutlineZoomIn />
                <span className={styles.show}>Sizes</span>
              </li>
            </Link>
            <Link href="/admin/detailSizes">
              <li className={route == "subCategories" ? styles.active : ""}>
                <div style={{ transform: "rotate(180deg)" }}>
                  <MdOutlineZoomOut />
                </div>
                <span className={styles.show}>Detail-Sizes</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Coupons</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "coupons" ? styles.active : ""}>
              <Link href="/admin/coupons">
                <RiCoupon3Fill />
                <span className={styles.show}>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul
            className={`${styles.sidebar__list} ${expand ? styles.nav_flex : ""
              }`}
          >
            <li>
              <Link href="">
                <RiSettingsLine />
              </Link>
            </li>
            <li>
              <Link href="">
                <IoNotificationsSharp />
              </Link>
            </li>
            <li>
              <Link href="">
                <AiFillMessage />
              </Link>
            </li>
            <li>
              <Link href="">
                <RiLogoutCircleFill />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
