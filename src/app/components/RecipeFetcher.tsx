"use client";

import React, { useEffect, useState } from "react";
import PexelsComponent from "./Pexels";
import TodoItem, { TodoItemProps } from "./TodoItem";
import recipes from "../recipes.json";

type RecipeData = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
};

type RecipeFetcherProps = {
  todos: TodoItemProps[];
};

const RecipeFetcher: React.FC<RecipeFetcherProps> = ({ todos }) => {
  const [mergedTodos, setMergedTodos] = useState<TodoItemProps[]>([]);

  useEffect(() => {
    // Merge todos with corresponding recipe data
    const merged = todos.map((todo) => {
      const recipe = recipes.find((recipe) => recipe.title === todo.title);
      return {
        ...todo,
        ...recipe, // Merge recipe data into todo
        imageUrl: recipe ? todo.imageUrl : "" // Add placeholder imageUrl if recipe is not found
      };
    });
    setMergedTodos(merged);
  }, [todos]);

  return (
    <div className="flex">
      {" "}
      {/* Ensure this div has flex class */}
      <PexelsComponent todos={mergedTodos} />
    </div>
  );
};

export default RecipeFetcher;
