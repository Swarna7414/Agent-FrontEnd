import React from "react";

const About: React.FC = () => {
  return (
    <section>
      <div className="px-10 py-10">
        <div className="w-full h-auto px-2 py-2 space-y-6">
          <h1 className="text-2xl font-bold mb-6 ml-150">About Agent Swarna</h1>
          
          <p className="text-lg leading-relaxed">
            This project is about building Agent Swarna, a Bitcoin trading bot powered by Reinforcement Learning (RL). The cryptocurrency market is very volatile, and traditional trading strategies often fail to keep up with rapid price changes. To solve this, Agent Swarna is designed to make smart decisions to buy, sell, or hold Bitcoin based on market data and news sentiment.
          </p>

          <p className="text-lg leading-relaxed">
            Agent Swarna is trained only using the Proximal Policy Optimization (PPO) algorithm through the Stable-Baselines3 library. A custom environment following the OpenAI Gym format was created, where the agent learns trading by observing historical Bitcoin prices, trading volume, and randomly generated sentiment scores. The training process happens in three phases — starting with 1-minute trades, moving to 5-minute trades, and finally applying confidence-based trading during the final phase.
          </p>

          <p className="text-lg leading-relaxed">
            Python is used as the main language, with important libraries like NumPy, Pandas, Matplotlib, and Seaborn for data handling and visualization. Live Bitcoin prices are fetched from the OKX exchange, and news headlines are analyzed for sentiment using the NewsAPI and VADER sentiment analyzer. To make the agent accessible, a FastAPI web server is deployed, allowing real-time trading predictions, net worth tracking, and sentiment updates through easy API calls.
          </p>

          <p className="text-lg leading-relaxed">
            The main goal of Agent Swarna is to maximize returns and manage risks better than traditional buy-and-hold strategies. Its performance is checked through financial metrics like the Sharpe ratio, maximum drawdown, and overall profit. By adapting quickly to market changes and reacting smartly to news sentiment, Agent Swarna aims to outperform standard trading approaches and show the real potential of RL in financial markets.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default About;
