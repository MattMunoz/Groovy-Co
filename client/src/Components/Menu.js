import React from "react";
import { foodData } from "../pages/MainMenu";

export function Menu() {
  const foods = foodData;
  //const pizzas = [];
  const numfoods = foods.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numfoods > 0 ? (
        <>
          <p>Delicious food curated by our two world renowned chefs.</p>

          <ul className="foods">
            {foodData.map((food) => (
              <Food foodObj={food} key={food.name} />
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
function Food({ foodObj }) {
  //if (foodObj.soldOut) return null;
  return (
    <li className={`food ${foodObj.soldOut ? "sold-out" : ""}`}>
      <img src={foodObj.photoName} alt={foodObj.name} />
      <div>
        <h3>{foodObj.name}</h3>
        <p>{foodObj.ingredients}</p>
        <span>
          {foodObj.soldOut ? (
            "SOLD OUT"
          ) : (
            <button>
              $ <strong>{foodObj.price}</strong>
            </button>
          )}
        </span>
      </div>
    </li>
  );
}
