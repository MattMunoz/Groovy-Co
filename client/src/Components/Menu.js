import React from "react";

export function Menu() {
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
