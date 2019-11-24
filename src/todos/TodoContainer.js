import React, { useState } from "react";
import TodoList from "./TodoList";
import { Color } from "../utils/color";
import { useThemeContext } from "../themeContextDef";

const TodoContainer = props => {
  const display = {
    ALL: "ALL",
    COMPLETED: "COMPLETED",
    INCOMPLETED: "INCOMPLETED"
  };
  const { theme } = useThemeContext()

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
    // <div style={{backgroundColor:"yellow",  width: "30%",
    // marginLeft: "34%",}}>
    <div>
      <div>
        <h1
          style={{
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            color: `${theme.primary}`
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
      <div style={{ textAlign: "center" }}>
        <input
          onClick={() => props._loadMore()}
          type="button"
          style={{
            display: "inline",
            borderRadius: "10px",
            marginLeft: "10px",
            border: `1px solid ${theme.primary}`,
            padding: "10px",
            color: displayer == display.ALL ? theme.primary : "black"
          }}
          value="Load More"
        />
      </div>
      <ul
        style={{
          textAlign: "center",
          padding: 10
        }}
      >
        <li
          style={{
            display: "inline",
            borderRadius: "10px",
            marginLeft: "10px",
            border: `1px solid ${theme.primary}`,
            padding: "10px",
            color: displayer == display.ALL ? theme.primary : "black"
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
            borderRadius: "10px",
            border: `1px solid ${theme.primary}`,
            padding: "10px",
            color: displayer == display.COMPLETED ? theme.primary : "black"
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
            borderRadius: "10px",
            marginLeft: "10px",
            border: `1px solid ${theme.primary}`,
            padding: "10px",
            color: displayer == display.INCOMPLETED ? theme.primary : "black"
          }}
          onClick={() => {
            setDisplayer(display.INCOMPLETED);
          }}
        >
          Incomplete
        </li>
      </ul>
    </div>
  );
};

export default TodoContainer;
