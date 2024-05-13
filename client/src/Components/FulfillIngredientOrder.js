import { useUserStore } from "../Global/userState";
import axios from "axios";
import { useEffect, useState,Fragment } from "react";

export default function FulfillIngredientOrder() {
  const {role, id} = useUserStore()
  const [openOrders, setOpenOrders] = useState([]);
  async function getOpenOrders() {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/GetOpenChefOrders"
      );
      console.log(data)
      setOpenOrders(data.orders);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getOpenOrders();
  }, []);

  async function getChefName(orderId){
    async function findChef() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/GetUser",
           {id: orderId}
        );

        console.log(data)
      } catch (e) {
        console.log(e);
      }
    }
    return findChef()
  }

  async function rejectOrder(orderId){
    try {
      const { data } = await axios.post(
        "http://localhost:4000/CompleteOrder",
         {id: orderId}
      );

      console.log(data)
    } catch (e) {
      console.log(e);
    }
    getOpenOrders()
  }

  async function fulfillOrder(order){
    console.log(role)
    try {
      const { data } = await axios.post(
        "http://localhost:4000/FulfillOrder",
         {orderId:order._id, role, id}
      );

      if(data){
        try{
        for(const item of order.items){
          const result = await axios.post(
            "http://localhost:4000/AddIngredient",
            {
              name:item.name,
              quantity:item.quantity
            }
          )
          console.log(result)
        }
        } catch(e){
          console.log("Error updating ingredients")
          console.log(e)
        }
        getOpenOrders()
      }

      console.log(data)
    } catch (e) {
      console.log(e);
    }
    
  }

  return (
    openOrders.map((order) => {
    return(
    <>
      <div className="order-container">
      {/* <div className="order-item">
          <b>{()=> getChefName(order.orderer)}</b>
        </div>
        <div className="order-item">
          <b>Quantity:</b>
        </div> */}
        <div className="order-item">
          <b>Ingredient Name:</b>
        </div>
        <div className="order-item">
          <b>Quantity:</b>
        </div>
        {order.items.map((item) => (
          <Fragment key={item.name}>
            <div className="order-item"> {item.name} </div>
            <div className="order-item"> {item.quantity} </div>
          </Fragment>
        ))}

        <div className="order-item">
          <button className="btn" onClick={()=>rejectOrder(order._id)}>Reject Order</button>
        </div>

        <div className="order-item">
          <button className="btn" onClick={()=>fulfillOrder(order)}>Fulfill Order</button>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <br />
    </>
    )
  })
);
}
