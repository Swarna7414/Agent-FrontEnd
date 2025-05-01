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

      const response = await fetch(`http://127.0.0.1:8000/agent`);
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
        <div className="flex flex-row items-center justify-between h-110 w-auto">
          <div className="h-60 ml-16 w-100 rounded-2xl shadow-xl shadow-gray-200 hover:shadow-blue-400 duration-300 flex flex-col gap-1.5 px-2 pl-5 cursor-pointer">
            <h1 className="font-semibold ml-25 text-2xl">Agent Prediction</h1>
            <p><strong>Action: </strong> {api.action}</p>
            <p><strong>Total Cash: </strong> {api.totalcash}</p>
            <p><strong>BTC Holding Right Now: </strong> {api.BTC}</p>
            <p><strong>Money Left: </strong> {api.moneyleft}</p>
            <p><strong>BTC Live Price: </strong> {api.BTCliveprice}</p>
            <p><strong>Sentiment Score: </strong> {api.Sentiment}</p>
            <p><strong>Profit/Loss: </strong> {api.Profit_Loss}</p>
          </div>

          <div className="h-100 ml-16 flex-1 rounded-2xl shadow-xl shadow-gray-200 hover:shadow-blue-400 duration-300 pt-1 pl-1 flex flex-col">
            <h1 className="text-xl font-bold ml-90">Today's Balance Graph</h1>
            <div className="ml-5 mt-5 h-[300px] w-full pr-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networthHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" label={{ value: "Steps", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Networth ($)", angle: -90, position: "insideLeft" }} />
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

        <div className="w-full h-40 bg-gray-200 rounded-2xl shadow-md shadow-blue-200 overflow-y-auto p-4">
          <table className="table-auto w-full text-left text-sm">
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