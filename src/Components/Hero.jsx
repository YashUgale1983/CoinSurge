import React from "react";
// import PolygonMaticIcon from "../images/polygon-matic-icon.png";
import millify from "millify";
import HeroIcon from "../images/6280661.jpg";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Hero = ()=>{

    const { data, isFetching} = useGetCryptosQuery('all');
    const globalStats = data?.data?.stats;

    if(isFetching){return <Loader />}

    return(
        <section id="hero">
            {/* Flex container */}
            <div className="container flex flex-col-reverse md:flex-row items-center md:items-start px-5 mx-auto mt-10 md:mt-20 md:space-x-10">
                {/* Left item  */}
                <div className="flex flex-col w-11/12 md:w-1/2 text-white mt-8 md:mt-0">
                    <h1 className="text-3xl max-w-md font-bold text-center md:text-5xl md:text-left lg:mb-8">Global Statistics</h1>
                    <div className="grid grid-cols-3 gap-2 mt-5 md:mt-8 text-xs md:text-xl lg:text-2xl">
                        <div className="col-span-2 lg:mb-8">
                            <p>Total cryptocurrencies</p>
                            <p className="text-gray-500">{millify(globalStats?.total)}</p>
                        </div>
                        <div className="lg:mb-8"> 
                            <p>Total Exchanges</p>
                            <p className=" text-gray-500">{millify(globalStats?.totalExchanges)}</p>
                        </div>
                        <div className="lg:col-span-2 lg:mb-8">
                            <p>Total market cap</p>
                            <p className=" text-gray-500">{millify(globalStats?.totalMarketCap)}</p>
                        </div>
                        <div className="lg:mb-8">
                            <p>Total 24h volume</p>
                            <p className=" text-gray-500">{millify(globalStats?.total24hVolume)}</p>
                        </div>
                        <div className="lg:mb-8">
                            <p>Total markets</p>
                            <p className=" text-gray-500">{millify(globalStats?.totalMarkets)}</p>
                        </div>
                    </div>
                </div>
                {/* right item  */}
                <div className="flex flex-col w-11/12 md:w-1/2 h-11/12 md:h-11/12">
                    <img src={HeroIcon} alt="HeroIcon" className="object-cover lg:h-[400px] lg:w-[400px] lg:mx-auto rounded-full border-8 border-indigo-800"/>
                </div>
            </div>
        </section>
    )
}

export default Hero;