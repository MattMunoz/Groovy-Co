import { Header } from "../Components/Header";
import { Menu } from "../Components/Menu";
import { Footer } from "../Components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useUserStore } from "../Global/userState";

export default function MainMenu() {
  // const currTime = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { updateUsername, updateRole } = useUserStore();
  const [orderItems, setOrderItems] = useState([]);

  function handleAddItems(item) {
    setOrderItems((orderItems) => [...orderItems, item]);

    console.log(orderItems);
  }

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? (toast(`Hello ${user.role} ${user.username}`, {
            position: "top-right",
          }),
          updateUsername(user.username),
          updateRole(user.role))
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <div className="main">
      <div className="contatiner">
        <Header />
        <Menu onAddItems={handleAddItems} />
        <Footer />
      </div>
      <div className="bar">
        <strong>Groovy Co.</strong>
      </div>
    </div>
  );
}
