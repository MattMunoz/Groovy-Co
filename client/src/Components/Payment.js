import React, { useState } from "react";
import { useUserStore } from "../Global/userState";

export function Payment({ orderNo }) {
  const [type, setType] = useState("Delivery");
  const [orderItems, removeItem] = useUserStore((state) => [
    state.orderItems,
    state.removeItem,
  ]);

  const newList = orderItems;
  const total = newList.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const discount = 20;

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
      <div style={{ display: "flex" }}>
        <p style={{ fontSize: "15px" }}>Discount</p>
        <p style={{ marginLeft: "10px", fontSize: "15px" }}>{discount}%</p>
        <p style={{ fontSize: "15px", marginLeft: "370px" }}>
          {(total * discount) / 100}
        </p>
      </div>
      <span className="orderitem">
        <p className="name">Total</p>
        <p className="price">{(total * (100 - discount)) / 100}</p>
      </span>
      <span className="orderitem" onChange={(e) => setType(e.target.value)}>
        <p>Order Type</p>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Delivery</option>
          <option>Pickup</option>
          <option>Dine-In</option>
        </select>
      </span>

      {type === "Delivery" && <DeliveryForm />}
      {type === "Pickup" && ""}
      {type === "Dine-In" && <DineInForm />}

      <button type="button" className="btn">
        Place Order
      </button>
    </div>
  );
}

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
      >
        x
      </button>
    </div>
  );
}

function DeliveryForm() {
  const margin = { marginBottom: "10px" };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();

  return (
    <div className="placeorder">
      <h3>Name:</h3>
      <input
        type="text"
        style={margin}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>Email:</h3>
      <input
        type="text"
        style={margin}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h3>Street Address:</h3>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <h3>City:</h3>
      <input
        type="text"
        style={margin}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <h3>Zip:</h3>
      <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
    </div>
  );
}

function DineInForm() {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const time = hour * 100 + min;
  const [where, setWhere] = useState("Indoor");
  const margin = { marginBottom: "10px" };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  return (
    <div className="placeorder">
      <h3>Name:</h3>
      <input
        type="text"
        style={margin}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>Email:</h3>
      <input
        type="text"
        style={margin}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h3 style={{ marginLeft: "160px" }}>Pickup Time:</h3>
      <input
        type="text"
        style={{ width: "150px", marginLeft: "160px" }}
        placeholder={time}
      />
      <div classname="ltselector">
        <select value={where} onChange={(e) => setWhere(e.target.value)}>
          <option>Indoor</option>
          <option>Outdoor</option>
        </select>
      </div>
    </div>
  );
}
