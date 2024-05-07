import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";

import React from "react";
import "./index.css";
import MainMenu from "./pages/MainMenu";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App;
