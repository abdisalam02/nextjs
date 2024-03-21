// Home.tsx
import Link from "next/link";
import prisma from "../db";
import TodoItem from "./TodoItem";
import PexelsComponent from "./Pexels";

export async function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  const todoItems = todos.map(todo => ({
    id: todo.id,
    title: todo.title,
    complete: todo.complete,
    toggleTodo: toggleTodo, // Pass toggleTodo function
    imageUrl: "" // Set imageUrl to empty string initially
  }));

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <PexelsComponent todos={todoItems} />
      </header>

      {/* Integrate PexelsComponent to display images */}
    </>
  );
}

export async function getServerSideProps() {
    const todos = await getTodos();
    return {
      props: {
        todos
      }
    };
  }
