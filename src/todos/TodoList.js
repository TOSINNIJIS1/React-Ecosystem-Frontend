import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';

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
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos, 
} from '../Redux/Selector/selectors';
// Styling 
import styled from 'styled-components'


const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`

// we need to connect our todo list to the redux store
function TodoList({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) {
    useEffect(() => {
        startLoadingTodos();
    },[])

    const loadingMessage = <div> Loading todos ... </div>;
    const content = (
        <ListWrapper>
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

        </ListWrapper>
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