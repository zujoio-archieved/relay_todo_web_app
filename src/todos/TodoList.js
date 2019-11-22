import React from 'react'
import Todo from './Todo'

const TodoList = (props) => {
    return (
        <div>
            {props.edges.map(edge => {
                return (<div key={edge.node.id}><Todo item={edge} viewerId={props.viewerId} /></div>)
            })}
        </div>
    )
}

export default TodoList
