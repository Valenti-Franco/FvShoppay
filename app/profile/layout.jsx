import React from "react";
import LayoutPerfil from "../ui/profile/layout/PageLayout";

const layout = ({ children }) => {
  return (
    <>
      <LayoutPerfil>{children}</LayoutPerfil>
    </>
  );
};

export default layout;
