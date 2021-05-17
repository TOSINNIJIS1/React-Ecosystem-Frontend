import { createSelector } from 'reselect';

// Selectors give us a place to put the logic for transforming data in the store into data our components can use. 
export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

// second selectors purpose is to give us a place to put the logic necessary for transforming bare Redux data into 
// more specific data that our components might need. 
// In order to make this example more effective, let's say that we're going to make a change to our application. 
// Instead of having a single to-do list that displays all of our to dos, let's say that we're going to change 
// our application so that we have two separate lists, one to display the completed to dos and one to display 
// the to dos that we haven't completed yet. Now, this change requires us to perform a little bit of logic to 
// transform the data contained in our Redux store, which simply contains a list of all our to do items, into lists
//  of our completed or incomplete to dos. Now, our first instinct with this situation might be to perform this 
// logic inside our mapStateToProps function, but now that we know about selectors, we can imagine that selectors 
// might be a better place to put this kind of logic. So, we're going to go back to our selectors.js file and 
// create some new selectors.


// This will return all the state where the incomplete properties is false

// We can add as many other selectors as we want to this function
export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter((todo) => !todo.isCompleted),
);

export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter((todo) => todo.isCompleted)
);