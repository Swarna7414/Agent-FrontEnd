import React, { useEffect, useState } from "react";

const News:React.FC=()=>{

    const [headlines,setheadlines]=useState<string[]>([]);

    const [sentiment,setsentiment]=useState<number>(0.00)

    const fetchHeadlines = async ()=> {
        try{
            const response= await fetch("http://127.0.0.1:8000/news");
            const data= await response.json();
            setheadlines(data.headlines);
        }catch (error){
            console.log("Error fetching news:",error);
        }
    }

    const FetchSentiment = async ()=>{
        try{
            const response = await fetch("http://127.0.0.1:8000/sentiment")
            const data = await response.json();
            setsentiment(data.sentiment)
        }catch (error){
            console.log("Error in Fetching Sentiment")
        }
    }

    useEffect(()=>{
        fetchHeadlines();
        const intervel=setInterval(fetchHeadlines,100000);
        return ()=> clearInterval(intervel);
    },[]);

    useEffect(()=>{
        FetchSentiment();
        const intervel=setInterval(FetchSentiment,1500)
        return ()=> clearInterval(intervel);
    })


    return(
        <section className="px-10 py-10">
            <div className="flex flex-row items-center justify-center gap-10">
                <div className="border-2 rounded-2xl p-5 w-75 h-55 flex flex-col gap-5 hover:shadow-md hover:shadow-green-600">
                <h1>Today's Sentiment : <span>{sentiment}</span></h1>
                    <p>Positive : <span className="hover:text-green-500 cursor-pointer duration-200">0.05 to 1.00</span></p>
                    <p>Neutral : <span className="hover:text-yellow-500 cursor-pointer duration-200">-0.05 to 0.05</span> </p>
                    <p>Negative : <span className="hover:text-red-500 cursor-pointer duration-200">-0.05 to - 1.00</span></p>
                </div>
                <div className="w-full h-140 border-2 rounded-2xl px-8 py-3 flex flex-col gap-2 overflow-y-auto">
                {headlines.map((headline, index) => (
                    <div key={index} className="bg-gray-200 text-black w-full h-20 rounded-xl flex items-center justify-center shadow">
                        <h1 className="mt-2 ml-2 mr-2 text-lg font-semibold">{headline}</h1>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
}
export default News;