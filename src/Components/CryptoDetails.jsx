import React, {useState} from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import LineChart from "./LineChart";
import { Listbox } from '@headlessui/react'
import Loader from "./Loader";

const CryptoDetails=()=>{
    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod});
    const cryptoDetails = data?.data?.coin;
    const [showDropdown, setShowDropdown] = useState('true')

    if(isFetching) return <Loader />

    const time = [
        { id: 1, name: '3h'},
        { id: 2, name: '24h'},
        { id: 3, name: '7d'},
        { id: 4, name: '30d'},
        { id: 5, name: '3m'},
        { id: 6, name: '1y'},
        { id: 7, name: '3y'},
        { id: 8, name: '5y'},
      ]
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: 'BTC Price', value: `$ ${cryptoDetails?.btcPrice && millify(cryptoDetails?.btcPrice)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];
    const genericStats = [
        { title: ' Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: ' Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: ' Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: ' Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: ' Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    const handleTimeSetting=(value)=>{
        setTimePeriod(value);
        setShowDropdown(!showDropdown);
    }
    const handleButtonClick = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility on button click
      };

    return(
        <>
        <div className="text-white flex flex-row items-center justify-center space-x-5 my-3 lg:my-8">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">{cryptoDetails?.name}</div>
            <img src={cryptoDetails?.iconUrl} alt="cryptoIcon" className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]"/>
        </div>
        <div className="flex flex-col items-center justify-center m-5">
            <Listbox value={timePeriod} onChange={setTimePeriod}>
                <div className="flex flex-row">
                    <Listbox.Button className="h-[30px] w-[140px] lg:h-[40px] lg:w-[200px] text-white placeholder-gray-400 bg-gray-800 rounded-l-md focus:outline-none text-base lg:text-xl" onClick={handleButtonClick}>{timePeriod} chart</Listbox.Button>
                    <button className="top-0 right-0 h-[30px] lg:h-[40px] px-2 py-1 text-white bg-gray-800 rounded-r-md focus:outline-none" onClick={handleButtonClick}>{showDropdown?  "▲" : "▼"}</button>
                </div>
                {showDropdown && (
                    <Listbox.Options className="mt-1 max-h-40 overflow-y-auto bg-white rounded-md shadow-lg text-sm lg:text-lg" static>
                    {time.map((time) => (
                    <Listbox.Option
                        key={time.id}
                        value={time.name}
                        onClick={()=> handleTimeSetting(time.name)}
                        className=" h-[30px] w-[170px] lg:h-[40px] lg:w-[230px] px-4 py-2 text-black cursor-pointer select-none hover:bg-gray-200"
                    >
                        {time.name} chart
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
                )}
                
            </Listbox>
        </div>
        <div className="text-center mx-auto">
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
        </div>
        <section className="text-white">
            
            <div className="my-5 flex flex-col md:flex-row items-center justify-center md:space-x-10 lg:justify-evenly">
                {/* coin stats */}
                <div className="grid grid-col-2 md:text-lg lg:text-2xl">
                    <div className="col-span-2 text-center p-3 border-gray-500 border-b-2">{cryptoDetails?.name} Statistics</div>
                    {stats.map(({ icon, title, value }, index)=>{
                        return(
                            <React.Fragment key={index}>
                                <div className="text-gray-400 align-middle p-2 pl-4">{icon}  {title}</div>
                                <div className="text-gray-400 p-2">{value}</div>
                                </React.Fragment>
                        )
                    })}
                </div>
                {/* generic stats */}
                <div className="grid grid-col-2 mt-3 md:text-lg lg:text-2xl">
                    <div className="col-span-2 text-center p-3 border-gray-500 border-b-2">General Statistics</div>
                    {genericStats.map(({ icon, title, value }, index)=>{
                        return(
                            <React.Fragment key={index}>
                                <div className="text-gray-400 align-middle p-2 pl-4">{icon}  {title}</div>
                                <div className="text-gray-400 p-2">{value}</div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </section>
        </>
    )
}

export default CryptoDetails;