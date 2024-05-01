import React from "react";

export function Header({ user }) {
  //const styl = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  //const styl = {};
  return (
    <header className="header">
      <h1>Groovy Co.</h1>
      <h3>Welcome, {user}</h3>
      <h2>Balance: XXX</h2>
      <button className="logout">Logout</button>
    </header>
  );
}
