import React, { useState } from 'react'
import TodoList from './TodoList'

const TodoContainer = (props) => {
    const display = { ALL: "ALL", COMPLETED: "COMPLETED", INCOMPLETED: "INCOMPLETED" }

    const [displayer, setDisplayer] = useState(display.ALL)

    const completedTodos = []
    const inCompletedTodos = []
    props.edges.forEach(edge => {
        if (edge.node.completed) {
            completedTodos.unshift(edge)
        } else {
            inCompletedTodos.unshift(edge)
        }
    })
    return (
        <div>
            {displayer}
            <div>
                <div onClick={() => { setDisplayer((display.ALL)) }}>All</div>
                <div onClick={() => { setDisplayer((display.COMPLETED)) }} >Completed</div>
                <div onClick={() => { setDisplayer((display.INCOMPLETED)) }}>Incomplete</div>
                <TodoList
                    viewerId={props.viewerId}
                    edges={
                        displayer === display.ALL
                            ? props.edges
                            : displayer === display.COMPLETED
                                ? completedTodos : inCompletedTodos
                    }
                />
            </div>
        </div>
    )
}

export default TodoContainer
