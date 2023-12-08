"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const { id } = useParams();
  console.log("🚀 ~ file: page.tsx:7 ~ Todo ~ id:", id);
  const [todo, setTodo] = useState<any>();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(async (response) => {
        let resp = await response.json();
        setTodo(resp);
      })
      .then((json) => console.log(json));
  }, [id]);
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
