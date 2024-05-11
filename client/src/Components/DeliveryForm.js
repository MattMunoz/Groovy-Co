import React, { useState } from "react";

export function DeliveryForm() {
  const margin = { marginBottom: "10px" };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();

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
      <h3>Street Address:</h3>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <h3>City:</h3>
      <input
        type="text"
        style={margin}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <h3>Zip:</h3>
      <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
    </div>
  );
}
