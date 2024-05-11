import { Header } from "../Components/Header";
import { useUserStore } from "../Global/userState";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Ingredients from "../Components/Ingredients";

export default function Options() {
  const { id, balance, updateBalance, role } = useUserStore();
  // console.log(username, id)
  const [inputAmount, setInputAmount] = useState(0);
  const state = { submitButton: "" };

  async function balanceSubmit(e) {
    e.preventDefault();
    if (state.submitButton === "deposit" && inputAmount > 0) {
      try {
        const { data } = await axios.post("http://localhost:4000/deposit", {
          id: id,
          amount: inputAmount,
        });
        console.log(data);
        const { user, success } = data;
        if (success) {
          // console.log(inputAmount+ " deposited\nNew balance: " + (balance+Number(inputAmount)))
          updateBalance(user.balance);
          toast.clearWaitingQueue();
          toast.success(`$ ${inputAmount} deposited`, {
            position: "bottom-left",
            hideProgressBar: true,
          });
          state.submitButton = "";
          setInputAmount(0);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (state.submitButton === "withdraw" && inputAmount > 0) {
      if (balance - inputAmount < 0) {
        console.log("You don't have enough money!");
        toast.clearWaitingQueue();
        toast.error("You don't have enough money!", {
          position: "bottom-left",
          hideProgressBar: true,
        });
      } else {
        try {
          const { data } = await axios.post("http://localhost:4000/withdraw", {
            id: id,
            amount: inputAmount,
          });
          console.log(data);
          const { user, success } = data;
          if (success) {
            // console.log(inputAmount+ " deposited\nNew balance: " + (balance+Number(inputAmount)))
            console.log(
              `${inputAmount} withdrawn\nNew balance: ${balance - inputAmount}`
            );
            updateBalance(user.balance);
            toast.success(`$ ${inputAmount} withdrawn`, {
              position: "bottom-left",
              hideProgressBar: true,
            });
            state.submitButton = "";
            setInputAmount(0);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return id !== null ? (
    <div>
      <Header />
      <form className="container" onSubmit={balanceSubmit}>
        <label>Amount</label>
        <span>
          $
          <input
            className="input"
            pattern="^\d*(\.\d{0,2})?$"
            title="Input a nonnegative value with at most two decimal places"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
        </span>
        <button type="submit" disabled style={{ disabled: true }} />
        <input
          type="submit"
          value="Withdraw"
          onClick={() => {
            state.submitButton = "withdraw";
          }}
        />
        <input
          type="submit"
          value="Deposit"
          onClick={() => {
            state.submitButton = "deposit";
          }}
        />
      </form>
      <br />
      <div style={{ marginTop: "50px", marginLeft: "350px" }}>
        {role === "Chef" ? (
          <Link
            className="btn"
            to={"/UpdateMenu"}
            style={{ textDecoration: "none" }}
          >
            UpdateMenu
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      {/* {role === "Chef" ? (
        <div>
          You are chef
          <Ingredients />
        </div>
      ) : (
        <div>You are not chef</div>
      )} */}

      <ToastContainer limit={3} autoClose={2000} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
