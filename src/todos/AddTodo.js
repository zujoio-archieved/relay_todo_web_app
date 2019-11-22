import React, { useState } from "react";
// import { View, Text, TextInput } from 'react-native'
import { useMutation } from "relay-hooks";
import { ConnectionHandler } from "relay-runtime";
import graphql from "babel-plugin-relay/macro";
import { Color } from "../utils/color";
// import uuid from "uuid"

const AddTodo = props => {
  const [title, setTitle] = useState("");

  const [mutate, { loading }] = useMutation(graphql`
    mutation AddTodoMutation($input: createTodoInput!) {
      createTodo(input: $input) {
        status
        message
        todoEdge {
          cursor
          node {
            id
            title
            completed
          }
        }
        clientMutationId
      }
    }
  `);

  const addTodo = () => {
    if (title.length !== 0) {
      const sharedUpdater = (store, viewerId, newEdge) => {
        const viewerProxy = store.get(viewerId);
        const todos = ConnectionHandler.getConnection(
          viewerProxy,
          "TodoPagination_todos"
        );
        ConnectionHandler.insertEdgeBefore(todos, newEdge);
      };

      let tempID = 0;

      mutate({
        variables: {
          input: {
            title,
            clientMutationId: `${tempID++}`
          }
        },
        optimisticUpdater: store => {
          const id = "client:newTodo:" + tempID++;
          const node = store.create(id, "Todo");
          node.setValue(title, "title");
          node.setValue(false, "completed");
          node.setValue(id, "id");
          const newEdge = store.create(
            "client:newEdge:" + tempID++,
            "TodoEdge"
          );
          newEdge.setLinkedRecord(node, "node");
          sharedUpdater(store, props.viewerId, newEdge);
        },
        updater: store => {
          const createTodo = store.getRootField("createTodo");
          const status = createTodo.getValue("status");
          if (status === "SUCCESS") {
            const viewerProxy = store.get(props.viewerId);
            const newEdge = createTodo.getLinkedRecord("todoEdge");
            const id = newEdge.getLinkedRecord("node").getValue("id");
            const todos = ConnectionHandler.getConnection(
              viewerProxy,
              "TodoPagination_todos"
            );
            const todoExists = todos.getLinkedRecords("edges").find(edge => {
              return edge.getLinkedRecord("node").getValue("id") === id;
            });
            if (!todoExists) {
              sharedUpdater(store, props.viewerId, newEdge);
            }
          }
        },
        onCompleted: () => {
          setTitle("");
        }
      });
    }
  };

  return (
    <div style={{textAlign:"center"}}>
      <h1
        style={{
          width: "100%",
          fontSize: "80px",
          fontWeight: "bold",
          textAlign: "center",
          color: `${Color.PRIMARY}`
        }}
      >
     Todos
      </h1>

      <input
        style={{
          color: `${Color.PRIMARY}`,
          position: "relative",
          lineHeight: 2,
          padding: 10,
          width: "400px",
          marginTop: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.003)",
          border: `1px solid ${Color.PRIMARY}`
        }}
        placeholder="Add Todo"
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
        onKeyUp={e => {
          e.keyCode === 13 && addTodo();
        }}
        disabled={loading}
      />
    </div>
  );
};

export default AddTodo;
