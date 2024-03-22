import { useRouter } from "next/router";
import recipes from "../../app/recipes.json";

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Recipe ID: {recipe.id}</p>
      <p>Title: {recipe.title}</p>
      <p>Instructions: {recipe.instructions}</p>
      {/* Render other details of the recipe */}
    </div>
  );
};

export default RecipePage;


