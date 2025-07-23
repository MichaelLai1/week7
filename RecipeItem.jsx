import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ recipe }) {
  return (
    <li className="recipe-item">
      <Link to={`/recipe/${recipe.id}`}>
        <h3>{recipe.title}</h3>
      </Link>
      <img src={recipe.image} alt={recipe.title} width="150" />
      <p>Ready in {recipe.readyInMinutes} minutes</p>
      <p>Cuisines: {recipe.cuisines.join(", ") || "N/A"}</p>
    </li>
  );
}

export default RecipeItem;
