import React, { useState } from "react";
import { useUserStore } from "../Global/userState";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DineInForm } from "./DineInForm";
import { DeliveryForm } from "./DeliveryForm";

export function Payment({ orderNo }) {
  const [orderType, setOrderType] = useState("Delivery");
  const [clearOrderItems] = useUserStore((state) => [state.clearOrderItems]);
  const { id, level, balance, updateBalance } = useUserStore();
  // console.log(username, id)
  const state = { submitButton: "" };
  const navigate = useNavigate();

  const [orderItems, removeItem] = useUserStore((state) => [
    state.orderItems,
    state.removeItem,
  ]);

  const newList = orderItems;
  const acc = newList.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const errorMoney = () => {
    toast.error("Not Enough Money in the Account", {
      position: "bottom-left",
      hideProgressBar: true,
    });
  };

  const errorOrder = () => {
    toast.error("No items in your order", {
      position: "bottom-left",
      hideProgressBar: true,
    });
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function balancePayment(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/withdraw", {
        id: id,
        amount: total,
      });
      console.log(data);
      const { user, success } = data;
      if (success) {
        updateBalance(user.balance);
        toast.success(`Order Placed`, {
          position: "bottom-left",
          hideProgressBar: true,
        });
        state.submitButton = "";
      }
    } catch (error) {
      console.log(error);
    }
    <ToastContainer />;
    await sleep(2000);
    try {
      const { data } = await axios.post("http://localhost:4000/AddOrder", {
        orderer: id,
        items: orderItems,
        type: orderType,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    clearOrderItems();
    navigate("/");
  }

  const discount = level * 10;

  const total = (acc * (100 - discount)) / 100;

  const enoughMoney = balance >= total;
  /*
  function update(total) {
    updateBalance(balance - total);
  }
*/
  return (
    <div className="order">
      <h1>Order #{orderNo}</h1>
      <ul className="orderitems">
        {orderItems.map((orderitem) => (
          <Order
            orderitem={orderitem}
            key={orderItems.name}
            remove={removeItem}
          />
        ))}
      </ul>
      {/* <div className="line"></div> */}
      {level !== 0 ? (
        ""
      ) : (
        <div>
          {level === 0 ? (
            ""
          ) : (
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "15px" }}>Discount</p>
              <p style={{ marginLeft: "10px", fontSize: "15px" }}>
                {discount}%
              </p>
              <p style={{ fontSize: "15px", marginLeft: "370px" }}>
                {(total * discount) / 100}
              </p>
            </div>
          )}
        </div>
      )}
      <span className="orderitem">
        <p className="name">Total</p>
        <p className="price">{(total * (100 - discount)) / 100}</p>
      </span>
      <span
        className="orderitem"
        onChange={(e) => setOrderType(e.target.value)}
      >
        <p>Order Type</p>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
        >
          <option>Delivery</option>
          <option>Pickup</option>
          <option>Dine-In</option>
        </select>
      </span>
      {orderType === "Delivery" && <DeliveryForm />}
      {orderType === "Pickup" && ""}
      {orderType === "Dine-In" && <DineInForm />}

      {enoughMoney && total !== 0 ? (
        <>
          <Link className="btn" onClick={balancePayment} to={"/"}>
            Place Order
          </Link>
          <ToastContainer />
        </>
      ) : (
        ""
      )}
      {!enoughMoney ? (
        <div>
          <button type="button" className="btn" onClick={errorMoney}>
            Place Order
          </button>
          <ToastContainer />
        </div>
      ) : (
        ""
      )}
      {total === 0 ? (
        <div>
          <button className="btn" to={"/"} onClick={errorOrder}>
            Place Order
          </button>
          <ToastContainer />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

toast.dismiss("toast-1");

function Order({ orderitem, remove }) {
  const price = orderitem.price * orderitem.quantity;

  return (
    <div classname className="orderitem">
      <p className="name">
        <strong>{orderitem.name}</strong> x{" "}
        <strong>{orderitem.quantity}</strong>
      </p>
      <p className="price">{price}</p>
      <button
        type="button"
        className="remove"
        onClick={() => remove(orderitem.name)}
        style={{ color: "red" }}
      >
        x
      </button>
    </div>
  );
}
