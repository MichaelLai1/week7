import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import RecipeList from "./RecipeList";
import SummaryStats from "./SummaryStats";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await res.json();
      setRecipes(data.results);
      setFiltered(data.results);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    let temp = [...recipes];

    if (search) {
      temp = temp.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisine !== "All") {
      temp = temp.filter((r) => r.cuisines.includes(cuisine));
    }

    setFiltered(temp);
  }, [search, cuisine, recipes]);

  return (
    <div className="App">
      <h1>Recipe Dashboard</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <Filter cuisine={cuisine} setCuisine={setCuisine} />
      <SummaryStats data={filtered} />
      <RecipeList recipes={filtered} />
    </div>
  );
}

export default Dashboard;
