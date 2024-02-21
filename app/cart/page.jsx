import React from "react";

// import { saveCart } from "../requests/user";
import CartPage from "../ui/cart/cartPage";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";
const page = async () => {
  let favs = [];

  let session;

  try {
    session = await getServerSession({
      providers: [
        CredentialsProvider({
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
            try {
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
                    Authorization: `Bearer ${res.data}`,
                  },
                }
              );

              const userData = res2.data;

              if (userData) {
                userData.token = res.data;
                return userData;
              }

              return null;
            } catch (error) {
              console.error("Error during authorization:", error);
              return null;
            }
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
        signIn: "/signin",
      },
      secret: process.env.JWT_SECRET,
    });
  } catch (error) {
    // isUser = false;
    // console.error("Error during getServerSession:");
    // signOut();
    // redirect("/");
  }

  try {
    const userFavs = await axios.get(
      "https://fvecommerce.somee.com/api/Usuarios/Favoritos/Usuario",
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    favs = userFavs.data;
  } catch (error) {
    console.log(error);
  }

  return <CartPage favs={favs} />;
};

export default page;
