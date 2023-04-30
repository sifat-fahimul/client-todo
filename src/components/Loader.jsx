import React from "react";
import { Bars, ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <Bars
      height="30"
      width="30"
      color="#fff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
