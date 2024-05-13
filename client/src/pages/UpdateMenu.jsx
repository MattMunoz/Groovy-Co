import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../Global/userState";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateMenu() {
  const { role } = useUserStore();
  return role === "Chef" ? (
    <div>
      <Header />
      <Add />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

function Add() {
  const [ingredientList, setingredientList] = useState([]);
  const [img, setImg] = useState("");
  const [name, setIngredient] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishPrice, setPrice] = useState(0);
  const { id } = useUserStore();
  const [foods, setFoods] = useState([]);
  console.log(id);

  function handleDeleteIngredient(id) {
    setingredientList((items) => items.filter((items) => items.name !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newIngredient = { name, quantity };

    setingredientList((name) => [...name, newIngredient]);

    setIngredient("");
    setQuantity(1);
  }

  console.log(ingredientList);

  async function Added(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/AddDish", {
        name: dishName,
        description: description,
        ingredients: ingredientList,
        price: dishPrice,
        imageURL: img,
        createdBy: id,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setingredientList([]);
    setImg("");
    setDescription("");
    setDishName("");
    setPrice(0);
  }

  useEffect(() => {
    fetch("http://localhost:4000/GetAllDishes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFoods(data.dishes);
      });
  }, []);

  async function handelRemoveded(e) {
    try {
      const { data } = await axios.post("http://localhost:4000/RemoveDish", {
        id: e,
      });
      
      if (success) {
        toast.success(`Dish Removed`, {
          position: "bottom-left",
          hideProgressBar: true,
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    <ToastContainer />;
  }

  console.log(foods);

  console.log(dishName);
  console.log(description);
  console.log(ingredientList);
  console.log(img);
  console.log(dishPrice);
  console.log(id);

  return (
    <div>
      <h1>Add Dish</h1>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "lightyellow",
        }}
      >
        <h3>Image URL</h3>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <div style={{ marginTop: "15px" }}></div>
        {img === "" ? (
          ""
        ) : (
          <img src={img} alt={dishName} style={{ width: "12rem" }} />
        )}
        <div>
          <div>
            <h3>Name:</h3>
            <input
              type="text"
              style={{
                width: "500px",
                height: "30px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </div>
          <h3>Description:</h3>
          <textarea
            style={{ width: "500px", height: "30px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <form onSubmit={handleSubmit}>
            <h3>Ingredients:</h3>
            <input
              type="text"
              placeholder="Ingredient..."
              value={name}
              onChange={(e) => setIngredient(e.target.value)}
              style={{ width: "420px", height: "30px" }}
            />
            <select
              style={{ marginLeft: "5px" }}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
            <button style={{ marginLeft: "5px" }}>Add</button>
          </form>
          <IngredientList
            ingredientList={ingredientList}
            deleteIngredient={handleDeleteIngredient}
          />
          <div>
            <h3>Price:</h3>
            <input
              type="number"
              min={1}
              max={25}
              value={dishPrice}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <button
        className="btn"
        style={{ marginTop: "20px", marginLeft: "600px" }}
        onClick={Added}
      >
        Submit Dish
      </button>
      <RemoveDish foods={foods} removed={handelRemoveded} />
      <div className="bar" style={{ marginTop: "50px" }}>
        <strong>Groovy Co.</strong>
      </div>
    </div>
  );
}

function RemoveDish({ foods, removed }) {
  return (
    <main className="menu">
      <div style={{ marginTop: "30px" }}>
        <h1>Menu</h1>
        <ul className="foods">
          {foods.map((food) => (
            <Food foodObj={food} key={food._id} removed={removed} />
          ))}
        </ul>
      </div>
    </main>
  );
}

function Food({ foodObj, removed }) {
  console.log(foodObj._id);
  return (
    <div style={{ pb: "5%" }}>
      <li className={`food`}>
        <img src={foodObj.imageURL} alt={foodObj.name} />
        <div>
          <h3>{foodObj.name}</h3>
          <p>{foodObj.description}</p>
          <span>
            <button type="button" onClick={() => removed(foodObj._id)}>
              <strong>Remove</strong>
            </button>
          </span>
        </div>
      </li>
      <div className="star"></div>
    </div>
  );
}

function IngredientList({ ingredientList, deleteIngredient }) {
  return (
    <ul>
      {ingredientList.map((ingredient) => (
        <Ingredient
          ingredient={ingredient}
          ingredientList={ingredientList}
          onDeleteIngredient={deleteIngredient}
          key={ingredientList.ingredient}
        />
      ))}
    </ul>
  );
}

function Ingredient({ ingredient, onDeleteIngredient }) {
  return (
    <li style={{ listStyleType: "none" }}>
      <span>
        <strong style={{ fontSize: "15px" }}>
          {ingredient.name} {ingredient.quantity}
        </strong>
      </span>
      <button
        style={{
          marginLeft: "15px",
          marginTop: "5px",
          marginBottom: "5px",
          color: "red",
        }}
        onClick={() => onDeleteIngredient(ingredient.name)}
        className="remove"
      >
        X
      </button>
    </li>
  );
}
