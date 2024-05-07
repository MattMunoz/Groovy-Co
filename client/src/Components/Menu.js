import React from "react";
import { useState } from "react";

export function Menu({ onAddItems }) {
  const foods = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "food/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "food/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "food/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "food/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "food/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "food/prosciutto.jpg",
      soldOut: false,
    },
  ];
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
              <Food foodObj={food} addItems={onAddItems} key={food.name} />
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
  const [quantity, setQuantity] = useState(1);

  function handleClick(e) {
    e.preventDefault();

    const price = foodObj.price * quantity;

    const orderItem = { name, price, quantity };

    addItems(orderItem);
  }

  return (
    <li className={`food ${foodObj.soldOut ? "sold-out" : ""}`}>
      <img src={foodObj.photoName} alt={foodObj.name} />
      <div>
        <h3>{foodObj.name}</h3>
        <p>{foodObj.ingredients}</p>
        <span className="btnRating">
          {foodObj.soldOut ? (
            "SOLD OUT"
          ) : (
            <button onClick={handleClick}>
              $ <strong>{foodObj.price}</strong>
            </button>
          )}
          {foodObj.soldOut ? (
            <div></div>
          ) : (
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ textAlign: "auto" }}
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
  );
}
