"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Todos = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<[]>();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then(async (response) => {
        let resp = await response.json();
        setTodos(resp);
      })
      .then((json) => console.log(json));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        height: "400px",
        overflowY: "scroll",
        marginTop: "100px",
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        padding: "20px",
      }}
    >
      {todos?.map((item: any) => {
        return (
          <div
            style={{
              margin: "10px",
              padding: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/todos/${item.id}`)}
          >
            <div>ID : {item.id}</div>
            <div>Title : {item.title}</div>
            <div>isCompleted : {item.completed ? "true" : "false"}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
