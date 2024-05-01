import React from "react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const hour = new Date().getHours();
  console.log(hour);
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  //if (hour >= openHour && hour < closeHour) alert("We are currenly open!");
  //else alert("Sorry, we are closed");
  //Can be done to return one specific way of doing it but then we must pass all values of style and name, not recomended
  //if (!isOpen)
  //  return (
  //    <p>
  //      We're hapy to welcome you betweern {openHour}:00 and {closeHour}:00.
  //    </p>
  //  );
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're hapy to welcome you betweern {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
  //return React.createElement("footer", null, "We're currently open.");
}
function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      {" "}
      <p>
        We're open from {openHour}:00 until {closeHour}:00.
      </p>
      <button className="btn">Checkout</button>
    </div>
  );
}