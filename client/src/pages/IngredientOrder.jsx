import React, { useState, useEffect, useReducer } from "react";
import { Header } from "../Components/Header";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../Global/userState";
import axios from "axios";

export default function IngredientOrder(){
  // keep all ing in single state, add a updateQuantity field to each object in the array, 0 to start
  // component displays all ings name and quantities, as well as how many are in the order, + - buttons can increment
  // under all ings, text fields for new ing name and quant, as well as add to list button
  const { id, role } = useUserStore()
  const [ingredient, setIngredient] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [allIngredients, setAllIngredients] = useState([]);

  async function getAllIngredients() {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/GetAllIngredients"
      );
      for(const item of data.data){
        item.orderQuantity = 0
      }
      setAllIngredients(data.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    
    getAllIngredients();
    // console.log(allIngredients)
  }, []);
  const state = { submitButton: "" };


  function increment(index){
    const update = allIngredients.map(x=>({...x}))
    update[index].orderQuantity++
    
    setAllIngredients(update)
  }

  function decrement(index){
    const update = allIngredients.map(x=>({...x}))
    if(update[index].orderQuantity > 0){
      update[index].orderQuantity--
      setAllIngredients(update)
    }

  }
  
  function Add(){
    console.log(ingredient,ingredientAmount)
    const find = allIngredients.find(item=> item.name === ingredient)
    if(ingredient && ingredientAmount > 0 && !find){
      setAllIngredients([
        ...allIngredients,
        {name:ingredient,quantity:0, orderQuantity:ingredientAmount}
      ])
    }
  }

  async function submitOrder(){
    try{
      const update = allIngredients.filter(item => item.orderQuantity > 0)
      for(const item of update) item.quantity = item.orderQuantity
      console.log(update)
      const { data } = await axios.post(
        "http://localhost:4000/AddOrder",
        {
          orderer: id,
          items: update,
          type: "Chef"
        })

      if(data) getAllIngredients()
      console.log(data)

      
    }
    catch(error){
      console.log(error)
    }
  }


  return(
    role === "Chef" ?
    <>
    <Header />

      <div className="ingredients-container">
        <div className="ingredients-item"><b>Ingredient Name:</b></div>
        <div className="ingredients-item"><b>Stock:</b></div>
        <div className="ingredients-item"><b># in Order:</b></div>
        {allIngredients?.map((element, index) => (
            <React.Fragment key={element.key}>
            <div className="ingredients-item"> {element.name} </div>
            <div className="ingredients-item"> {element.quantity} </div>
            <div className="ingredients-item"> {element.orderQuantity}
              <button title="+" className="inc" onClick={()=>increment(index)}>+</button>
              <button title="-" className="inc" onClick={()=> decrement(index)}>-</button>
            </div>
            </ React.Fragment>
        ))}
        <div className="ingredients-item">
        <textarea rows="1" className="textBox" title="ingredient name" onChange={(e)=>setIngredient(e.target.value.toLowerCase().trim())}></textarea>
          </div>
          <div className="ingredients-item">
        <textarea rows="1" cols={2} maxLength={4} className="textBox" title="ingredient quantity" onChange={(e)=>setIngredientAmount(e.target.value.trim())}></textarea>
          </div>

          <div className="ingredients-item">
          <button title="+" className="btn" onClick={()=>{Add()}} >Add to Order</button>
          </div>

          <div className="ingredients-item" />


          <div className="ingredients-item">
          <button className="btn" onClick={()=>submitOrder()}>Submit Order</button>
          </div>
          
      </div>
      
    </>
    :
    <Navigate to="/" />
  )


}