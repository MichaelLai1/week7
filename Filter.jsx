import React from "react";

function Filter({ cuisine, setCuisine }) {
  const cuisines = ["All", "Italian", "Mexican", "Chinese", "American", "Thai"];

  return (
    <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
      {cuisines.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

export default Filter;
