"use client";
import { useEffect, useState } from "react";
import TodoItem, { TodoItemProps } from "./TodoItem";
import Link from "next/link";

type PexelsComponentProps = {
  todos: TodoItemProps[];
};

export default function PexelsComponent({ todos }: PexelsComponentProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImageUrls = await Promise.all(
          todos.map(async (todo) => {
            // Use todo.title or todo.id to fetch images, adjust the API call as needed
            const query = todo.title;
            const apiKey =
              "ts8cgI6aSpYKCoRNECR60uERebf6uF85pLW5DZgyKSgDgTOhKyeL40g5";
            const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

            const response = await fetch(apiUrl, {
              headers: {
                Authorization: apiKey,
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch images");
            }

            const data = await response.json();
            return data.photos[0]?.src?.medium ?? "";
          })
        );
        setImageUrls(fetchedImageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (todos.length > 0) {
      fetchImages();
    }
  }, [todos]);

  return (
    <div className="flex flex-wrap">
      {imageUrls.map((imageUrl, index) => (
        <Link key={todos[index].id} href={`/recipes/${todos[index].id}?title=${encodeURIComponent(todos[index].title)}`}>
        <TodoItem
          key={todos[index].id}
          id={todos[index].id}
          title={todos[index].title}
          complete={todos[index].complete}
          toggleTodo={() => {}} // Dummy toggleTodo function
          imageUrl={imageUrl}
          recipe={todos[index]} // Pass the merged todo as recipe prop
        />
      </Link>
      ))}
    </div>
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
