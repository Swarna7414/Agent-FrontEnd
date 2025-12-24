import React from "react";
import { Routes, Route } from "react-router-dom";
import Agent from "./Components/Agent";
import News from "./Components/News"
import About from "./Components/About";
import Navbar from "./Navbar";
import Develop from "./Components/Develop";

const App: React.FC = () => {
    return (
      <div>
        <Navbar />
  
        <Routes>
          <Route path="/" element={<Develop />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    );
  };
  
export default App;
