import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function Ingredients() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [allIngredients, setAllIngredients] = useState();

  useEffect(() => {
    async function getAllIngredients() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/GetAllIngredients"
        );
        setAllIngredients(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    getAllIngredients();
    // console.log(allIngredients)
  }, []);
  const state = { submitButton: "" };

  async function ingredientSubmit(e) {
    e.preventDefault();
    if (state.submitButton === "add") {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/AddIngredient",
          {
            name: ingredient.toLowerCase().trim(),
            quantity: ingredientAmount,
          }
        );
        // console.log(data);
        let found = false;
        const newIngredients = allIngredients.map((item) => {
          if (item.name === ingredient) {
            found = true;
            return {
              ...item,
              quantity: Number(item.quantity) + Number(ingredientAmount),
            };
          } else return item;
        });
        if (!found) {
          setAllIngredients([
            ...allIngredients,
            { name: ingredient, quantity: Number(ingredientAmount) },
          ]);
        } else setAllIngredients(newIngredients);
        // console.log(allIngredients);
      } catch (error) {
        console.log(error);
      }
    } else if (state.submitButton === "subtract") {
      try {
        let item = undefined;
        allIngredients.forEach((element) => {
          if (element.name === ingredient) item = element;
        });

        if (item) {
          if (item.quantity >= ingredientAmount) {
            const { data } = await axios.post(
              "http://localhost:4000/RemoveIngredient",
              {
                name: ingredient.toLowerCase().trim(),
                quantity: ingredientAmount,
              }
            );
            const newIngredients = allIngredients.map((item) => {
              if (item.name === ingredient) {
                return {
                  ...item,
                  quantity: Number(item.quantity) - Number(ingredientAmount),
                };
              } else return item;
            });

            setAllIngredients(newIngredients);

            // console.log(data);
          } else {
            toast.clearWaitingQueue();
            toast.error("There isn't enough of that ingredient!", {
              position: "bottom-left",
              hideProgressBar: true,
            });
          }
        } else {
          toast.clearWaitingQueue();
          toast.error("That ingredient is not on the list", {
            position: "bottom-left",
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <form className="container" onSubmit={ingredientSubmit}>
        <label>Ingredient</label>
        <input
          className="textBox"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <label>Quantity</label>
        <input
          className="textBox"
          pattern="^[1-9][0-9]*$"
          title="Input an integer greater than 0"
          value={ingredientAmount}
          onChange={(e) => setIngredientAmount(e.target.value)}
        />
        <input
          type="submit"
          value="Add"
          onClick={() => (state.submitButton = "add")}
        />
        <input
          type="submit"
          value="Subtract"
          onClick={() => (state.submitButton = "subtract")}
        />
      </form>
      <br />
      <div className="ingredients-container">
        {allIngredients?.map((element) => (
          <div key={element.name}>
            <div className="ingredients-item"> {element.name} </div>
            <div className="ingredients-item"> {element.quantity} </div>
          </div>
        ))}
      </div>
    </div>
  );
}
