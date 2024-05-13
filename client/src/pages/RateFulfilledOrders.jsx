import React, { useState, useEffect, useReducer, Fragment } from "react";
import { Header } from "../Components/Header";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../Global/userState";
import axios from "axios";

export default function RateFulfilledOrders(){
  const {id} = useUserStore()
  const [openOrders, setOpenOrders] = useState([]);

  async function getOpenOrders() {
    try {
      // console.log(id)
      const { data } = await axios.post(
        "http://localhost:4000/GetUserOrders",
        {id}
      );
      // console.log(data)
      setOpenOrders(data.orders);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getOpenOrders();
  }, []);

  async function complain(order){
    try{
      if(order.fulfilledBy){
        const complaint = await axios.post(
          "http://localhost:4000/FileComplaint",
          {
            from:id,
            to:order.fulfilledBy,
            type:"regular"
          }
        )
        const orderRes = await axios.post(
          "http://localhost:4000/CompleteOrder",
          {id:order._id}
        )
        console.log(complaint)
        getOpenOrders()
      }
    } catch(e){
      console.log(e)
    }
  } 

  async function complainFraud(){
    try{

    } catch(e){
      console.log(e)
    }
  }

  async function compliment(order){
    try{
      console.log(order.fulfilledBy)
      if(order.fulfilledBy){
      const result = await axios.post(
        "http://localhost:4000/IncreaseStanding",
        {id:order.fulfilledBy, amount:1}
      )
      const orderRes = await axios.post(
        "http://localhost:4000/CompleteOrder",
        {id:order._id}
      )
      console.log(orderRes)
      console.log(result)
      getOpenOrders()
    }
    } catch(e){
      console.log(e)
    }
  }

  return(
    <>
    <Header />
    {openOrders.map((order) => {
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
          

          
          <div className="ingredient-item">
            <button className="btn"onClick={()=> complain(order)} >Complain Quality</button>
          </div>
  
          <div className="ingredient-item">
            <button className="btn" onClick={()=>compliment(order)}>Compliment Order</button>
          </div>
          <div className="ingredient-item">
            <button className="btn" >Complain Fraud</button>
          </div>
          </div>
        
        <br />
        <br />
        <hr />
        <br />
      </>
      )
    })}
    </>
  )

}