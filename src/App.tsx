import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import HomeScreen from "./screens/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
