import React from "react";
import { useEffect, useState } from "react";
import { useUserStore } from "../Global/userState";
import axios from "axios";

export function OpenOrders() {
  const [openOrders, setOpenOrders] = useState([]);
  const { role, id } = useUserStore();

  async function completeOrder(order) {
    console.log(order._id);
    try {
      const { data } = await axios.post("http://localhost:4000/FulfillOrder", {
        orderId: order._id,
        id,
        role
      });
      console.log(data)
      getOpenOrders()
    } catch (e) {
      console.log(e);
    }
  }

  async function getOpenOrders(){
    try{
      const {data} = await axios.get("http://localhost:4000/GetOpenCustomerOrders")
      console.log(data)
      if(data){
        setOpenOrders(data.orders)
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getOpenOrders()
  }, []);

  const filteredOrders = openOrders.filter((order) => order.type === "pickup");

  console.log(filteredOrders);
  return (
    <div>
      <h1>Open Order for Delivery</h1>
      <ul>
        {openOrders.map((order) => (
          <DisplyOpenOrders
            orders={order}
            completeOrder={completeOrder}
            key={order._id}
          />
        ))}
      </ul>
    </div>
  );
}

function DisplyOpenOrders({ orders, completeOrder }) {
  const lastFiveChars = orders._id.slice(-5);
  console.log(orders.type);
  return (
    <div className="openOrders">
      <div className="orderBox">
        #{lastFiveChars}
        <div style={{ marginLeft: "20px" }}>
          <button className="btn" onClick={() => completeOrder(orders)}>
            Deliver
          </button>
        </div>
      </div>
    </div>
  );
}
