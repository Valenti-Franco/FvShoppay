import SessionContext from "./context/SessionContext";
import "./ui/global.css";
import Header from "./ui/Header/Header";
import store from "../store";
import ProviderBar from "./context/ProviderBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="  w-vw min-h-screen" style={{ contain: "content" }}>
        {/* <h1>Root Layout</h1> */}
        <SessionContext>
          <Header />
          <ProviderBar>{children}</ProviderBar>
        </SessionContext>
      </body>
    </html>
  );
}
