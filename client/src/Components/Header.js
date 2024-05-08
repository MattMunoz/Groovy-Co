import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies} from "react-cookie";
import { useUserStore } from "../Global/userState";

export function Header() {
  //const styl = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  //const styl = {};
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([])
  const {username, role, clearUserStore, id, balance} = useUserStore()
  const Logout = () => {
    // console.log(cookies)
    removeCookie("token");
    clearUserStore();
    navigate("/login");
  };
  return (
    <header className="header">
      {/* <h1 >Groovy Co.</h1> */}
      <Link className="logo" to="/">Groovy Co.</Link>
      {id && <>
      <h2>Welcome, {role} {username}</h2>
      <h2>Balance: ${balance}</h2> </>
      }
      {/* <h5>id: {id} </h5> */} 
      {id ? 
      <div className="list">
        
      <button className="header-button" onClick={Logout}>Logout</button>
      <Link className = "header-button" to="/options">Options</Link>
      </div> :
      <Link className="header-button" to="/login">Login</Link>
        }
      
    </header>
  );
}
