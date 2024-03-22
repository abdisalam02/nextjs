"use client";

import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";

export type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  slug: string;
  imageUrl: string; // imageUrl prop added
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  complete,
  toggleTodo,
  slug,
  imageUrl, // imageUrl prop added
}) => {
  return (
      <div className="relative my-6 mx-2 bg-white dark:bg-[#18191c] shadow-xl hover:shadow duration-200 rounded-l group">
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
              <BsHeartFill className="text-sm text-red-500" />
            </span>
            <span className="p-1.5 rounded-lg bg-white flex items-center justify-center w-fit duration-200 space-x-1 hover:-translate-y-1">
              <RiMessage3Fill className="text-sm text-blue-500" />
              <small className="text-blue-500">12</small>
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm p-4 group-hover:py-6 duration-300">
          <h5 className="text-black font-medium text-sm">{title}</h5>
          <small className="text-xs font-light text-primary">
            Do you want to participate?
          </small>
        </div>
      </div>
  );
};

export default TodoItem;
