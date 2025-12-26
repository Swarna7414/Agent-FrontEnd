import React, { useEffect } from "react";
import comingSoonImage from "../assets/image.png";
import { useNavigate } from "react-router-dom";

const Develop: React.FC = () => {
  const navigate=useNavigate();
  const toSwarna=()=>{
    navigate("/Agent")
  }
  const toprofile=()=>{
    window.open("https://swarna7414.github.io/SwarnaSaiSankar/")
  }

  
  useEffect(() => {
    const healthCheckUrl = "https://saisankarswarna-agent-swarna.hf.space/health";
    

    fetch(healthCheckUrl).catch(() => {
      
    });

    
    const interval = setInterval(() => {
      fetch(healthCheckUrl).catch(() => {
        
      });
    }, 39600000); 

   
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 py-10">
      <img
        src={comingSoonImage}
        alt="Coming Soon"
        className="w-[300px] h-auto mb-6"
      />
      <h1 className="text-xl text-center font-semibold">
      An automated Bitcoin trading bot using Reinforcement Learning (PPO) was developed by <span className="underline italic hover:text-blue-400 cursor-pointer duration-300" onClick={toprofile}>Swarna Sai Sankar</span> to optimize trading decisions and maximize net worth.
      </h1>
      <div className="mt-2">
        <button className="bg-blue-400 px-2 py-2 rounded-md cursor-pointer hover:bg-blue-600 duration-200" onClick={toSwarna}>
          Agent-Swarna
        </button>
      </div>
    </section>
  );
};

export default Develop;
