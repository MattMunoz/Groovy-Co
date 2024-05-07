import React, { useState } from "react";

export function Payment() {
  const [type, setType] = useState("Delivery");
  const order = [
    {
      name: "Focaccia",
      price: 6,
      quantity: 1,
    },
    {
      name: "Pizza Margherita",
      price: 10,
      quantity: 3,
    },
    {
      name: "Pizza Spinaci",
      price: 12,
      quantity: 2,
    },
    {
      name: "Pizza Funghi",
      price: 12,
      quantity: 4,
    },
    {
      name: "Pizza Salamino",
      price: 15,
      quantity: 1,
    },
    {
      name: "Pizza Prosciutto",
      price: 18,
      quantity: 2,
    },
  ];
  const total = order.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div className="order">
      <h1>Order XXX</h1>
      <ul className="orderitems">
        {order.map((orderitem) => (
          <Order orderitem={orderitem} key={order.name} />
        ))}
      </ul>
      <div className="line"></div>
      <span className="orderitem">
        <p className="name">Total</p>
        <p className="price">{total}</p>
      </span>
      <span className="orderitem" onChange={(e) => setType(e.target.value)}>
        <p>Order Type</p>
        <select value={type}>
          <option>Delivery</option>
          <option>Pickup</option>
        </select>
      </span>
      {type === "Delivery" ? <Form /> : ""}
      <button className="btn">Place Order</button>
    </div>
  );
}

function Order({ orderitem }) {
  const price = orderitem.price * orderitem.quantity;
  return (
    <div classname className="orderitem">
      <p className="name">
        <strong>{orderitem.name}</strong> x{" "}
        <strong>{orderitem.quantity}</strong>
      </p>
      <p className="price">{price}</p>
    </div>
  );
}

function Form() {
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
