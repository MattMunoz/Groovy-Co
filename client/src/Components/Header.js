import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../Global/userState";

export function Header({ user }) {
  //const styl = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  //const styl = {};
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { username, role, clearUserStore } = useUserStore();

  const Logout = () => {
    // console.log(cookies)
    removeCookie("token");
    clearUserStore();
    navigate("/login");
  };
  return (
    <header className="header">
      <h1>Groovy Co.</h1>
      <h3>
        {role}: {username}
      </h3>
      <h2>Balance: XXX</h2>
      <button className="logout" onClick={Logout}>
        Logout
      </button>
    </header>
  );
}
