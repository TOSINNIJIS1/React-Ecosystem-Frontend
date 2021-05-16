import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED } from './actions';

// A reducer is a function named after whatever resources in the Redux store it's in charge of managing. 
// in our case that will be todos
// Reducers takes 2 arguement, which is the action and the state

// set the default value of our reducer to an empty array
export const todos = (state = [], action) => {
    // 1. the argument that we pass into our reducers are the current state of whatever resource the reducer is managing
    // in this case it will be an array of the current todo items in our application

    // 2. the second argument is the action that was triggered, which will be an object with type and payload properties

    // What reducers do is take the current state and the action that was triggered and decide what changes should
    // occur in the state as the result of this action, then return the updated state and Redux will take this return
    // value and set the current state to that

    // simplest reducer will be
    // return state
    // since no matter action or state this reducer was called with, it will make absolutely no changes.
    // we want our reducer to be more complex than that though, for example, it will almost always be a switch block.

    const { type, payload } = action;

    switch (type) {
        case CREATE_TODO: {
            const { text } = payload;
            const newTodo = {
                text,
                isCompleted: false,
            };

            // concat doesn't mutate the array
            return state.concat(newTodo)
            // when using reducer, be careful not to mutate the state
        }

        case REMOVE_TODO: {
            const { text } = payload;
            return state.filter((todo) => todo.text !== text);
        }

        case MARK_TODO_AS_COMPLETED: {
            const { text } = payload;
            return state.map((todo) => {
                if (todo.text === text) { 
                    return { ...todo, isCompleted: true };
                }
                return todo;
            });
        }

        default:
            return state;
            // we want this because our todo reducer will get called whenever any action get triggered in our 
            // application, so if our switch block make it to the default case, that means the action that was 
            // triggered wasn't one that we're really concerned with, so we should simply return the state as it is.
            // Note:
            // Remember to return the unchanged state if our reducer doesn't make any changes, otherwise, it will look
            // like our reducer is returning undefined and it will throw and error for the redux
    }
}

// Next step is to import this reducer todos to the store