import React from "react";
import { Spin } from "antd";

const Loader=()=>{
    return(
        <div className="p-[150px] md:px-[380px] lg:px-[680px]">
            <Spin />
        </div>
    )
}

export default Loader;