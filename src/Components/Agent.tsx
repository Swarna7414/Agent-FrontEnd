import React, { useEffect, useRef, useState } from "react";
import { API } from "./interfaces";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Agent: React.FC = () => {
  const [api, setApi] = useState<API>({
    action: null,
    totalcash: null,
    BTC: null,
    moneyleft: null,
    BTCliveprice: null,
    Sentiment: null,
    Profit_Loss: null,
  });

  const [networthHistory, setNetworthHistory] = useState<
    { step: number; networth: number }[]
  >([]);

  const [lineColor, setLineColor] = useState<string>("#82ca9d");

  const [actionHistory, setActionHistory] = useState<
    {
      step: number;
      action: string | null;
      networth: number | null;
      price: number | null;
      sentiment: string | null;
    }[]
  >([]);

  const stepRef = useRef<number>(0);

  const FetchStatus = async () => {
    try {
      stepRef.current += 1;
      const step = stepRef.current;

      const response = await fetch(`https://web-production-7ce7.up.railway.app/agent`);
      const data = await response.json();

      const networthNum = Number(data.totalcash?.replace("$", ""));
      const priceNum = Number(data.BTCliveprice?.replace("$", ""));

      setApi(data);

      setLineColor(networthNum < 35000 ? "#ff4d4f" : "#82ca9d");

      setNetworthHistory((prev) => [...prev, { step, networth: networthNum }]);

      setActionHistory((prev) => [
        ...prev,
        {
          step,
          action: data.action,
          networth: networthNum,
          price: priceNum,
          sentiment: data.Sentiment,
        },
      ]);
    } catch (error) {
      console.error("Error fetching agent status:", error);
    }
  };

  useEffect(() => {
    FetchStatus();
    const interval = setInterval(() => {
      FetchStatus();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-2 mt-4 px-6">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between h-auto w-auto gap-4">
          
          <div className="mt-18 h-auto w-full lg:w-[400px] rounded-2xl shadow-xl shadow-gray-200 hover:shadow-blue-400 duration-300 flex flex-col gap-1.5 px-4 py-4 cursor-pointer">
            <h1 className="font-semibold text-2xl">Swarna's Prediction</h1>
            <p><strong>Action: </strong> {api.action}</p>
            <p><strong>Total Cash: </strong> {api.totalcash}</p>
            <p><strong>BTC Holding Right Now: </strong> {api.BTC}</p>
            <p><strong>Money Left: </strong> {api.moneyleft}</p>
            <p><strong>BTC Live Price: </strong> {api.BTCliveprice}</p>
            <p><strong>Sentiment: </strong> {api.Sentiment}</p>
            <p><strong>Profit/Loss: </strong> {api.Profit_Loss}</p>
          </div>

          {/* Graph */}
          <div className="h-auto w-full flex-1 rounded-2xl shadow-xl shadow-gray-200 hover:shadow-blue-400 duration-300 pt-4 pl-4">
            <h1 className="text-xl font-bold text-center lg:text-left">Today's Balance Graph</h1>
            <div className="mt-5 h-[300px] w-full pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networthHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="step"
                    label={{
                      value: "Steps",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Networth ($)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="networth"
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        
        <div className="w-full h-50 bg-gray-200 rounded-2xl shadow-md shadow-blue-200 overflow-x-auto lg:overflow-y-auto p-4 mt-15">
          <table className="min-w-[600px] table-auto w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-2">Step</th>
                <th className="px-2">Action</th>
                <th className="px-2">Total Balance</th>
                <th className="px-2">Price of BTC</th>
                <th className="px-2">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {[...actionHistory].reverse().map((entry, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                  <td className="px-2 py-1">{entry.step}</td>
                  <td className="px-2 py-1">{entry.action}</td>
                  <td className="px-2 py-1">${entry.networth?.toFixed(2)}</td>
                  <td className="px-2 py-1">${entry.price?.toFixed(2)}</td>
                  <td className="px-2 py-1">{entry.sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Agent;