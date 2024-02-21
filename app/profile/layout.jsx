import React from "react";
import LayoutPerfil from "../ui/profile/layout/PageLayout";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

const layout = async ({ children }) => {
  let user;
  let address;
  let session;
  let isUser = true;

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
    user = await axios(
      "https://fvecommerce.somee.com/api/Usuarios/ObtenerUsuario",
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );
  } catch (error) {
    isUser = false;

    // signOut();
    // redirect("/");

    // Handle the error as needed
  }
  // try {
  //   address = await axios(
  //     `https://fvecommerce.somee.com/api/Usuarios/Dirreccion/${user.data.id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${session.user.token}`,
  //       },
  //     }
  //   );
  // } catch (e) {
  //   address = { data: [] };
  //   console.log(address.data);
  // }

  return (
    <>
      <LayoutPerfil
        isUser={isUser}
        user={user?.data}
        address={user?.data.dirreccion}
      >
        {children}
      </LayoutPerfil>
    </>
  );
};

export default layout;
