
"use client"
import SessionContext from './context/SessionContext';
import './ui/global.css'
import Header from './ui/Header/Header'
import store from "../store";
import ProviderBar from "./context/ProviderBar"
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionContext>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

          <Header/>

          <ProviderBar>
          {children}
          </ProviderBar>
        </PersistGate>
       
        </Provider>
        </SessionContext>
      </body>
    </html>
  );
}
