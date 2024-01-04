"use client"

import styles from "./styles.module.scss";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "../../inputs/shippingInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "../../../data/countries";
import SingularSelect from "../../selects/SingularSelect";


// import {
//   changeActiveAddress,
//   deleteAddress,
//   saveAddress,
// } from "../../../requests/user";
import { FaIdCard } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import axios from "axios";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

export default function Shipping({ user, token, addresses, setAddresses, profile }) {

  const { data: session, status } = useSession();
  // console.log(token)
  // console.log(session)
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address?.length ? false : true);
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      // .phone()
      .min(3, "Phone number must be atleast 3 characters long.")
      .max(30, "Phone number must be less than 20 characters long."),
    state: Yup.string()
      .required("State name is required.")
      .min(2, "State name should contain 2-60 characters..")
      .max(60, "State name should contain 2-60 characters."),
    city: Yup.string()
      .required("City name is required.")
      .min(2, "City name should contain 2-60 characters.")
      .max(60, "City name should contain 2-60 characters."),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(5, "Address Line 1 should contain 5-100 characters.")
      .max(100, "Address Line 1 should contain 5-100 characters."),
    address2: Yup.string()
      .min(5, "Address Line 2 should contain 5-100 characters.")
      .max(100, "Address Line 2 should contain 5-100 characters."),
    country: Yup.string().required("Country name is required."),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveAddress = async () => {

    try {
      const res = await axios.post(
        `https://fvecommerce.somee.com/api/Usuarios/Dirreccion`,
        {
          pais: shipping.country,
          nombre: shipping.firstName,
          apellido: shipping.lastName,
          provincia: shipping.state,
          zipCode: shipping.zipCode,
          ciudad: shipping.city,
          numero: shipping.phoneNumber,
          addrres1: shipping.address1,
          addrres2: shipping.address2
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      try {
        const addressNew = await axios.get(
          `https://fvecommerce.somee.com/api/Usuarios/Dirreccion/Usuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado

        setAddresses(addressNew.data);

      } catch (error) {
        // Manejar errores
        console.error("Error al cambiar la dirección activa:", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
        throw error;
      }
    } catch (error) {
      // Manejar errores
      console.error("Error al cambiar la dirección activa:", error);
      // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
      throw error;
    }
  }
  const deleteAddress = async (id) => {

    try {
      const res = await axios.delete(
        `https://fvecommerce.somee.com/api/Usuarios/Dirreccion/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      try {
        const addressNew = await axios.get(
          `https://fvecommerce.somee.com/api/Usuarios/Dirreccion/Usuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado

        setAddresses(addressNew.data);

      } catch (error) {
        // Manejar errores
        console.error("Error al cambiar la dirección activa:", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
        throw error;
      }
    } catch (error) {
      // Manejar errores
      console.error("Error al cambiar la dirección activa:", error);
      // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
      throw error;
    }
  }

  const changeActiveAddress = async (id) => {

    try {
      const res = await axios.put(
        `https://fvecommerce.somee.com/api/Usuarios/Dirreccion/${id}`, {

      },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      try {
        const addressNew = await axios.get(
          `https://fvecommerce.somee.com/api/Usuarios/Dirreccion/Usuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Si la solicitud fue exitosa, actualiza las direcciones en el estado

        setAddresses(addressNew.data);

      } catch (error) {
        // Manejar errores
        console.error("Error al cambiar la dirección activa:", error);
        // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
        throw error;
      }
    } catch (error) {
      // Manejar errores
      console.error("Error al cambiar la dirección activa:", error);
      // Puedes lanzar el error nuevamente si es necesario manejarlo en la parte que llama a esta función
      throw error;
    }
  }
  const changeActiveHandler = async (id) => {
    try {
      // Supongo que tienes el token disponible aquí


      // Llama a la función para cambiar la dirección activa
      await changeActiveAddress(id);
    } catch (error) {
      // Manejar errores
      console.error("Error en el manejador de cambio activo:", error);
    }
  };
  const saveShippingHandler = async (id) => {

    try {

      await saveAddress(id);
    } catch (error) {
      // Manejar errores
      console.error("Error en el manejador de crear direccion:", error);
    }




  };
  const deleteHandler = async (id) => {

    try {

      await deleteAddress(id);
    } catch (error) {
      // Manejar errores
      console.error("Error en el manejador de eliminar direccion:", error);
    }




  };
  // console.log(addresses)
  return (
    <div className={styles.shipping}>
      {!profile && (
        <div className={styles.header}>
          <h3>Shipping Informations</h3>
        </div>
      )}
      <div className={styles.addresses}>
        {addresses?.map((address) => (
          <div key={address.id} style={{ position: "relative" }}>
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address.id)}
            >
              <IoIosRemoveCircleOutline />
            </div>
            <div
              className={`${styles.address} ${address.acitvo && styles.active}`}
              key={address.id}
              onClick={() => changeActiveHandler(address.id)}
            >
              <div className={styles.address__side}>
                <img src={user?.imagen?.url ? user?.imagen.url : "https://res.cloudinary.com/deh35rofi/image/upload/v1698237266/blank-profile-picture-973460_1280_rvjszn.jpg"} alt="" />
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address.nombre.toUpperCase()}{" "}
                  {address.apellido.toUpperCase()}
                </span>
                <span>
                  <GiPhone />
                  {address.numero}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaMapMarkerAlt />
                  {address.address1}
                </span>
                <span>{address.address2}</span>
                <span>
                  {address.ciudad},{address.provincia},{address.pais}
                </span>
                <span>{address.zipCode}</span>
              </div>
              <span
                className={styles.active__text}
                style={{
                  display: `${!address.acitvo && "none"}`,
                }}
              >
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            zipCode,
            address1,
            address2,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              <SingularSelect
                name="country"
                value={country}
                placeholder="*Country"
                handleChange={handleChange}
                data={countries}
              />
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="*First Name"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="lastName"
                  placeholder="*Last Name"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="*State/Province"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="city"
                  placeholder="*City"
                  onChange={handleChange}
                />
              </div>
              <ShippingInput
                name="phoneNumber"
                placeholder="*Phone number"
                onChange={handleChange}
              />
              <ShippingInput
                name="zipCode"
                placeholder="*Post/Zip code"
                onChange={handleChange}
              />
              <ShippingInput
                name="address1"
                placeholder="Address 1"
                onChange={handleChange}
              />
              <ShippingInput
                name="address2"
                placeholder="Address 2"
                onChange={handleChange}
              />
              <button type="submit">Save Address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
