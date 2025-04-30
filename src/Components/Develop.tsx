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
  const [api, setapi] = useState<API>({
    action: null,
    networth: null,
    BTC: null,
    sentiment: null,
    price: null,
    profit: null,
  });

  const [networthhistory, setNetworthHistory] = useState<
    { step: number; networth: number }[]
  >([]);
  const [lineColor, setLineColor] = useState<string>("#82ca9d");
  const [startingBalance, setStartingBalance] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [actionHistory, setActionHistory] = useState<
    {
      step: number;
      action: string | null;
      price: number | null;
      sentiment: string | null;
    }[]
  >([]);

  const stepRef = useRef<number>(0); // ✅ Manual step counter to ensure unique steps

  // ✅ FetchStatus receives step from stepRef and logs it once per call
  const FetchStatus = async () => {
    try {
      stepRef.current += 1;
      const step = stepRef.current;

      const response = await fetch(
        `http://127.0.0.1:8000/status?starting_balance=${startingBalance}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      setapi({
        action: data.action,
        networth: data.networth,
        BTC: data.BTC,
        sentiment: data.sentiment,
        price: data.price,
        profit: data.profit,
      });

      const numericStartingBalance = Number(startingBalance);
      setLineColor(
        data.networth < numericStartingBalance ? "#ff4d4f" : "#82ca9d"
      );

      setNetworthHistory((prev) => [
        ...prev,
        { step, networth: data.networth },
      ]);

      setActionHistory((prev) => [
        ...prev,
        {
          step,
          action: data.action,
          price: data.price,
          sentiment: data.sentiment,
        },
      ]);
    } catch (error) {
      console.error("Error fetching status:", error);
      alert("Something went wrong while fetching data!");
    }
  };

  // ✅ Run once and on interval, without overlap
  useEffect(() => {
    if (submitted) {
      FetchStatus(); // Run once immediately

      const interval = setInterval(() => {
        FetchStatus();
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startingBalance.trim() !== "" && !isNaN(Number(startingBalance))) {
      setSubmitted(true);
    } else {
      alert("Please enter a valid numeric starting balance!");
    }
  };

  if (!submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-200 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">
            Start with what you have. Every Penny counts
          </h2>
          <input
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
            placeholder="Enter the USD you have today for trading"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-45"
          >
            Start Trading
          </button>
        </form>
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-2 mt-4 px-6">
        <div className="flex flex-row items-center justify-between h-110 w-auto">
          <div className="h-60 ml-16 w-100 rounded-2xl shadow-xl shadow-gray-200 hover:shadow-blue-400 duration-300 flex flex-col gap-2 px-2 pl-5 cursor-pointer">
            <h1 className="font-semibold ml-25 text-2xl">Agent Prediction</h1>
            <p>
              <strong>Action: </strong> {api.action}
            </p>
            <p>
              <strong>Today's Total Balance: </strong> {api.networth}
            </p>
            <p>
              <strong>BTC Holding Right Now: </strong> {api.BTC}
            </p>
            <p>
              <strong>Price of BTC: </strong> {api.price}
            </p>
            <p>
              <strong>Profit/Loss: </strong> {api.profit}
            </p>
            <p>
              <strong>Today's Sentiment: </strong> {api.sentiment}
            </p>
          </div>

          <div className="h-100 ml-16 flex-1 rounded-2xl shadow-xl shadow-gray-200 hover:shadow-blue-400 duration-300 pt-1 pl-1 flex flex-col">
            <h1 className="text-xl font-bold ml-90">Today's Balance Graph</h1>
            <div className="ml-5 mt-5 h-[300px] w-full pr-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={networthhistory}>
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

        {/* ✅ Action History Table - Latest First */}
        <div className="w-full h-40 bg-gray-200 rounded-2xl shadow-md shadow-blue-200 overflow-y-auto p-4">
          <table className="table-auto w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-2">Step</th>
                <th className="px-2">Action</th>
                <th className="px-2">Price of BTC</th>
                <th className="px-2">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {[...actionHistory].reverse().map((entry, idx) => (
                <tr key={idx} className="border-t border-gray-300">
                  <td className="px-2 py-1">{entry.step}</td>
                  <td className="px-2 py-1">{entry.action}</td>
                  <td className="px-2 py-1">${entry.price}</td>
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