"use client";

import React from "react";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProviderBar({ children }) {
  return (
    <>
      <ProgressBar height="3px" color="#6fffef" background="#6fffef" />
      {children}
    </>
  );
}

export default ProviderBar;
