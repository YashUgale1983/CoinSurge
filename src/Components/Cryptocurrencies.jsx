import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies=({simplified})=>{
    const location = useLocation();
    const count = simplified? 10 : 100;
    const {data:cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState();
    
    useEffect(() => {
        // When cryptosList has data and is not fetching, set the cryptos state
        if (cryptosList?.data?.coins && !isFetching) {
          setCryptos(cryptosList.data.coins);
        }
      }, [cryptosList, isFetching]);

    useEffect(()=>{
      setSearchTerm("")
    },[location])

    useEffect(()=>{
      const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm?.toLowerCase()));
      setCryptos(filteredData);
    },[cryptosList?.data?.coins, searchTerm])

    if(isFetching) return <Loader />

    return(
      <>
        {!simplified && <div className="text-white py-4 text-center font-semibold md:text-xl lg:text-2xl md:py-8">All Cryptocurrencies</div>}
        {!simplified && <div className="text-center"><input type="text" placeholder="Search crypto" className="rounded-lg lg:w-1/4 text-center md:p-1 text-white placeholder-gray-400 bg-gray-800" onChange={(e)=> setSearchTerm(e.target.value)}/></div>}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-10 mt-5 md:mt-10 lg:mt-16 px-5 md:px-10 text-center">
            {cryptos?.map((currency) => (
              <div key={currency.uuid} className="bg-white text-black font-semibold rounded-2xl">
                <Link to={`/crypto/${currency.uuid}`}>
                  <div className="flex flex-row justify-between p-2 md:p-4 text-sm md:text-base lg:text-xl">
                    <div>{currency.rank}. {currency.name}</div>
                    <div><img src={currency.iconUrl} alt="" className="h-[20px] w-[20px] md:h-[25px] md:w-[25px] lg:h-[35px] lg:w-[35px]"/></div>
                  </div>
                  <div className="text-xs md:text-sm lg:text-base mx-1 mb-3">
                    <div>Price : ${millify(currency.price)}</div>
                    <div>Market Cap : ${millify(currency.marketCap)}</div>
                    <div>Change : {currency.change}%</div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </>
        
    )
}

export default Cryptocurrencies;