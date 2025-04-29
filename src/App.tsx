import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agent from "./Components/Agent";
import News from "./Components/News"
import About from "./Components/About";
import Navbar from "./Navbar";

const App: React.FC = () => {
    return (
      <div>
        <Navbar />
  
        <Routes>
          <Route path="/" element={<Agent />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    );
  };
  
export default App;
