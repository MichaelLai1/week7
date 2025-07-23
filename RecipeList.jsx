import React from "react";
import RecipeItem from "./RecipeItem";

function RecipeList({ recipes }) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  );
}

export default RecipeList;
