"use client";
import { getSession, useSession } from "next-auth/react";
import Layout from "./layout/PageLayout";
import Shipping from "../checkout/shipping";
import styles from "../../../styles/profile.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PageAddress() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressNew = await axios.get(
          `https://fvshoppay.somee.com/api/Usuarios/Dirreccion/Usuario`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
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
    };

    // Llamar a la función asíncrona

    fetchData();
  }, [session]);
  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState();

  const router = useRouter();

  if (!session) {
    // Redirect to sign-in page if not authenticated
    router.replace("/Signin");
    return null;
  }

  return (
    <>
      <div className={styles.header}>
        <h1>MY ADDRESSES</h1>
      </div>
      <Shipping
        user={session?.user}
        addresses={addresses}
        setAddresses={setAddresses}
        profile
        token={session?.user.token}
      />
    </>
  );
}
