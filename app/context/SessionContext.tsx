"use client"

import React from 'react'
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../../store";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode
}

let persistor = persistStore(store);
const SessionContext = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>


        <PersistGate loading={null} persistor={persistor}>

          {children}
        </PersistGate>
      </Provider>


    </SessionProvider>
  )
}

export default SessionContext


