import React,{useState} from "react";
import { Link } from "react-router-dom";
import PolygonMaticIcon from "../images/polygon-matic-icon.png";
import {TfiMenuAlt, TfiClose} from 'react-icons/tfi'

const Navbar = () => {
    const [navSlide, setNavSlide] = useState(false);

    const handleNav = ()=>{
        setNavSlide(!navSlide);
    }

  return (
    <div className="flex items-center justify-evenly mt-4 mx-6 p-3 text-white">
      <img src={PolygonMaticIcon} alt="Coin Surge logo" className="h-8 mr-5 sm:h-12 md:h-14"/>  
      <h1 className="w-full text-[#854ebc] text-2xl sm:text-3xl md:text-3xl lg:text-4xl">Coin Surge</h1>
      <ul className="hidden md:flex space-x-8 text-lg md:text-xl lg:text-2xl">
        <li className="hover:text-[#E5B8F4]"> <Link to="/">Home</Link></li>
        <li className="hover:text-[#E5B8F4]"><Link to="/cryptocurrencies">Cryptocurrencies</Link></li>
        <li className="hover:text-[#E5B8F4]"><Link to="/exchanges">Exchanges</Link></li>
        <li className="hover:text-[#E5B8F4]"><Link to="/news">News</Link></li>
      </ul>
      <div className="md:hidden" onClick={handleNav}>
        {!navSlide? <TfiMenuAlt size={21} /> : <TfiClose size={21} />}
      </div>
      <div className={!navSlide? 'fixed left-[-100%]' : 'fixed left-0 top-0 w-[60%] h-full border-r border-r-white bg-gray-950 ease-in-out duration-500 z-10'}>
        <ul className="pt-24 px-5 text-base uppercase">
            <li className="hover:text-[#E5B8F4] border-b border-gray-600 py-5"><Link to="/" onClick={handleNav} >Home</Link></li>
            <li className="hover:text-[#E5B8F4] border-b border-gray-600 py-5"><Link to="/cryptocurrencies" onClick={handleNav}>Cryptocurrencies</Link></li>
            <li className="hover:text-[#E5B8F4] border-b border-gray-600 py-5"><Link to="/exchanges" onClick={handleNav}>Exchanges</Link></li>
            <li className="hover:text-[#E5B8F4] py-5"><Link to="/news" onClick={handleNav}>News</Link></li>
        </ul>
      </div>
    </div>

  );
};

export default Navbar;
