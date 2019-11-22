import React from 'react'
import { usePagination } from 'relay-hooks'
import graphql from 'babel-plugin-relay/macro'
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoCreatedSubscription from './subscriptions/TodoCreatedSubscription';
import { useEnvironmentContext } from '../environmentContextDef';
import TodoEditedSubscription from './subscriptions/TodoEditedSubscription';
import TodoDeletedSubscription from './subscriptions/TodoDeletedSubscription';
import CompletedTodosDeletedSubscription from './subscriptions/CompletedTodosDeletedSubscription';
import TodoContainer from './TodoContainer';

const TodoPagination = (props) => {
    const fragmentSpec = graphql`
    fragment TodoPagination_user on User
    @argumentDefinitions(
        completed: { type: "Boolean" }
        first: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
    ) {
        todos( after: $cursor, first: $first, completed:$completed)
        @connection(
            key: "TodoPagination_todos"
            filters: []
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    id
                    title
                    completed
                }
            }
        }
    }`;

    const connectionConfig = {
        getVariables(props, { cursor }, fragmentVariables, options) {
            return {
                cursor,
                completed: fragmentVariables.completed,
                first: fragmentVariables.first
            };
        },
        query: props.TodoViewerQuery
    };

    const [viewer, { hasMore, isLoading, loadMore }] = usePagination(
        fragmentSpec,
        props.viewer
    );

    const _loadMore = () => {
        if (!hasMore() || isLoading()) {
            return;
        }

        loadMore(
            connectionConfig,
            1, // Fetch the next 10 feed items
            error => {
                if (error) {
                    console.log(error);
                }
            },
        );
    };

    // const _renderItem = ({ item, index }) => {
    //     return <Todo viewerId={props.viewer.id} item={item} />
    // }

    const { environment } = useEnvironmentContext()

    // TodoCreatedSubscription.subscribe(environment, props.viewer.id)
    TodoEditedSubscription.subscribe(environment, props.viewer.id)
    TodoDeletedSubscription.subscribe(environment, props.viewer.id)
    CompletedTodosDeletedSubscription.subscribe(environment, props.viewer.id)

    return (
      
       <div style={{width:"34%",marginLeft:"34%",borderRadius:25}}>
            <AddTodo viewerId={props.viewer.id} />
            <TodoContainer viewerId={props.viewer.id} _loadMore={_loadMore} edges={viewer.todos.edges} />
            {/* <TodoList viewerId={props.viewer.id} edges={viewer.todos.edges} /> */}
        </div>
 
      
    )
}

export default TodoPagination
