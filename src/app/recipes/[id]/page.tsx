"use client";
import { useRouter } from "next/router";
import recipes from "../../recipes.json";

const RecipePage = () => {
  const router = useRouter();
  const { title } = router.query || {}; // Use optional chaining to handle undefined router.query

  if (!title) {
    return <div>Loading...</div>;
  }

  const recipe = recipes.find((r) => r.title === title);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Title: {recipe.title}</p>
      <p>Description: {recipe.description}</p>
      <p>Ingredients: {recipe.ingredients.join(", ")}</p>
      <p>Instructions:</p>
      <ul>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      {/* Render other details of the recipe */}
    </div>
  );
};

export default RecipePage;
