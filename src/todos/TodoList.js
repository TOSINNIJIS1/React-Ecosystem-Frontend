import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
// for mapDispatchToProps
import { connect } from 'react-redux';
import { displayAlert, loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from '../Redux/Thunk/thunks';



// we need to connect our todo list to the redux store
function TodoList({ todos = [] , onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) {
    useEffect(() => {
        startLoadingTodos();
    },[])

    const loadingMessage = <div> Loading todos ... </div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map((todo) => 
                <TodoListItem 
                    todo={todo} 
                    onRemovePressed={onRemovePressed} 
                    onCompletedPressed={onCompletedPressed} 
                />)}
        </div>
    )

    return isLoading ? loadingMessage : content;
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    todos: state.todos,
})

const mapDispatchToProps = (dispatch) => ({
    onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
    onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
    // onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
    startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)