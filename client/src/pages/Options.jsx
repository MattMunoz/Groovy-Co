import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { useUserStore } from "../Global/userState";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function Options(){
  const {username, id, balance, updateBalance} = useUserStore(); 
  // console.log(username, id)
  const [inputAmount, setInputAmount] = useState(0);
  const state = {submitButton: ""}

  async function balanceSubmit(e){
    e.preventDefault()
    if(state.submitButton === "deposit" && inputAmount > 0){
      try{
        const {data} = await axios.post(
          "http://localhost:4000/deposit",
          {
            id:id,
            amount: inputAmount
          }
        )
        console.log(data)
        const {user, success} = data
        if(success){
          // console.log(inputAmount+ " deposited\nNew balance: " + (balance+Number(inputAmount)))
          updateBalance(user.balance)
          toast.clearWaitingQueue();
          toast.success("$"+inputAmount+ " deposited", {position:"bottom-left",hideProgressBar:true})
          state.submitButton = "";
        }
      }
      catch(error){
        console.log(error)
      }
    }
    else if(state.submitButton === "withdraw" && inputAmount > 0){
      if((balance-inputAmount) < 0){
        console.log("You don't have enough money!")
        toast.clearWaitingQueue();
        toast.error("You don't have enough money!", {
          position: "bottom-left", hideProgressBar:true
        });
      }
      else{
        try{
          const {data} = await axios.post(
            "http://localhost:4000/withdraw",
            {
              id:id,
              amount: inputAmount
            }
          )
          console.log(data)
          const {user, success} = data
          if(success){
            // console.log(inputAmount+ " deposited\nNew balance: " + (balance+Number(inputAmount)))
            console.log(inputAmount+ " withdrawn\nNew balance: " + (balance-inputAmount))
            updateBalance(user.balance)
            toast.success("$"+inputAmount+ " withdrawn", {position:"bottom-left",hideProgressBar:true})
            state.submitButton = "";
          }
        }
        catch(error){
          console.log(error)
        }
        
      }
    }
  }

  return (
    id !== null ? 
    <div className="Options">
        <Header/>
        <form className="container" onSubmit={balanceSubmit }>
          <label>Amount</label>
          <span>$
            <input className="input" 
             pattern="^\d*(\.\d{0,2})?$" 
             title="Input a nonnegative value with at most two decimal places" 
             value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}/>
            </span>
          <button type="submit" disabled style={{disabled:true}} aria-hidden="true"></button>
          <input type="submit" value="Withdraw"  onClick={()=> state.submitButton = "withdraw"}/>
          <input type="submit" value="Deposit" onClick={()=> state.submitButton = "deposit"}/>
        </form>
        <ToastContainer limit={3} autoClose={2000} />
        <Footer />
      <div className="bar">
        <strong>Groovy Co.</strong>
      </div>
    </div> 
    :
    <Navigate to="/login" />
  );

}