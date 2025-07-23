import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await res.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <Link to="/">← Back to Dashboard</Link>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} width="300" />
      <p><strong>Ready In:</strong> {recipe.readyInMinutes} minutes</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Summary:</strong> <span dangerouslySetInnerHTML={{ __html: recipe.summary }} /></p>
      <h3>Instructions</h3>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
}

export default RecipeDetail;
