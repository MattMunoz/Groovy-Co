import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../Global/userState";
import { useLocation } from "react-router-dom";

export function Header() {
  //const styl = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  //const styl = {};
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { username, role, clearUserStore, id, balance } = useUserStore();
  const location = useLocation();
  const path = location.pathname;
  const [orderItems, setOrderItems, clearOrderItems] = useUserStore((state) => [
    state.orderItems,
    state.setOrderItems,
    state.clearOrderItems,
  ]);

  console.log(path);
  const Logout = () => {
    // console.log(cookies)
    clearOrderItems();
    removeCookie("token");
    clearUserStore();
    navigate("/login");
  };
  return (
    <header className="header">
      {/* <h1 >Groovy Co.</h1> */}
      <Link className="logo" to="/">
        Groovy Co.
      </Link>
      {id && (
        <>
          <h2>
            Welcome, {role} {username}
          </h2>
          <h2>Balance: ${balance}</h2>{" "}
        </>
      )}
      {/* <h5>id: {id} </h5> */}
      {id ? (
        <div className="list">
          <button className="header-button" onClick={Logout}>
            Logout
          </button>
          {path !== "/options" ? (
            <Link className="header-button" to="/options">
              Options
            </Link>
          ) : (
            <Link className="header-button" to="/">
              Menu
            </Link>
          )}
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
