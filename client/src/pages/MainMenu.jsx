import { Header } from "../Components/Header";
import { Menu } from "../Components/Menu";
import { Footer } from "../Components/Footer";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useUserStore } from "../Global/userState";

export default function MainMenu() {
  // const currTime = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { updateUsername, updateRole, updateId, updateBalance, role } =
    useUserStore();
  const [orderItems, setOrderItems] = useUserStore((state) => [
    state.orderItems,
    state.setOrderItems,
  ]);

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
        ? (toast(`Hello ${user.role} ${user.username}`, {
            position: "top-right",
          }),
          updateUsername(user.username),
          updateRole(user.role),
          updateId(id),
          updateBalance(user.balance))
        : removeCookie("token");
    };
    verifyCookie();
  }, [
    removeCookie,
    updateUsername,
    updateId,
    updateRole,
    updateBalance,
  ]);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="main">
        <Header />
        <div style={{ paddingBottom: "15%" }}>
          <Menu onAddItems={handleAddItems} />
        </div>
      </div>
      <Footer activeuser={cookies.token} />
      <div className="bar">
        <strong>Groovy Co.</strong>
      </div>
    </div>
  );
}
