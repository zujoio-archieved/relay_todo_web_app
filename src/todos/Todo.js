import React from "react";
// import { View, Text, Button } from 'react-native'
import { ConnectionHandler } from "relay-runtime";
import { useMutation } from "relay-hooks";
import graphql from "babel-plugin-relay/macro";
import { Color } from "../utils/color";
const Delete = ({ color, onClick, style }) => {
  return (
    <svg
      onClick={onClick}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      height="25"
      width="25"
      style={style}
    >
      <circle style={{ fill: color }} cx="256" cy="256" r="256" />
      <path
        style={{ fill: color }}
        d="M510.28,285.304L367.912,142.936L150.248,368.608l140.928,140.928  C406.352,493.696,497.056,401.288,510.28,285.304z"
      />
      <g>
        <path
          style={{ fill: "#FFFFFF" }}
          d="M354.376,371.536c-5.12,0-10.232-1.952-14.144-5.856L146.408,171.848   c-7.816-7.816-7.816-20.472,0-28.28s20.472-7.816,28.28,0L368.52,337.4c7.816,7.816,7.816,20.472,0,28.28   C364.608,369.584,359.496,371.536,354.376,371.536z"
        />
        <path
          style={{ fill: "#FFFFFF" }}
          d="M160.544,371.536c-5.12,0-10.232-1.952-14.144-5.856c-7.816-7.816-7.816-20.472,0-28.28   l193.832-193.832c7.816-7.816,20.472-7.816,28.28,0s7.816,20.472,0,28.28L174.688,365.68   C170.784,369.584,165.664,371.536,160.544,371.536z"
        />
      </g>
    </svg>
  );
};
const Uncompleted = ({ color, onClick }) => {
  return (
    <svg
      onClick={onClick}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
      height="25"
      width="25"
      style={{ fill: color }}
    >
      <path
        d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
	S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
      />
    </svg>
  );
};
const Completed = ({ color, onClick }) => {
  return (
    <svg
      onClick={onClick}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      height="25"
      width="25"
      viewBox="0 0 50 50"
      style={{ fill: color }}
    >
      <circle style={{ fill: color }} cx="25" cy="25" r="25" />
      <polyline
        style={{
          fill: "none",
          stroke: "#FFFFFF",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
          points: "38,15 22,33 12,25 "
        }}
        points="38,15 22,33 12,25 "
      />
    </svg>
  );
};
const Todo = props => {
  const [editMutate, { loading: editTodoLoading }] = useMutation(
    graphql`
      mutation TodoEditMutation($input: editTodoInput!) {
        editTodo(input: $input) {
          status
          message
          clientMutationId
        }
      }
    `
  );

  const [deleteMutate, { loading: deleteTodoLoading }] = useMutation(
    graphql`
      mutation TodoDeleteMutation($input: deleteTodoInput!) {
        deleteTodo(input: $input) {
          status
          message
          clientMutationId
        }
      }
    `
  );

  const editTodoMutation = (id, completed) => {
    const sharedUpdater = store => {
      store.get(id).setValue(completed, "completed");
    };
    editMutate({
      variables: {
        input: {
          id,
          completed
        }
      },
      optimisticUpdater: sharedUpdater,
      updater: store => {
        const status = store.getRootField("editTodo").getValue("status");
        if (status === "SUCCESS") {
          sharedUpdater(store);
        }
      }
    });
  };

  const deleteTodoMutation = id => {
    const sharedUpdater = store => {
      const viewerProxy = store.get(props.viewerId);
      const todos = ConnectionHandler.getConnection(
        viewerProxy,
        "TodoPagination_todos"
      );
      ConnectionHandler.deleteNode(todos, id);
    };
    deleteMutate({
      variables: { input: { id } },
      optimisticUpdater: sharedUpdater,
      updater: store => {
        const status = store.getRootField("deleteTodo").getValue("status");
        if (status === "SUCCESS") {
          sharedUpdater(store);
        }
      }
    });
  };



  return (
    <div
      style={{
        flexDirection: "row",
        // width: "34%",
        // marginLeft: "34%",
        marginTop: 20,
      
      }}
    >
      {props.item.node.completed ? (
        <Completed
          onClick={() => {
            editTodoMutation(props.item.node.id, !props.item.node.completed);
          }}
          color={Color.PRIMARY}
        />
      ) : (
        <Uncompleted
          onClick={() => {
            editTodoMutation(props.item.node.id, !props.item.node.completed);
          }}
          color={Color.PRIMARY}
        />
      )}

      <p
        style={{
          color: Color.PRIMARY,
          display: "inline",
          fontSize: 30,
          margin: 20,
          textDecorationLine: props.item.node.completed && "line-through"
        }}
      >
        {props.item.node.title}
      </p>
      <Delete
        style={{ position: "absolute", right: "33%" }}
        onClick={() => {
          deleteTodoMutation(props.item.node.id);
        }}
        color={Color.PRIMARY}
      />
    </div>
  );
};

export default Todo;
