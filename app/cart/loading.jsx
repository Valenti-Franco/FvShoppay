import React from "react";
import Loading from "../ui/loaders/dotLoader";
import CircularProgress from "@mui/material/CircularProgress";
const loading = () => {
  return (
    <div className=" left-0 top-0 w-full  h-full absolute flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default loading;
