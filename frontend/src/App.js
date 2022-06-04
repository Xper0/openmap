import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import './App.css';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
  );
}

export default App;