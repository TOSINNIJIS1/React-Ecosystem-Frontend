import React from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
// for mapDispatchToProps
import  { removeTodo } from '../Redux/actions';
import { markTodoAsCompleted } from '../Redux/actions';
import { connect } from 'react-redux'


// we need to connect our todo list to the redux store
function TodoList({ todos = [] , onRemovePressed, onCompletedPressed}) {
    return (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map((todo) => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} />)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos,
})

const mapDispatchToProps = (dispatch) => ({
    onRemovePressed: (text) => dispatch(removeTodo(text)),
    onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)