// Home.tsx
import React from "react";
import prisma from "../db";
import PexelsComponent from "./Pexels";
import recipes from "../recipes.json";
import Link from "next/link";
import RecipeFetcher from "./RecipeFetcher";

export async function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"; // Ensure this function runs on the server
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Prisma() {
  const todos = await getTodos();

  const filteredTodos = todos.map(({ id, title, complete }) => ({
    id,
    title,
    description: "", // Add a placeholder description
    ingredients: [], // Add a placeholder ingredients array
    instructions: [], // Add a placeholder instructions array
    complete, // Add the complete status
    toggleTodo: toggleTodo, // Add the toggleTodo function
    imageUrl: "", // Add a placeholder image URL
    recipe: undefined, // Add a null recipe since it's not fetched yet
  }));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-slate-800 p-4 shadow-md">
        <h1 className="text-3xl font-bold">Recipes App</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New Recipe
        </Link>
      </header>

      <div className="flex flex-wrap justify-center mt-16">
        <RecipeFetcher todos={filteredTodos} />
      </div>
    </>
  );
}
