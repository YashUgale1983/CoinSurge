import React, {useState} from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import PolygonMaticIcon from "../images/polygon-matic-icon.png";
import moment from "moment";
import { Combobox } from "@headlessui/react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";


const News=({simplified})=>{
    const count = simplified? 8: 100;
    const { data: cryptoList} = useGetCryptosQuery(100);
    const [newsCategory, setNewsCategory] = useState('Crypto');
    const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count});
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);


    const filteredCryptoList = simplified? cryptoList : cryptoList?.data?.coins.filter((crypto) =>
        crypto.name.toLowerCase().includes(query.toLowerCase())
    );
    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value === "") {
            setNewsCategory(null); // Reset selectedPerson when the input is empty
            setShowDropdown(false);
        } else {
            setNewsCategory(null); // Reset selectedPerson when the user types in the input field
            setShowDropdown(true); // Show dropdown when the user starts typing
        }
    };
    const handleButtonClick = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility on button click
      };
    const handleOptionSelect = (value) => {
        setNewsCategory(value); // Set selectedPerson to the clicked option
        setShowDropdown(false); // Close the dropdown when an option is clicked
        setQuery(value); // Update the query with the selected option to display it in the input field
      };
    const filteredCryptoNews = cryptoNews?.value.filter((news) => {
        // Filter news based on the selected crypto (newsCategory) in the name or description
        if(!newsCategory){
            return cryptoNews;
        }
        return (
            news.name.toLowerCase().includes(newsCategory.toLowerCase()) ||
            news.description.toLowerCase().includes(newsCategory.toLowerCase())
        );
      });      

    if(!cryptoNews?.value) return <Loader />

    console.log("total crypto news ", cryptoNews);
    console.log("filtered crypto news ", filteredCryptoNews);

    return(
        <>
            {!simplified && <div className="text-white py-4 text-center font-semibold md:text-xl lg:text-2xl md:py-8">Crypto News</div>}
            {!simplified && (
                <div className="flex flex-col items-center justify-center">
                    <div className="relative">
                        <Combobox value={newsCategory} onChange={setNewsCategory}>
                            {/* <Combobox.Input */}
                            <input className="w-30 h-7 md:h-10 md:w-60 px-4 py-2 pr-10 text-white placeholder-gray-400 bg-gray-800 rounded-md focus:outline-none"
                            onChange={handleInputChange}
                            onTouchStart={handleInputChange}
                            value={query}
                            placeholder="Search a crypto..."/>
                            {/* className="w-30 h-7 md:h-10 md:w-60 px-4 py-2 pr-10 text-white placeholder-gray-400 bg-gray-800 rounded-md focus:outline-none"
                            onChange={handleInputChange}
                            value={query}
                            placeholder="Search a crypto..."
                            // /> */}
                            <button
                            className="absolute top-0 right-0 h-7 md:h-10 px-2 py-1 text-white bg-gray-800 rounded-md focus:outline-none"
                            onClick={handleButtonClick}
                            >{showDropdown ? "▲" : "▼"}</button>
                            {showDropdown && filteredCryptoList.length > 0 && (
                            <Combobox.Options className="w-64 mt-1 max-h-40 overflow-y-auto bg-white rounded-md shadow-lg text-sm lg:text-lg" static>
                                {filteredCryptoList.map((crypto) => (
                                    <Combobox.Option key={crypto.uuid} value={crypto.name} className="px-4 py-2 text-black cursor-pointer select-none hover:bg-gray-200" onClick={() => handleOptionSelect(crypto.name)}>
                                        {crypto.name}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                            )}
                        </Combobox>
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10 mt-5 md:mt-10 lg:mt-16 px-5 md:px-10 text-center">
                {filteredCryptoNews?.map((news) => (
                    <div key={news.url} className="bg-white text-black rounded-2xl pb-3">
                        <a href={news.url} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-row justify-between p-2 text-[12px] md:text-base lg:text-xl font-bold space-x-2 md:p-2 lg:p-3">
                                <div className="text-left w-2/3">
                                {news?.name.substring(0,70)}....
                                </div>
                                <div className="w-[55px] h-[55px] md:h-[60px] md:w-[60px] lg:h-[90px] lg:w-[90px] overflow-hidden ">
                                <   img src={ news.image? news?.image?.thumbnail?.contentUrl : PolygonMaticIcon} alt="" className="rounded-xl"/>
                                </div>
                            </div>
                            <div className="p-1 text-[10px] md:text-[15px] text-left px-2 md:px-3">
                                {news?.description.substring(0, 170)}....
                            </div>
                            <div className="flex flex-row text-[10px] md:text-xs lg:text-sm items-center justify-around mt-2 p-1 lg:p-3">
                                <img src={news.provider[0]?.image?.thumbnail?.contentUrl || PolygonMaticIcon} alt="" className="w-[25px] h-[25px] md:h-[25px] md:w-[25px] lg:h-[40px] lg:w-[40px] "/>
                                <div >{news.provider[0]?.name}</div>
                                <div >{moment(news.datePublished).startOf('ss').fromNow()}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default News