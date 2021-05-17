import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
// for mapDispatchToProps
import { connect } from 'react-redux';
import { 
    displayAlert, 
    loadTodos, 
    removeTodoRequest, 
    markTodoAsCompletedRequest 
} from '../Redux/Thunk/thunks';
// Selectors
import { 
    getTodos, 
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos, 
} from '../Redux/Selector/selectors';


// we need to connect our todo list to the redux store
function TodoList({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) {
    useEffect(() => {
        startLoadingTodos();
    },[])

    const loadingMessage = <div> Loading todos ... </div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3> Incomplete: </h3>
            {incompleteTodos.map((todo) => 
                <TodoListItem 
                    todo={todo} 
                    onRemovePressed={onRemovePressed} 
                    onCompletedPressed={onCompletedPressed} />)}
            <h3> Completed </h3>
            {completedTodos.map((todo) => 
                <TodoListItem 
                    todo={todo} 
                    onRemovePressed={onRemovePressed} 
                    onCompletedPressed={onCompletedPressed} />)}

        </div>
    )

    return isLoading ? loadingMessage : content;
}

const mapStateToProps = (state) => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
})

const mapDispatchToProps = (dispatch) => ({
    onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
    onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
    // onDisplayAlertClicked: (text) => dispatch(displayAlert(text)),
    startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)