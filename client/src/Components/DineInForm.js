import React, { useState } from "react";

export function DineInForm() {
  const [pickupTime, setPickupTime] = useState();
  const [where, setWhere] = useState("Indoor");
  const margin = { marginBottom: "10px" };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const date = new Date();
  const minTime = date.getHours() * 60;
  const maxMinutes = 1260;
  const interval = 15;

  const options = [];
  for (let i = Number(minTime) + 60; i <= maxMinutes; i += interval) {
    const hours = Math.floor(i / 60) - 12;
    const minutes = i % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    options.push(
      <option value={formattedTime} key={formattedTime}>
        {formattedTime}
      </option>
    );
  }

  console.log(pickupTime);

  return (
    <div className="placeorder">
      <h3>Name:</h3>
      <input
        type="text"
        style={margin}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>Email:</h3>
      <input
        type="text"
        style={margin}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <h3 style={{ marginLeft: "160px" }}>Pickup Time:</h3>
            <input
              type="text"
              style={{ width: "150px", marginLeft: "160px" }}
              placeholder={time}
            /> */}
      <div style={{ display: "flex" }}>
        <h3 style={{ marginLeft: "160px" }}>Pickup Time:</h3>
        <select
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          style={{ textAlign: "auto", marginLeft: "5px" }}
        >
          {options}
        </select>
      </div>
      <div style={{ marginLeft: "200px", marginTop: "10px" }}>
        <select value={where} onChange={(e) => setWhere(e.target.value)}>
          <option>Indoor</option>
          <option>Outdoor</option>
        </select>
      </div>
    </div>
  );
}
