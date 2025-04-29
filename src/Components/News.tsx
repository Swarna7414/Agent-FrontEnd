import React, { useEffect, useState } from "react";

const News:React.FC=()=>{

    const [headlines,setheadlines]=useState<string[]>([]);
    const [loading,setloading]=useState<boolean>(true);

    const [sentiment,setsentiment]=useState<number>(0.00)

    const fetchHeadlines = async ()=> {
        try{
            const response= await fetch("http://127.0.0.1:8000/news");
            const data= await response.json();
            setheadlines(data.headlines);
            setloading(false);
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
        const intervel=setInterval(fetchHeadlines,10000);
        return ()=> clearInterval(intervel);
    },[]);

    useEffect(()=>{
        FetchSentiment();
        const intervel=setInterval(FetchSentiment,1500)
        return ()=> clearInterval(intervel);
    })


    return(
        <section className="mt-25 flex justify-center px-60 pb-25">
            <div className="p-6 bg-gray-200 rounded-lg shadow-md w-full ">
                <h1>{sentiment}</h1>
                <h1>Latest Bitcoin Headlines</h1>
                {loading ? ( <p>Loading... News</p>): 
                (
                <ul className="list-disc list-inside space-y-2">
                    {headlines.map((headline,index)=>(
                        <h1 key={index} className="text-lg">{headline}</h1>
                    ))}
                </ul>
                )
                }
            </div>
            <div>
                
            </div>
        </section>
    );
}
export default News;