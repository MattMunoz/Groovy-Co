import { Header } from "../Components/Header";
import { Menu } from "../Components/Menu";
import { Footer } from "../Components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../Global/userState";

export default function MainMenu() {
  // const currTime = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const {
    updateUsername,
    updateRole,
    updateId,
    updateBalance,
    role,
    updateLevel,
    userLevel,
  } = useUserStore();
  const [orderItems, setOrderItems] = useUserStore((state) => [
    state.orderItems,
    state.setOrderItems,
  ]);
  const [foods, setFoods] = useState([]);

  function handleAddItems(item) {
    if (role === null) {
      return;
    }
    const newList = orderItems.map((i) => {
      if (i.name === item.name) {
        return { ...i, quantity: item.quantity + i.quantity };
      }
      return i;
    });

    const itemExists = orderItems.some((i) => i.name === item.name);
    if (!itemExists) {
      setOrderItems([...orderItems, item]);
    } else {
      setOrderItems(newList);
    }
  }

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user, id } = data;
      return status
        ? (
          updateUsername(user.username),
          updateRole(user.role),
          updateId(id),
          updateBalance(user.balance),
          updateLevel(user.level),
          console.log(user.level))
        : removeCookie("token");
    };
    verifyCookie();
  }, [
    removeCookie,
    updateUsername,
    updateId,
    updateRole,
    updateBalance,
    updateLevel
  ]);

  useEffect(() => {
    fetch("http://localhost:4000/GetAllDishes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFoods(data.dishes);
      });
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="main">
        <Header />
        <div style={{ paddingBottom: "15%" }}>
          <Menu onAddItems={handleAddItems} foods={foods} />
        </div>
      </div>
      <Footer activeuser={cookies.token} noFood={foods.length} />
      <div className="bar">
        <strong>Groovy Co.</strong>
      </div>
    </div>
  );
}
