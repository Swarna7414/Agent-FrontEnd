import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();

  const frontpage=()=>{
    navigate("/")
  }

  return (
    <div className="sticky top-0 z-50">
      <nav className="h-20 w-full bg-blue-500 flex items-center justify-between px-8 shadow-md">
        {/* Logo */}
        <div className="text-white text-2xl font-bold cursor-pointer hover:text-gray-300 transition duration-300 flex flex-row justify-between gap-2">
          <FaRobot className="mt-1" />
          <h1 onClick={frontpage}>Agent Swarna - BTC Trading Agent</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
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
            About Swarna
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            {menuOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-blue-600 py-4 px-6">
          <NavLink
            to="/agent"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-md font-semibold transition duration-300 w-full text-center"
                : "text-white hover:bg-black hover:text-white px-4 py-2 rounded-md font-semibold transition duration-300 w-full text-center"
            }
          >
            Agent
          </NavLink>

          <NavLink
            to="/news"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-md font-semibold transition duration-300 w-full text-center"
                : "text-white hover:bg-black hover:text-white px-4 py-2 rounded-md font-semibold transition duration-300 w-full text-center"
            }
          >
            Today's News
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-black bg-white px-4 py-2 rounded-md font-semibold transition duration-300 w-full text-center"
                : "text-white hover:bg-black hover:text-white px-4 py-2 rounded-md font-semibold transition duration-300 w-full text-center"
            }
          >
            About Swarna
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;