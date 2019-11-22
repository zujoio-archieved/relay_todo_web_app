import React, { useState } from "react";
import TodoList from "./TodoList";
import { Color } from "../utils/color";

const TodoContainer = props => {
  const display = {
    ALL: "ALL",
    COMPLETED: "COMPLETED",
    INCOMPLETED: "INCOMPLETED"
  };

  const [displayer, setDisplayer] = useState(display.ALL);

  const completedTodos = [];
  const inCompletedTodos = [];
  props.edges.forEach(edge => {
    if (edge.node.completed) {
      completedTodos.unshift(edge);
    } else {
      inCompletedTodos.unshift(edge);
    }
  });

  return (
    <>
      <div>
        <h1
          style={{
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            color: `${Color.PRIMARY}`
          }}
        >
          {displayer}
        </h1>
      </div>
      <TodoList
        viewerId={props.viewerId}
        edges={
          displayer === display.ALL
            ? props.edges
            : displayer === display.COMPLETED
            ? completedTodos
            : inCompletedTodos
        }
      />

      <ul
        style={{
          textAlign: "center",
          padding: 10
        }}
      >
        <li
          style={{
            display: "inline",
            borderRadius:"10px",
            marginLeft: "10px",
            border: `1px solid ${Color.PRIMARY}`,
            padding: "10px",
            color: displayer == display.ALL ? Color.PRIMARY : "black"
          }}
          onClick={() => {
            setDisplayer(display.ALL);
          }}
        >
          All
        </li>
        <li
          style={{
            display: "inline",
            marginLeft: "10px",
            borderRadius:"10px",
            border: `1px solid ${Color.PRIMARY}`,
            padding: "10px",
            color: displayer == display.COMPLETED ? Color.PRIMARY : "black"
          }}
          onClick={() => {
            setDisplayer(display.COMPLETED);
          }}
        >
          Completed
        </li>
        <li
          style={{
            display: "inline",
            borderRadius:"10px",
            marginLeft: "10px",
            border: `1px solid ${Color.PRIMARY}`,
            padding: "10px",
            color: displayer == display.INCOMPLETED ? Color.PRIMARY : "black"
          }}
          onClick={() => {
            setDisplayer(display.INCOMPLETED);
          }}
        >
          Incomplete
        </li>
      
      </ul>
    </>
  );
};

export default TodoContainer;
