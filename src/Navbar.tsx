import React from "react";
import { NavLink } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <div className="sticky top-0 z-50">
      <nav className="h-20 w-full bg-blue-500 flex items-center justify-between px-8 shadow-md">
        
        <div className="text-white text-2xl font-bold cursor-pointer hover:text-gray-300 transition duration-300 flex flex-row justify-between gap-2">
          <FaRobot className="mt-1"/>
          <h1>Agent Swarna - BTC Trading Agent</h1>
        </div>

        
        <div className="flex gap-10 items-center">
          <NavLink
            to="/agent"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-md font-semibold transition duration-300"
                : "text-white hover:bg-black hover:text-white px-4 py-2 rounded-md font-semibold transition duration-300"
            }
          >
            Agent
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-md font-semibold transition duration-300"
                : "text-white hover:bg-black hover:text-white px-4 py-2 rounded-md font-semibold transition duration-300"
            }
          >
            Today's News
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-md font-semibold transition duration-300"
                : "text-white hover:bg-black hover:text-white px-4 py-2 rounded-md font-semibold transition duration-300"
            }
          >
            About this Agent
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;