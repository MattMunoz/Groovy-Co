import React from "react";
import { useState } from "react";
import { StarRating } from "./StarRating";
import { useUserStore } from "../Global/userState";
import axios from "axios";

export function Menu({ onAddItems, foods }) {
  // const foods = [
  //   {
  //     name: "Focaccia",
  //     ingredients: "Bread with italian olive oil and rosemary",
  //     price: 6,
  //     photoName: "food/focaccia.jpg",
  //     soldOut: false,
  //   },
  //   {
  //     name: "Pizza Margherita",
  //     ingredients: "Tomato and mozarella",
  //     price: 10,
  //     photoName: "food/margherita.jpg",
  //     soldOut: false,
  //   },
  //   {
  //     name: "Pizza Spinaci",
  //     ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
  //     price: 12,
  //     photoName: "food/spinaci.jpg",
  //     soldOut: false,
  //   },
  //   {
  //     name: "Pizza Funghi",
  //     ingredients: "Tomato, mozarella, mushrooms, and onion",
  //     price: 12,
  //     photoName: "food/funghi.jpg",
  //     soldOut: false,
  //   },
  //   {
  //     name: "Pizza Salamino",
  //     ingredients: "Tomato, mozarella, and pepperoni",
  //     price: 15,
  //     photoName: "food/salamino.jpg",
  //     soldOut: true,
  //   },
  //   {
  //     name: "Pizza Prosciutto",
  //     ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
  //     price: 18,
  //     photoName: "food/prosciutto.jpg",
  //     soldOut: false,
  //   },
  // ];

  //const pizzas = [];
  const numfoods = foods.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numfoods > 0 ? (
        <>
          <p>Delicious food curated by our two world renowned chefs.</p>
          <ul className="foods">
            {foods.map((food) => (
              <Food foodObj={food} addItems={onAddItems} key={food._id} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're working on our menu. Please come back later.</p>
      )}

      {/*<food
                    name="food Spinaci"
                    ingredients="Tomato, mozarella, spinach, and ricotta cheese"
                    photoName="foods/spinaci.jpg"
                    price={10}
                  />
                  <food
                    name="food Funghi"
                    ingredients="Tomato, mozarella, mushrooms, red onions"
                    photoName="foods/funghi.jpg"
                    price={12}
                  />*/}
    </main>
  );
}

function Food({ foodObj, addItems }) {
  //if (foodObj.soldOut) return null;

  const name = foodObj.name;
  const price = foodObj.price;
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const { role } = useUserStore();

  function Rating(rate) {
    setUserRating(rate);
    console.log(userRating);
  }

  function handleClick(e) {
    e.preventDefault();

    const orderItem = { name, price, quantity };
    console.log(orderItem);

    addItems(orderItem);
  }

  async function Revieweded(e) {
    try {
      const { data } = await axios.post("http://localhost:4000/RateDish", {
        id: foodObj._id,
        rating: e,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(foodObj.rating);

  return (
    <div style={{ pb: "5%" }}>
      <li className={`food`}>
        <img src={foodObj.imageURL} alt={foodObj.name} />
        <div>
          <h3>{foodObj.name}</h3>
          <p>{foodObj.description}</p>
          <span className="btnRating">
            <button type="button" onClick={handleClick}>
              $ <strong>{foodObj.price}</strong>
            </button>
            {role === null ? (
              <div />
            ) : (
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ textAlign: "auto" }}
                className="hide-arrow"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            )}
          </span>
        </div>
      </li>
      <div className="star">
        <StarRating
          size={25}
          onSetRating={Revieweded}
          defaultRating={foodObj.rating}
        />
      </div>
    </div>
  );
}
/*display dabase rating as deafult in starRating*/
