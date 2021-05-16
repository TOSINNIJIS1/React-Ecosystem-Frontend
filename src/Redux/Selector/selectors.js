// Selectors give us a place to put the logic for transforming data in the store into data our components can use. 
export const getTodos = (state) => state.todos;
export const getTodosLoading = (state) => state.isLoading;