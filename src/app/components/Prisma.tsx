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

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-bold">Recipes App</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1
   rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none
   "
          href="/new"
        >
          New Recipe
        </Link>
      </header>

      <div className="flex flex-wrap">
        {todos.map(todo => (
          <Link key={todo.id} href={`/recipes/${encodeURIComponent(todo.slug)}`}>
            {/* Pass slug instead of ID */}
            <TodoItem
              id={todo.id}
              title={todo.title}
              complete={todo.complete}
              slug={todo.slug} // Use slug instead of id
              toggleTodo={toggleTodo} // Pass toggleTodo function
              imageUrl="" // Set imageUrl to empty string initially
            />
          </Link>
        ))}
      </div>
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
