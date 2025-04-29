import React from "react";

const Navbar:React.FC=()=>{
    return(
        <div>
            <div>
                <div className="h-20 w-full bg-blue-300 flex items-center justify-between px-5 py-2">
                    <div>
                        <h1 className="hover:text-2xl duration-300 ease-in-out cursor-pointer">BitCoin Trading Agent</h1>
                    </div>
                    <div className="items-center justify-between flex flex-row gap-20 px-10">
                        <h1 className="hover:text-white hover:bg-black px-2 py-1 rounded-lg cursor-pointer duration-300 ease-in-out">Agent</h1>
                        <h1 className="hover:text-white hover:bg-black px-2 py-1 rounded-lg cursor-pointer duration-300 ease-in-out">Today's News</h1>
                        <h1 className="hover:text-white hover:bg-black px-2 py-1 rounded-lg cursor-pointer duration-300 ease-in-out">About this Agent</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;