// TodoItem.tsx
import React from "react";
import Link from "next/link";

export type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  imageUrl: string;
  recipe: {
    description: string;
    ingredients: string[];
    instructions: string[];
  } | undefined; // Ensure recipe can be undefined
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  complete,
  imageUrl,
  recipe,
}) => {
  return (
    <div className="relative my-6 mx-2 bg-white dark:bg-[#18191c] shadow-xl hover:shadow duration-200 rounded-l group">
        {/* Use a ternary operator to check if todoId is defined */}

        {/* Use a placeholder link if todoId is undefined */}
        <div className="relative w-full rounded-xl">
          <img
            className="rounded-l group-hover:scale-105 duration-300"
            src={imageUrl} // Set src to the imageUrl prop
            alt="card image"
            width={400} // Adjust the width as needed
            height={300} // Adjust the height as needed
          />
          <div className="absolute top-3 left-4 flex items-center space-x-2 cursor-pointer">
            <span className="p-1.5 rounded-lg bg-white flex items-center justify-center w-fit duration-200 hover:-translate-y-1">
              {/* Heart icon */}
            </span>
            <span className="p-1.5 rounded-lg bg-white flex items-center justify-center w-fit duration-200 space-x-1 hover:-translate-y-1">
              {/* Message icon */}
              <small className="text-blue-500">12</small>
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm p-4 group-hover:py-6 duration-300">
          <h1 className="text-white font-bold">{title}</h1>
          <p>{recipe.description}</p>
          {/* Display other recipe details */}
        </div>
    </div>
  );
};

export default TodoItem;
