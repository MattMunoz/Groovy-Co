import React, { useState } from "react";
import { Header } from "../Components/Header";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../Global/userState";

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
  const [img, setImg] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <h1>Add Dish</h1>
      <form
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
            </div>
          </div>
        </div>
        <div style={{ flexDirection: "column" }}>
          <div>
            =<h3>Name:</h3>
            <input type="text" />
          </div>
          <div>
            <h3>Ingerdients:</h3>
            <input type="text" />
          </div>
          <div>
            <h3>Ingerdients:</h3>
            <input type="number" min={1} max={50} />
          </div>
        </div>
      </form>
    </div>
  );
}
