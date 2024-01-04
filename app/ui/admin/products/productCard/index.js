"use client"
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Modal } from "@mui/material";
import BodyProductEdit from "./ModalEdit"
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

export default function ProductCard({ product }) {
  // console.log(product);

  const { data: session, status } = useSession();

  const [modalEditProduct, setModalEditProduct] = useState(false);
  const [idProducto, setIdProducto] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productEdit, setProductEdit] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
  });

  const handleChangeProductEdit = (e) => {
    const { name, value } = e.target;
    setProductEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const abrirCerrarModalImgProduct = (productId) => {
    setModalEditImgProduct(!modalEditImgProduct);

    const selectedProductDataImg = product.find(
      (product) => product.id === productId
    );

    // console.log(selectedProductData)
    if (selectedProductDataImg) {
      setProductEditImg({
        imagenes: selectedProductDataImg.imagenes,
      });
    }
  };



  const productPut = async () => {
    try {
      const response = await axios.put(
        `https://tpibarbershop20231015224614.azurewebsites.net/api/Productos/${idProducto}/Admin`,
        {
          nombre: productEdit.nombre,
          precio: productEdit.precio,
          stock: productEdit.stock,
          descripcion: productEdit.descripcion,
        },
        config // Agrega el encabezado con el token JWT
      );
      if (response.status === 204) {
        toast.success("Producto editado correctamente", {
          position: "top-right", // Puedes personalizar la posición
          autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible
        });
      }
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      // obtenerProductos(); // Reutiliza la función que ya tienes para obtener productos
      abrirCerrarModalEditProduct(); // Reutiliza el product
    } catch (error) {
      console.error(error);
    }
  };
  const deteleProduct = async () => {
    try {
      const response = await axios.delete(
        `https://fvecommerce.somee.com/api/Productos/${product.id}/Admin`,

        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      toast.success("Producto eliminado correctamente", {
        position: "top-right", // Puedes personalizar la posición
        autoClose: 3000, // El tiempo en milisegundos que el toast permanecerá visible

      })
      // Luego de realizar la solicitud POST, puedes actualizar la lista de productos
      // obtenerProductos(); // Reutiliza la función que ya tienes para obtener productos

    } catch (error) {
      console.error(error);
    }
  }
  const abrirCerrarModalEditProduct = (productId) => {
    setModalEditProduct(!modalEditProduct);
    setSelectedProduct(productId);
    setIdProducto(productId);

    // Si hay un elemento seleccionado, establece modalEditProduct en función de sus valores
    if (productId) {
      // console.log(product);
      const selectedProductData = product


      if (selectedProductData) {
        setProductEdit({
          nombre: selectedProductData.nombre,
          precio: selectedProductData.precio,
          descripcion: selectedProductData.descripcion,
          stock: selectedProductData.stock,
          imagenes: selectedProductData.imagenes,
        });
      }
    }
  };


  const [deleteModal, setDeleleModal] = useState(false)
  return (
    <div className={styles.product}>


      {deleteModal && (

        <div id="deleteModal" tabindex="-1" aria-hidden="true" class=" flex items-center  m-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
          <div class=" m-auto  relative p-4 w-full max-w-md h-full md:h-auto">

            <div class="relative   p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button onClick={() => setDeleleModal(!deleteModal)} type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
              </button>
              <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete {product.nombre}?</p>
              <div class="flex justify-center items-center space-x-4">
                <button onClick={() => setDeleleModal(!deleteModal)} data-modal-toggle="deleteModal" type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  No, cancel
                </button>
                <button onClick={() => deteleProduct()} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Yes, I´m sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 h1 className={styles.product__name} > {product.nombre}</h1 >
      <h2 className={styles.product__category}>#{product.categoryId}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        style={{ padding: "5px 0 5px 5px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.imagenes.map(image => (
          <SwiperSlide key={image.id}>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={image?.url} alt="" />

              </div>

              <div className={styles.product__actions}>

                <TbEdit onClick={() => abrirCerrarModalEditProduct(product.id)} />

                <Link href={`/product/${product.id}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>
      <Modal open={modalEditProduct} OnClose={abrirCerrarModalEditProduct}>
        <BodyProductEdit
          handleChangeProduct={handleChangeProductEdit}
          abrirCerrarModalProduct={abrirCerrarModalEditProduct}
          abrirCerrarModalImgProduct={abrirCerrarModalImgProduct}
          productPost={productPut}
          productEdit={productEdit}
          idProducto={idProducto}
          abrirCerrarModalEditProduct={abrirCerrarModalEditProduct}
        />
      </Modal>
      <div onClick={() => setDeleleModal(!deleteModal)} data-modal-target="deleteModal" data-modal-toggle="deleteModal" className="flex gap-2 text-xl items-center">Eliminar  <MdDelete /></div>
    </div >
  );
}