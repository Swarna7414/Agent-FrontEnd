import React, { useEffect, useState } from "react";

const News: React.FC = () => {
  const [headlines, setheadlines] = useState<string[]>([]);
  const [sentiment, setsentiment] = useState<number>(0.0);

  const fetchHeadlines = async () => {
    try {
      const response = await fetch("https://web-production-7ce7.up.railway.app/news");
      const data = await response.json();
      setheadlines(data.headlines);
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  const FetchSentiment = async () => {
    try {
      const response = await fetch("https://web-production-7ce7.up.railway.app/sentiment");
      const data = await response.json();
      setsentiment(data.sentiment);
    } catch (error) {
      console.log("Error in Fetching Sentiment");
    }
  };

  useEffect(() => {
    fetchHeadlines();
    const intervel = setInterval(fetchHeadlines, 100000);
    return () => clearInterval(intervel);
  }, []);

  useEffect(() => {
    FetchSentiment();
    const intervel = setInterval(FetchSentiment, 1500);
    return () => clearInterval(intervel);
  }, []);

  return (
    <section className="px-4 lg:px-10 py-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
        {/* Sentiment Box */}
        <div className="mt-20 border-2 rounded-2xl p-5 w-full lg:w-72 h-auto flex flex-col gap-5 hover:shadow-md hover:shadow-green-600">
          <h1>
            Today's Sentiment : <span>{sentiment}</span>
          </h1>
          <p>
            Positive :
            <span className="hover:text-green-500 cursor-pointer duration-200">
              {" "}
              0.05 to 1.00
            </span>
          </p>
          <p>
            Neutral :
            <span className="hover:text-yellow-500 cursor-pointer duration-200">
              {" "}
              -0.05 to 0.05
            </span>
          </p>
          <p>
            Negative :
            <span className="hover:text-red-500 cursor-pointer duration-200">
              {" "}
              -0.05 to -1.00
            </span>
          </p>
        </div>

        {/* News Headlines */}
        <div className="w-full h-96 lg:h-140 border-2 rounded-2xl px-4 py-3 flex flex-col gap-3 overflow-y-auto">
          {headlines.map((headline, index) => (
            <div
              key={index}
              className="bg-gray-200 text-black w-full min-h-20 rounded-xl flex items-center justify-center shadow px-2 text-center"
            >
              <h1 className="text-base md:text-lg font-semibold">{headline}</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;