"use client";
import { useEffect, useState } from "react";
import recipes from "../../recipes.json";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type RecipePageProps = {
  imageUrl: string;
};

const RecipePage = ({ imageUrl }: RecipePageProps) => {
  const searchParams = useSearchParams();
  const title = searchParams ? searchParams.get("title") : null;

  const [recipeImage, setRecipeImage] = useState("");

  useEffect(() => {
    // Check if the imageUrl is provided
    if (imageUrl) {
      // Use the provided imageUrl directly
      setRecipeImage(imageUrl);
      return;
    }

    // If imageUrl is not provided, fetch image from API based on recipe title
    const fetchImage = async () => {
      if (!title) return;

      const apiKey = "YOUR_PEXELS_API_KEY";
      const apiUrl = `https://api.pexels.com/v1/search?query=${title}&per_page=1`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch image from Pexels API");
        return;
      }

      const data = await response.json();
      const imageSrc = data.photos[0]?.src?.medium;

      if (imageSrc) {
        setRecipeImage(imageSrc);
      } else {
        console.error("No image found for the recipe");
      }
    };

    fetchImage();
  }, [title, imageUrl]);

  if (!title) {
    return <div>Loading...</div>;
  }

  const recipe = recipes.find((r) => r.title === title);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen relative text-black flex items-center justify-center">
      {/* Background image with blurred overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${recipeImage})`,
          filter: "blur(10px)", // Apply blur effect
        }}
      />
      {/* Content */}
      <div className="max-w-5xl bg-white p-8 rounded-lg shadow-md m-10 relative z-10">
        <Link
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/"
        >
          Back to Recipes
        </Link>
        <div>
          <h1 className="text-6xl font-bold mb-4 mt-10 text-center">
            {recipe.title}
          </h1>
          {/* Original recipe image */}
          <p className="mb-4 my-5 text-2xl font-bold text-center">
            {recipe.description}
          </p>
          <div
            style={{
              width: "900px", // Set width to 400px
              height: "500px", // Set height to 300px
              overflow: "hidden", // Hide any overflow
            }}
          >
            <img
              className="rounded-l group-hover:scale-105 duration-300"
              src={recipeImage} // Set src to the imageUrl prop
              alt="card image"
              style={{
                width: "100%", // Ensure image fills container width
                height: "100%", // Ensure image fills container height
                objectFit: "cover", // Maintain aspect ratio and cover container
              }}
            />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc pl-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
            <ol className="list-decimal pl-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
