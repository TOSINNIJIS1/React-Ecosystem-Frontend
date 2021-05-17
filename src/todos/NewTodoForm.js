import React, { useState } from 'react';
// Connect is a higher order function, which means we call it with two different sets of arguments.
// for example connect()()
import { connect } from 'react-redux';
// The argument we pass to the second paremeter/parethesis is the component that we want to connect to the redux store
// for example connect()(NewTodoForm) it return the connected version of the component
// so instead of exporting NewTodoForm, we will be exporting the connect that we defined

// this is for mapDispatchToProps
import { addTodoRequest } from '../Redux/Thunk/thunks'

// this is for mapStateToProps
// Selectors
import { getTodos } from '../Redux/Selector/selectors';

// Styling 
import styled from 'styled-components';

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;
const FormInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const FormButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;


function NewTodoForm({ todos, onCreatePressed }) {
    
    const [inputValue, setInputValue] = useState('')

    return (
        <FormContainer>
            <FormInput
            type='text' 
            placeholder="Type your new todo here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            
            <FormButton
            onClick={() => {
                // check if there's already a todo that contains this text
                const isDuplicateText = todos.some(todo => todo.text === inputValue)

                if (!isDuplicateText) 
                    // create new todo
                    onCreatePressed(inputValue);

                    // refresh after creating new todo
                    setInputValue('');
                
            }}
            > 
            Create Todo 
            </FormButton>
        </FormContainer>
    )
}

// we need to define 2 functions, 1. mapStateToProps which will take argument of state  
// 2. mapDispatchToProps which will take the arg of dispatch
// then we pass the 2 functions to the first parameter/parenthesis of connect

// mapStateToProps --> the state argument that get passed to mapStateToProps is an object that represent the entire
// redux state. 
// The job of mapStateToProps is to take the state object and return another object containing the
// pieces of that state that our component needs to access to
const mapStateToProps = (state) => ({
    todos: getTodos(state),
});


// mapDispatchToProps works in a similar way to mapDispatchToProps, the properties of the object to be returned will
// be passed to our component as props. the difference is that instead of taking the redux state as an argument, it
// takes dispatch.
// Dispatch is a function that allow our components to trigger actions that our redux store will respond to.
// in our case, we want to trigger our redux action when someone clicks the create to do button o
const mapDispatchToProps = (dispatch) => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
