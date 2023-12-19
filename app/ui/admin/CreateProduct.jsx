"use client";
import styles from "../../../styles/products.module.scss";
// import styles from "../../../styles";

import Layout from "../../ui/admin/layout";
import { Button } from "@/app/ui/button";
import Button1 from "@mui/material/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
// import SingularSelect from "../../ui/selects";
import SingularSelect from "../selects/SingularSelect2";

// import SingularSelect from "../../../../components/selects/SingularSelect";
// import MultipleSelect from "../../ui/selects/MultipleSelect";
import AdminInput from "../../ui/inputs/adminInput";
import DialogModal from "../../ui/dialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../store/DialogSlice";
// import { showDialog } from "../../../store";

import Images from "../../ui/admin/createProduct/images";
import Colors from "../../ui/admin/createProduct/colors";
import Style from "../../ui/admin/createProduct/style";
import Sizes from "../../ui/admin/createProduct/clickToAdd/Sizes";
import Details from "../../ui/admin/createProduct/clickToAdd/Details";
import Questions from "../../ui/admin/createProduct/clickToAdd/Questions";
import { validateCreateProduct } from "../../../utils/validation";
import dataURItoBlob from "../../../utils/dataURItoBlob";
import { useSession } from "next-auth/react";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
// import { uploadImages } from "../../../requests/upload";
// import { uploadImages } from "../../";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  price: 0,

  discount: 0,
  images: [],
  description_images: [],

  category: "",
  subCategories: "",
  description: "",

  color: [],
  sizes: [],
  detailsizes: [],

  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};

export default function Create() {
  const { data: session, status } = useSession();
  const [product, setProduct] = useState(initialState);
  const [newColor, setNewColor] = useState("");
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [brand, setBrand] = useState([]);
  const [nameSize, setNameSize] = useState("");
  const [nameSubCategory, setNameSubCategory] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [descCategory, setDescCategory] = useState("");
  const [nameBrand, setNameBrand] = useState("");
  const [nameDetailSize, setNameDetailSize] = useState("");

  // ----------------------------------------------------------------
  //MODAL DELETE COLORS
  const [openColors, setOpenColors] = useState(false);
  const handleOpenColors = (color) => setOpenColors([true, color]);
  const handleCloseColors = () => setOpenColors([false, ""]);

  // ----------------------------------------------------------------
  const GetColor = async () => {
    const Color = await axios("https://fvecommerce.somee.com/api/Colores");
    setColor(Color.data);
  };

  const GetCategory = async () => {
    const Category = await axios("https://fvecommerce.somee.com/api/Category");
    setCategory(Category.data);
  };
  const GetSize = async () => {
    const Size = await axios("https://fvecommerce.somee.com/api/Tamanos");
    setSize(Size.data);
  };
  const GetBrand = async () => {
    const Brand = await axios("https://fvecommerce.somee.com/api/Marcas");
    setBrand(Brand.data);
  };

  useEffect(() => {
    GetColor();
    GetCategory();
    GetSize();
    GetBrand();
  }, []);

  const handleChangeNameSubcategory = (e) => {
    setNameSubCategory(e.target.value);

    setSizeFilters(
      size?.filter((size) => product.subCategories.includes(size.subcategoryId))
    );
  };
  const handleChangeNameSize = (e) => {
    setNameSize(e.target.value);
  };
  const handleChangeNameDetailSize = (e) => {
    setNameDetailSize(e.target.value);
  };

  const handlerPostBrand = async () => {
    try {
      const NewSize = await axios.post(
        "https://fvecommerce.somee.com/api/Marcas/Marca",

        {
          marca: nameBrand,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      GetBrand();
      setNameBrand("");
    } catch (e) {
      console.log(e);
    }
  };
  const handlerPostCategory = async () => {
    try {
      const NewSize = await axios.post(
        "https://fvecommerce.somee.com/api/Category/Admin",

        {
          nombre: nameCategory,
          descripcion: descCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  const handlerPostSubCategory = async () => {
    try {
      const NewSize = await axios.post(
        "https://fvecommerce.somee.com/api/SubCategory/Admin",

        {
          nombre: nameSubCategory,
          categoryId: product.category,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      GetCategory();
      setNameSubCategory("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDetailSizePost = async () => {
    try {
      const NewSize = await axios.post(
        "https://fvecommerce.somee.com/api/DetalleTamanos/DetalleTamano",
        {
          tamanio: nameDetailSize,
          tamanoId: product.sizes,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      GetSize();
      setNameDetailSize("");
    } catch (e) {
      console.log(e);
    }
  };
  const handleSizePost = async () => {
    try {
      const NewSize = await axios.post(
        "https://fvecommerce.somee.com/api/Tamanos/Tamano",
        {
          tipo: nameSize,
          subcategoryId: product.subCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      GetSize();
      setNameSize("");
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    // console.log("first");
    const { name, checked, value } = e.target;

    if (name.startsWith("color_")) {
      const colorId = name.replace("color_", "");
      handleColorChange(colorId, checked);
      // console.log(product);
    }

    if (name.startsWith("detailsize")) {
      const detailsizeId = name.replace("detailsize_", "");
      handleDetailSizeChange(detailsizeId, checked);
      // console.log(product);
    } else {
      // console.log(product.sizes);
      // For other fields, directly update the state
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleDeleteColor = async () => {
    // console.log(, openColors);
    try {
      const NewSize = await axios.delete(
        `https://fvecommerce.somee.com/api/Colores/${openColors[1].id}`,

        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      handleCloseColors();
      setOpenColors([false, ""]);
      GetColor();
    } catch (e) {
      console.log(e);
    }
  };
  const handleColorChange = (colorId, checked) => {
    setProduct((prevProduct) => {
      if (checked) {
        // If checked, add color to the array
        return { ...prevProduct, color: [...prevProduct.color, colorId] };
      } else {
        // If unchecked, remove color from the array
        return {
          ...prevProduct,
          color: prevProduct.color.filter((id) => id !== colorId),
        };
      }
    });
  };

  const handleSizeChange = (sizeId, checked) => {
    setProduct((prevProduct) => {
      if (checked) {
        // If checked, add color to the array
        return { ...prevProduct, sizes: [...prevProduct.sizes, sizeId] };
      } else {
        // If unchecked, remove color from the array
        return {
          ...prevProduct,
          sizes: prevProduct.sizes.filter((id) => id !== sizeId),
        };
      }
    });
  };
  const handleDetailSizeChange = (detailsizeId, checked) => {
    setProduct((prevProduct) => {
      if (checked) {
        // If checked, add color to the array
        return {
          ...prevProduct,
          detailsizes: [...prevProduct.detailsizes, detailsizeId],
        };
      } else {
        // If unchecked, remove color from the array
        return {
          ...prevProduct,
          detailsizes: prevProduct.detailsizes.filter(
            (id) => id !== detailsizeId
          ),
        };
      }
    });
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must bewteen 10 and 300 characters.")
      .max(300, "Product name must bewteen 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    /*
    subCategories: Yup.array().min(
      1,
      "Please select atleast one sub Category."
    ),
   */
    sku: Yup.string().required("Please add a sku/number"),
    color: Yup.array().optional(1, "Please select atleast one Color."),
    description: Yup.string().required("Please add a description"),
  });
  // console.log("size ..........>", size);
  const createProduct = async () => {
    try {
      const NewProduct = await axios.post(
        "https://fvecommerce.somee.com/api/Productos",
        {
          nombre: product.name,
          stock: product.sku,
          precio: product.price,
          categoryId: product.category,
          subcategoryId: product.subCategories,
          marcaId: product.brand,
          descripcion: product.description,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      const productImgPost = async (idProducto) => {
        try {
          for (const archivo of images) {
            let base64;
            var reader = new FileReader();
            const blob = new Blob([archivo]);
            reader.readAsDataURL(blob);

            await new Promise((resolve) => {
              reader.onload = () => {
                base64 = reader.result.split(",")[1];
                resolve(base64);
              };
            });

            try {
              const response = await axios.post(
                "https://fvecommerce.somee.com/api/Imagenes/Producto/Admin",
                {
                  productoId: idProducto,
                  base64: base64,
                },
                {
                  headers: {
                    Authorization: `Bearer ${session?.user.token}`,
                  },
                }
              );

              if (response.status === 200) {
                console.log("Imagen añadida correctamente");
              }
            } catch (error) {
              console.error("Error al subir la imagen", error);
              toast.error(
                "El tamaño del archivo Base64 excede el límite de 1 MB.",
                {
                  position: "top-right",
                  autoClose: 3000,
                }
              );
            }
          }

          // Después de completar el bucle, puedes realizar acciones adicionales si es necesario.
          // toast.success("Todas las imágenes fueron subidas correctamente", {
          //   position: "top-right",
          //   autoClose: 3000,
          // });

          // Puedes actualizar la lista de productos u realizar otras acciones aquí
          // obtenerProductos(); // Asegúrate de que esta función sea válida y funcional
        } catch (error) {
          console.error("Error general", error);
          // toast.error("ERROR", {
          //   position: "top-right",
          //   autoClose: 3000,
          // });
        }
      };

      productImgPost(NewProduct.data.id);

      await Promise.all(
        product.color.map(async (colorId) => {
          try {
            const colorResponse = await axios.post(
              `https://fvecommerce.somee.com/api/Productos/Color/${NewProduct.data.id}/${colorId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${session?.user.token}`,
                },
              }
            );

            if (colorResponse.status === 200) {
              console.log(`Color ${colorId} añadido correctamente`);
            }
          } catch (colorError) {
            console.error(`Error al subir el color ${colorId}`, colorError);
          }
        })
      );
      await Promise.all(
        product.detailsizes.map(async (detailSize) => {
          try {
            const sizeResponse = await axios.post(
              `https://fvecommerce.somee.com/api/Productos/Tamaño/${NewProduct.data.id}/${detailSize}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${session?.user.token}`,
                },
              }
            );

            if (sizeResponse.status === 200) {
              console.log(
                `Detalle de tamaño ${detailSize} añadido correctamente`
              );
            }
          } catch (sizeError) {
            console.error(
              `Error al subir el detalle de tamaño ${detailSize}`,
              sizeError
            );
          }
        })
      );
    } catch (error) {
      // Manejar errore

      console.error("Error al logear Admin", error);
    }
  };
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 99999,
    border: "#A00 10px solid ",
  };

  let uploaded_images = [];
  let style_img = "";

  return (
    <Layout>
      <div className={styles.header}>Create Product</div>
      <DialogModal />
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          sku: product.sku,

          color: product.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />

            <div className="flex flex-col w-full ">
              <div className={styles.header}>Colors</div>
              <div>
                <Modal
                  open={openColors[0]}
                  onClose={handleCloseColors}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="flex flex-row">
                      <div className=" w-1/2 flex flex-col justify-center items-center gap-5 ">
                        Delete {openColors[1]?.color} ?
                        <Tooltip title={color.color}>
                          <div
                            style={{ background: openColors[1]?.style }}
                            className=" shadow-md w-16 h-16 rounded-full  border-double border-4 border-sky-500"
                          ></div>
                        </Tooltip>
                      </div>
                      <div className="flex gap-5 items-center">
                        <Button1
                          onClick={handleDeleteColor}
                          variant="contained"
                          color="error"
                        >
                          YES <MdDelete />
                        </Button1>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Button1
                          onClick={handleCloseColors}
                          variant="contained"
                          color="success"
                        >
                          NO
                        </Button1>
                      </div>
                    </div>
                  </Box>
                </Modal>
                <div className=" flex flex-wrap  gap-9 flex-row">
                  {color?.map((color) => (
                    <>
                      <label
                        className={`flex flex-row gap-5 p-3 ${
                          product.color.includes(color.id.toString())
                            ? "bg-slate-200  border-double border-4 border-sky-500 "
                            : ""
                        }`}
                        key={color.id}
                        htmlFor={`color_${color.id}`}
                      >
                        <Tooltip title={"Delete" + " " + color.color}>
                          <IconButton>
                            <MdDelete onClick={() => handleOpenColors(color)} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={color.color}>
                          <div
                            style={{ background: color.style }}
                            className=" shadow-md w-16 h-16 rounded-full  border-double border-4 border-sky-500"
                          ></div>
                        </Tooltip>
                      </label>

                      <input
                        onChange={handleChange}
                        id={`color_${color.id}`}
                        name={`color_${color.id}`}
                        value={color.color}
                        type="checkbox"
                        className=" hidden"
                      />
                    </>
                  ))}
                </div>
              </div>
              <Colors
                // getColors={getColors}
                GetColor={GetColor}
                token={session?.user.token}
                newColor={newColor}
                setNewColor={setNewColor}
                name="color2"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
                setColorImage={setColorImage}
              />
            </div>

            <SingularSelect
              name="brand"
              value={product.brand}
              placeholder="Brand"
              data={[brand, "brand"]}
              header="Select a Brand"
              handleChange={handleChange}
              // disabled={product.color}
            />
            <div className="flex gap-5   justify-center items-center">
              <label className="flex gap-3 items-center">
                New Brand:
                <input
                  placeholder="Brand Name.."
                  className="  placeholder-gray-400  rounded-lg w-52"
                  type="text"
                  label="Name"
                  value={nameBrand}
                  placholder="Brand name"
                  onChange={(e) => setNameBrand(e.target.value)}
                />
              </label>

              <Button onClick={() => handlerPostBrand()}>Create Brand</Button>
            </div>

            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Category"
              data={[category, "category"]}
              header="Select a Category"
              handleChange={handleChange}
              // disabled={product.color}
            />
            <div className="flex gap-5   justify-center items-center">
              <label className="flex gap-3 items-center">
                New Categories:
                <input
                  placeholder="Categories Name.."
                  className="  placeholder-gray-400  rounded-lg w-52"
                  type="text"
                  label="Name"
                  placholder="Categories name"
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                />
              </label>
              <input
                placeholder="Categories Description.."
                className="  placeholder-gray-400  rounded-lg w-52"
                type="text"
                label="Name"
                value={descCategory}
                placholder="Categories description"
                onChange={(e) => setDescCategory(e.target.value)}
              />

              <Button onClick={() => handlerPostCategory()}>
                Create Categories
              </Button>
            </div>
            {product.category && (
              <>
                <SingularSelect
                  value={product.subCategories}
                  data={[
                    category.find(
                      (cat) => cat.id === parseInt(product.category, 10)
                    )?.subCategory || [],
                    "category",
                  ]}
                  header="Select SubCategories"
                  name="subCategories"
                  disabled={product.parent}
                  handleChange={handleChange}
                />
                <div className="flex gap-5   justify-center items-center">
                  <label className="flex gap-3 items-center">
                    New SubCategories:
                    <input
                      placeholder="SubCategories Name.."
                      className="  placeholder-gray-400  rounded-lg w-52"
                      type="text"
                      label="Name"
                      value={nameSubCategory}
                      placholder="SubCategories name"
                      onChange={(e) => setNameSubCategory(e.target.value)}
                    />
                  </label>

                  <Button onClick={() => handlerPostSubCategory()}>
                    {/* <Button onClick={() => console.log(product.sizes)}> */}
                    Create SubCategories
                  </Button>
                </div>
              </>
            )}
            {product.subCategories.length !== 0 && (
              <div className="flex flex-col w-full ">
                <div className={styles.header}>Sizes</div>

                <SingularSelect
                  // key={size}
                  value={product.sizes}
                  data={[
                    [
                      size.find(
                        (cat) =>
                          cat.subcategoryId ===
                          parseInt(product.subCategories, 10)
                      ) || [],
                    ],
                    "size",
                  ]}
                  header="Select Sizes"
                  name="sizes"
                  disabled={product.parent}
                  handleChange={handleChange}
                />

                <div className="flex gap-5   justify-center items-center">
                  <label className="flex gap-3 items-center">
                    New Size:
                    <input
                      placeholder="Size Name.."
                      className="  placeholder-gray-400  rounded-lg w-52"
                      type="text"
                      label="Name"
                      // name="color"
                      placholder="Size name"
                      value={nameSize}
                      onChange={handleChangeNameSize}
                    />
                  </label>

                  <Button onClick={() => handleSizePost()}>Create Size</Button>
                </div>
              </div>
            )}

            {product.sizes.length !== 0 && (
              <div className="flex flex-col w-full ">
                <div className={styles.header}>Detail Sizes</div>
                <div>
                  <div className="flex gap-9 flex-row">
                    {size?.map((size) => {
                      if (size.subcategoryId === product.subCategories) {
                        return size.detalleTamanos?.map((detailsize) => (
                          <>
                            <label
                              className={`flex flex-row gap-5 p-3 ${
                                product.detailsizes.includes(
                                  detailsize.id.toString()
                                )
                                  ? "bg-slate-200  border-double border-4 border-sky-500 "
                                  : ""
                              }`}
                              key={detailsize.id}
                              htmlFor={`detailsize_${detailsize.id}`}
                            >
                              {detailsize.tamanio}
                            </label>

                            <input
                              onChange={handleChange}
                              id={`detailsize_${detailsize.id}`}
                              name={`detailsize_${detailsize.id}`}
                              value={detailsize.tamanio}
                              type="checkbox"
                              className="hidden"
                            />
                          </>
                        ));
                      }
                      return null;
                    })}
                  </div>
                </div>
                <div className="flex gap-5   justify-center items-center">
                  <label className="flex gap-3 items-center">
                    New Detail Size:
                    <input
                      placeholder="Detail Size Name.."
                      className="  placeholder-gray-400  rounded-lg w-52"
                      type="text"
                      label="Name"
                      // name="color"
                      value={nameDetailSize}
                      placholder="Detail Size name"
                      onChange={handleChangeNameDetailSize}
                    />
                  </label>

                  <Button onClick={() => handleDetailSizePost()}>
                    {/* <Button onClick={() => console.log(product.sizes)}> */}
                    Create Detail Size
                  </Button>
                </div>
              </div>
            )}

            <div className={styles.header}>Basic Infos</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placholder="Product name"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Description"
              name="description"
              placholder="Product description"
              onChange={handleChange}
            />

            <AdminInput
              type="text"
              label="Sku"
              name="sku"
              placholder="Product sku/ number"
              onChange={handleChange}
            />

            <AdminInput
              type="text"
              label="Price"
              name="price"
              placholder="Product price/ number"
              onChange={handleChange}
            />

            {/* <Sizes
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            /> */}
            {/* <Details
              details={product.details}
              product={product}
              setProduct={setProduct}
            />
            <Questions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            /> */}
            {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
           
       
          
            */}
            <button
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
              type="submit"
            >
              Create Product
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
