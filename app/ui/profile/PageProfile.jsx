"use client";
import { getSession, useSession } from "next-auth/react";
import Layout from "./layout/PageLayout";
import Shipping from "../checkout/shipping";
import styles from "../../../styles/profile.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PageProfile() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className={styles.header}>
        <h1>PROFILE</h1>
      </div>
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            height: "300px",
            width: "300px",
            margin: "10px",
            borderRadius: "50%",
            border: "5px solid #ccc",
          }}
        >
          <img
            src={session.user.imagen.url}
            alt="Profile Image"
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              Name:
            </span>
            <span style={{ fontSize: "18px" }}>{session.user.nombre}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              Email:
            </span>
            <span style={{ fontSize: "18px" }}>{session.user.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}
