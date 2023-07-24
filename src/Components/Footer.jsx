import React from "react";
import { Typography } from "antd";
import PolygonMaticIcon from "../images/polygon-matic-icon.png";
 
const Footer=()=> {
  return (
    <footer className="w-full bg-gray-800 p-2 text-white mt-10 lg:mt-16 md:p-3 ">
      <div className="flex justify-center items-center"><img src={PolygonMaticIcon} alt="logo-ct" className="w-6 h-6 md:w-8 md:h-8" /></div>
      <div className="flex justify-center"><hr className="my-2 border-blue-gray-50 w-3/4" /></div>
      <Typography color="white" className="text-center font-normal text-white md:text-lg">
        &copy; Coin Surge 2023
      </Typography>
    </footer>
  );
}

export default Footer;