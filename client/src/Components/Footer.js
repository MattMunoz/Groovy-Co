import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../Global/userState";

export function Footer({ activeUser }) {
  // const hour = new Date().getHours();
  // console.log(hour);
  const openHour = 12;
  const closeHour = 22;
  // const isOpen = hour >= openHour && hour < closeHour;
  const isOpen = true;

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
    <>
      <footer className="footer">
        {isOpen ? (
          <Order
            closeHour={closeHour}
            openHour={openHour}
            activeUser={activeUser}
          />
        ) : (
          <p>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00.
          </p>
        )}
      </footer>
    </>
  );
  //return React.createElement("footer", null, "We're currently open.");
}
function Order({ closeHour, openHour, activeUser }) {
  const { role } = useUserStore();
  console.log(role);
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 until {closeHour}:00.
      </p>

      {role !== null ? (
        <Link
          className="btn"
          to={"/checkout"}
          style={{ textDecoration: "none" }}
        >
          Checkout
        </Link>
      ) : (
        <Link className="btn" to={"/signup"} style={{ textDecoration: "none" }}>
          Apply for Membership!
        </Link>
      )}
    </div>
  );
}
