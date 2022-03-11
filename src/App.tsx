import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import HomeScreen from "./screens/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
