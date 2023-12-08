"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const pathName = usePathname();

  const [todo, setTodo] = useState<any>();
  useEffect(() => {
    const id = pathName.slice(pathName.lastIndexOf("/") + 1, pathName.length);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(async (response) => {
        let resp = await response.json();
        setTodo(resp);
      })
      .then((json) => console.log(json));
  }, [pathName]);
  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div>ID : {todo?.id}</div>
      <div>Title : {todo?.title}</div>
      <div>isCompleted : {todo?.completed ? "true" : "false"}</div>
    </div>
  );
};

export default Todo;
