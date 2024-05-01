import React from "react";
import "./Modal.css";

export function Modal({ setclose }) {
  return (
    <div className="modalBackground">
      <div className="modalContatiner">
        <div className="closeBtn">
          <button onClick={() => setclose(false)}> X </button>
        </div>
        <div className="title">
          <h1>Order</h1>
        </div>
        <div className="body">
          <p>Item</p>
        </div>
        <div className="checkout">Payment</div>
      </div>
    </div>
  );
}
