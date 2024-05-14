import { Route, Routes } from "react-router-dom";
import { Login, Signup, Options, RateFulfilledOrders } from "./pages";
import { ToastContainer } from "react-toastify";

import React from "react";
import "./index.css";
import MainMenu from "./pages/MainMenu";
import Checkout from "./pages/Checkout";
import UpdateMenu from "./pages/UpdateMenu";
import IngredientOrder from "./pages/IngredientOrder";

function App() {
  return (
    <div className="App">
      <ToastContainer limit={3} autoClose={2000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/updatemenu" element={<UpdateMenu />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<MainMenu />} />
        <Route path="/options" element={<Options />} />
        <Route path="/ingredientorder" element={<IngredientOrder />} />
        <Route path="/ratefulfilledorders" element={<RateFulfilledOrders />} />
      </Routes>
    </div>
  );
}

export default App;
