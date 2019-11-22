import React from "react";
import Todo from "./Todo";

const TodoList = props => {
  return (
    <div >
        {/* style={{ height: "200px", overflow: "scroll" }}> */}
      {props.edges.map(edge => {
        return (
          <div key={edge.node.id}>
            <Todo item={edge} viewerId={props.viewerId} />
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
