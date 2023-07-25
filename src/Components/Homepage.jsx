import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import Cryptocurrencies from './Cryptocurrencies'
import News from "./News";

const Homepage=()=>{
    return (
        <>
        <Hero />
        <div className="text-white mt-8 md:mt-16 lg:mt-20">
            <h1 className="text-xl font-bold md:text-2xl lg:text-3xl text-center">Top 10 cryptocurrencies</h1>
            <Cryptocurrencies simplified/>
            <div className="text-center m-4 text-xs md:m-8 md:text-sm lg:text-lg lg:m-12 hover:text-[#E5B8F4] flex flex-row justify-center space-x-2">
                <Link to="/cryptocurrencies">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </Link>    
            </div>
        </div>
        <div className="text-white mt-8 md:mt-16 lg:mt-20">
            <h1 className="text-xl font-bold md:text-2xl lg:text-3xl text-center">Latest Crypto News</h1>
            <News simplified/>
            <div className="text-center m-4 text-xs md:m-8 md:text-sm lg:text-lg lg:m-12 hover:text-[#E5B8F4] flex flex-row justify-center space-x-2">
                <Link to="/news">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </Link>    
            </div>
        </div>
        </>
    )
}

export default Homepage;