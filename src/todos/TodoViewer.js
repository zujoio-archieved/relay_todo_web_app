import React from 'react'
// import { View, Text, ActivityIndicator } from 'react-native'
import { useQuery } from 'relay-hooks'
import TodoPagination from './TodoPagination';
import graphql from 'babel-plugin-relay/macro'

const TodoViewer = () => {
  const TodoViewerQuery = graphql`
    query TodoViewerQuery($completed: Boolean, $first: Int, $cursor: String) {
      viewer {
        id
        ...TodoPagination_user
          @arguments(completed: $completed, first: $first, cursor: $cursor)
      }
    }
  `

  const { props, error, retry, cached } = useQuery({
    query: TodoViewerQuery,
    variables: {
      first: 3,
      cursor: null,
      completed: null
    }
  });

  return props && props.viewer
    ? <TodoPagination TodoViewerQuery={TodoViewerQuery} viewer={props.viewer} />
    : <div>loading...</div>
}

export default TodoViewer
