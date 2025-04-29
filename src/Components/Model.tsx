import React, { useEffect, useState } from "react";
import { API } from "./interfaces";

const Model:React.FC=()=>{
    const [api,setapi]=useState<API>({
        action:null,
        networth:null,
        BTC:null,
        sentiment:null,
        price:null,
        profit:null,
    });

    const FetchStatus = async() =>{
        try{
            const response = await fetch('http://127.0.0.1:8000/status');
            const data= await response.json();
            setapi({
                action:data.action,
                networth:data.networth,
                BTC:data.BTC,
                sentiment:data.sentiment,
                price:data.price,
                profit:data.profit,
            });
            console.log("Fetched data:", data);
        }catch (error){
            console.log("Error vastundi Chusko ra Puka",error);
        }
    }

    useEffect(()=>{
        FetchStatus();
        const interverl=setInterval(FetchStatus,5500)
        return ()=> clearInterval(interverl);
    })

    return(
        <section>
            <div className="mt-35 flex items-center justify-center">
                <div className="p-6 bg-gray-200 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Model Predection</h2>
                    <p><strong>Action:</strong> {api.action}</p>
                    <p><strong>Today's Total Balnce:</strong> {api.networth}</p>
                    <p><strong>BTC Holding Right Now:</strong> {api.BTC}</p>
                    <p><strong>Price:</strong> {api.price}</p>
                    <p><strong>Profit/Loss:</strong> {api.profit}</p>
                    <p><strong>Sentiment:</strong> {api.sentiment}</p>
                </div>
            </div>
        </section>
    )
}
export default Model