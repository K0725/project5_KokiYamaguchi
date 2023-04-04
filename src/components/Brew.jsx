import { useState } from "react";
import { Link } from "react-router-dom";

function Brew({ name, street, city, state, postal }) {
  return (
    <div className="BrewCard">
      <h3>{name}</h3>
      <p>
        {street}, {city}, {state} {postal}
      </p>
    </div>
  );
}

export default Brew;