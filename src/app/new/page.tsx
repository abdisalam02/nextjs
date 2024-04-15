import Link from "next/link";
import prisma from "../db";
import { redirect } from "next/navigation";


async function createTodo(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf()
    if(typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid title")
    }

    await prisma.todo.create({data: {title, complete: false}})
    redirect("/")

}

export default function New() {
    return (
      <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-bold">New Recipe</h1>
        
      </header>
      <form className="flex gap-2 flex-col" action={createTodo}>¨
      <input type="text" 
      name="title"
      className="border border-slate-300 bg-transparent rounded 
      px-2 py-1 outline-none focus-within:border-slate-100"
      />
      <div className="flex justify-end gap-1">
        <Link href=".."
        className="border border-slate-300 text-slate-300 px-2 py-1
        rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none
        "
        >Cancel</Link>
        <button className="border border-slate-300 text-slate-300 px-2 py-1
        rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none
        "
        >Add</button>
      </div>
      </form>
      </>
    )
}