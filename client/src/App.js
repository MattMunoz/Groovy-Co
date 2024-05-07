import { Route, Routes } from "react-router-dom";
import { Login, Signup, Options } from "./pages";

import React from "react";
import "./index.css";
import MainMenu from "./pages/MainMenu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<MainMenu />} />
        <Route path="/options" element = {<Options />} />
      </Routes>
    </div>
  );
}

export default App;
