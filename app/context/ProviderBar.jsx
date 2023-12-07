"use client";

import React, { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProviderBar({ children }) {
  // const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <ProgressBar height="3px" color="#6fffef" background="#6fffef" />
      {children}
      {/* </QueryClientProvider> */}
    </>
  );
}

export default ProviderBar;
