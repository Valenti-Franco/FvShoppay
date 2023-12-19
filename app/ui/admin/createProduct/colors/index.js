import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import { ColorExtractor } from "react-color-extractor";
import { TbArrowUpRightCircle } from "react-icons/tb";
import AdminInput from "../../../inputs/adminInput";
import { Button } from "@/app/ui/button";
import axios from "axios";

export default function Colors({
  token,
  product,
  setProduct,
  name,
  newColor,
  colorImage,
  setNewColor,
  setColorImage,
  GetColor,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [nameColor, setNameColor] = useState("");

  const [field, meta] = useField(props);
  const renderSwatches = () => {
    return colors.map((color, id) => (
      <div
        className={styles.square__color}
        key={id}
        style={{ backgroundColor: color }}
        onClick={() => {
          setNewColor(
            color
          );
        }}
      >
        {color}
      </div>
    ));
  };
  const handleChangeName = (e) => {
    // setNameColor(e.target.event)
    setNameColor(e.target.value)


  }
  const handlerPost = async () => {

    try {

      const NewColorAdd = await axios.post("https://fvecommerce.somee.com/api/Colores/Color",
        {
          color: nameColor,
          style: newColor

        }
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      // console.log(NewColorAdd.data)

      setColors([])
      setNewColor("")
      GetColor()
    } catch (e) {
      console.log(e)
    }

  }
  return (
    // colors.length > 0 && (



    <div className={styles.colors}>
      <h1>Create Colors</h1>
      <div
        className={`${styles.header} ${meta.error[name] ? styles.header__error : ""
          }`}
      >

        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="text"
        value={product.color.color}
        name={name}
        hidden
        {...field}
        {...props}
      />
      <div className={styles.colors__infos}></div>
      <div className={toggle ? styles.toggle : ""}>
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img src={colorImage} style={{ display: "none" }} />
        </ColorExtractor>
        <div className={styles.wheel}>{renderSwatches()}</div>
      </div>
      {colors.length > 0 && (
        <TbArrowUpRightCircle
          className={styles.toggle__btn}
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}

      {newColor !== "" && (
        <div className="flex gap-5   justify-center items-center">
          <div className="flex gap-3">New Color:  <div
            style={{ background: newColor }}
            className=" shadow-md w-6 h-6 rounded-full  border-double border-4 border-sky-500"
          ></div></div>
          <label className="">

            <input
              placeholder="Color Name.."
              className="  placeholder-gray-400  rounded-lg w-52"
              type="text"
              label="Name"
              name="color"
              placholder="Color name"
              onChange={handleChangeName}
            />
          </label>

          <Button onClick={() => handlerPost()} >Create Color</Button>
        </div>

      )}
    </div>
    // )

  );
}
