import { 
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure, 
    createTodo, 
    removeTodo, 
    markTodoAsCompleted 
} from '../actions';

//  in Redux, a thunk is simply a function that returns another function, 
// which contains the actual logic that we want to perform when it's triggered.

export const loadTodos = () => async (dispatch) => {
    try {    
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos')
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos))
    } catch (error) {
        dispatch(loadTodosFailure())
        dispatch(displayAlert(error))
    }
}

// The function we return here gets passed two arguments when the thunk is triggered. 
// And those two arguments are dispatch, which we can use to dispatch other redux actions from inside our thunk, 
// and getState, which is a function that we can use to get access to the current state of the redux store. 

export const addTodoRequest = (text) => async (dispatch) => {

    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body
        });

        const todo = await response.json();
        dispatch(createTodo(todo))
    } catch (error) {
        dispatch(displayAlert(error));
    }
}

export const removeTodoRequest = (id) => async (dispatch) => {

    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete',
        });

        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo))
    } catch (error) {
        dispatch(displayAlert(error));
    }
}

export const markTodoAsCompletedRequest = (id) => async (dispatch) => {

    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post',
        });

        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo))
    } catch (error) {
        dispatch(displayAlert(error));
    }
}

export const displayAlert = (text) => () => {
    alert(text)
};

//  In a real world web application, we'll be using our Thunks for many different asynchronous tasks, 
// such as loading or updating server data. 