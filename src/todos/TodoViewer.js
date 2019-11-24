import React from 'react'
import { useQuery } from 'relay-hooks'
import TodoPagination from './TodoPagination';
import graphql from 'babel-plugin-relay/macro'
import { ThemeContext } from '../themeContextDef';

const TodoViewer = () => {
  const TodoViewerQuery = graphql`
    query TodoViewerQuery($completed: Boolean, $first: Int, $cursor: String) {
      viewer {
        id
        theme {
          index
          name
          primary
          dark
          light
        }
        availableThemes {
          index
          name
          primary
          dark
          light
        }
        ...TodoPagination_user
          @arguments(completed: $completed, first: $first, cursor: $cursor)
      }
    }
  `

  const { props, error, retry, cached } = useQuery({
    query: TodoViewerQuery,
    variables: {
      first: 10,
      cursor: null,
      completed: null
    }
  });

  return props && props.viewer
    ? <ThemeContext.Provider
      value={{
        theme: props.viewer.theme,
        availableThemes: props.viewer.availableThemes
      }}>
      <TodoPagination TodoViewerQuery={TodoViewerQuery} viewer={props.viewer} />
    </ThemeContext.Provider>
    : <div>loading...</div>
}

export default TodoViewer
