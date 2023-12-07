// "use client";
// import { getSession, useSession } from "next-auth/react";
// import Layout from "./profile/layout";
// import axios from "axios";
// import User from "../../models/User";
// import Product from "../../models/Product";
// import db from "../../utils/db";
// import { useState } from "react";
// import styles from "./styles.module.scss";
// import { AiOutlineDelete } from "react-icons/ai";
// import { Navigation, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import ProductCard from "../../components/ProductCard";
// import { useDispatch } from "react-redux";
// import { showDialog } from "/store/DialogSlice";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import "react-toastify/dist/ReactToastify.css";

// export default function Wishlist() {
//   //   const dispatch = useDispatch();
//   const [wishlistProducts, setWishlistProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const ordersData = await axios.get(
//           `https://fvecommerce.somee.com/api/Usuarios/Favoritos/Usuario`,
//           {
//             headers: {
//               Authorization: `Bearer ${session?.user.token}`,
//             },
//           }
//         );
//         // Si la solicitud fue exitosa, actualiza las direcciones en el estado
//         setWishlistProducts(ordersData.data);
//         console.log(ordersData.data);
//       } catch (error) {
//         // Manejar errores
//         console.error("Error al cambiar la dirección activa:", error);
//         // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
//         throw error;
//       }
//     };
//     if (status === "authenticated") {
//       fetchData();
//     }
//   }, []);

//   return (
//     <Layout session={user} tab={2}>
//       <div className={styles.whishlist}>
//         <h1 className={styles.header}>Wishlist</h1>
//         {user?.wishlist.length === 0 ? (
//           <p>No products added to wishlist</p>
//         ) : (
//           <div className={styles.products}>
//             {wishlistProducts?.map((product) => (
//               <div className={styles.divWishlist} key={product._id}>
//                 <div className={styles.products}>
//                   <ProductCard product={product}>
//                     <div>
//                       <Swiper
//                         navigation
//                         pagination={{ clickable: true }}
//                         className={styles.swiperContainer}
//                       >
//                         {product.subProducts?.map((subProduct) =>
//                           subProduct.images.map((image, index) => (
//                             <SwiperSlide key={index}>
//                               <img
//                                 src={image.url}
//                                 alt={`Product ${product.slug} image ${index}`}
//                               />
//                             </SwiperSlide>
//                           ))
//                         )}
//                       </Swiper>
//                     </div>
//                   </ProductCard>
//                 </div>
//                 <div style={{ zIndex: "-1" }}>
//                   <button
//                     className={styles.btnWishlist}
//                     onClick={() => handleRemove(user._id, product._id)}
//                   >
//                     <AiOutlineDelete color="black" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// export async function getServerSideProps(ctx) {
//   const { query, req } = ctx;
//   db.connectDb();
//   const session = await getSession({ req });

//   let user = null;
//   if (session?.user?.id) {
//     user = await User.findById(session?.user.id);
//   }

//   if (!user) {
//     db.disconnectDb();
//     return {
//       props: {
//         user: null,
//         tab: query.tab || 0,
//         showLoginPrompt: true,
//         tab: query.tab || 0,
//         showLoginPrompt: {
//           message: "Por favor inicia sesión para acceder al contenido",
//           buttonText: "Iniciar sesión",
//         },
//       },
//     };
//   }

//   // Obtener los productos de la lista de deseos del usuario
//   const wishlistIds = user?.wishlist.map((item) => item.product?.toString());
//   const wishlistProducts = await Product.find({
//     _id: { $in: wishlistIds },
//   }).lean();

//   db.disconnectDb();

//   return {
//     props: {
//       user: JSON.parse(JSON.stringify(user)),
//       wishlist: JSON.parse(JSON.stringify(wishlistProducts)),
//       tab: query.tab || 0,
//     },
//   };
// }
