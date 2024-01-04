import React from "react";
import Page from "./page";
import CredentialsProvider from "next-auth/providers/credentials";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";

const layout = async ({ children }) => {
  try {
    const session = await getServerSession({
      providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: "Credentials",

          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            // const res = await fetch("/your/endpoint", {
            //   method: 'POST',
            //   body: JSON.stringify(credentials),
            //   headers: { "Content-Type": "application/json" }
            // })
            // console.log("credentials", credentials)
            const res = await axios.post(
              "https://fvecommerce.somee.com/api/Usuarios/authenticate",
              {
                nombre: credentials.email,
                password: credentials.password,
              }
            );
            const res2 = await axios(
              "https://fvecommerce.somee.com/api/Usuarios/ObtenerUsuario",
              {
                headers: {
                  Authorization: `Bearer ${res.data}`, // Agrega el token JWT en la cabecera de autorización
                },
              }
            );
            console.log(res2);
            const user = res2.data;

            // If no error and we have user data, return it
            if (user) {
              user.token = res.data; // Agrega el token a las propiedades del usuario
              return user;
            }
            // Return null if user data could not be retrieved
            return null;
          },
        }),
      ],
      callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token }) {
          session.user = token;
          return session;
        },
      },
      pages: {
        signIn: "/signin", // Ruta a tu página de inicio de sesión personalizada
      },
      secret: process.env.JWT_SECRET,
    });
    console.log("first");

    const user = await axios(
      "https://fvecommerce.somee.com/api/Usuarios/ObtenerUsuario",
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    // console.log(user.data.role);
    if (user.data.role !== "Admin") {
      redirect("/");
    }
  } catch (error) {
    console.log(error);
    redirect("/");
  }

  return <>{children}</>;
};

export default layout;
