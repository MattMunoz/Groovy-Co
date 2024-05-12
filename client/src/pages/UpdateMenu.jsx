import React, { useState } from "react";
import { Header } from "../Components/Header";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../Global/userState";
import axios from "axios";

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
  const [img, setImg] = useState();
  const [selectedFile, setSelectedFile] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState(0);
  const { username } = useUserStore();
  console.log(username);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  function handleDeleteIngredient(id) {
    setingredientList((items) => items.filter((items) => items.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!ingredient) return;

    const newIngredient = { ingredient, quantity, id: Date.now() };

    setingredientList((ingredient) => [...ingredient, newIngredient]);

    setIngredient("");
    setQuantity(1);
  }

  async function Added(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/AddDish", {
        name: dishName,
        description: description,
        price: price,
        ingredients: ingredientList,
        createdBy: username,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Add Dish</h1>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "lightyellow",
          display: "flex",
        }}
      >
        <div className="app">
          <div className="parent">
            <div className="file-upload">
              <img src={"food/foodOutline.jpg"} alt="upload" />
              <h3> "Click box to upload"</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={handleFileChange} />
              <p>
                {" "}
                File Name:
                {selectedFile === null ? (
                  ""
                ) : (
                  <strong style={{ color: "black" }}>
                    {selectedFile.name}
                  </strong>
                )}
              </p>
            </div>
          </div>
        </div>
        <div style={{ flexDirection: "column", marginLeft: "20px" }}>
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
              value={ingredient}
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
              value={price}
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
          {ingredient.ingredient} {ingredient.quantity}
        </strong>
      </span>
      <button
        style={{
          marginLeft: "15px",
          marginTop: "5px",
          marginBottom: "5px",
          color: "red",
        }}
        onClick={() => onDeleteIngredient(ingredient.id)}
        className="remove"
      >
        X
      </button>
    </li>
  );
}

// name: {
//   type: String,
//   required: true,
// },
// description: {
//   type: String,
//   required: true,
// },
// price: {
//   type: Number,
//   required: true,
// },
// ingredients: [
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//   },
// ],
// rating: {
//   type: Number,
//   default: 0,
// },
// timesRated:{
//   type: Number,
//   default: 0
// },
// imageURL: {
//   type: String,
//   required: true,
// },
// createdBy: {
//   type: String,
//   required: true,
// },
// createdAt: {
//   type: Date,
//   default: new Date(),
// },
// soldOut:{
//   type: Boolean,
//   default: false
// }
// });
