import React from 'react';
import { hot } from 'react-hot-loader';
import TodoList from './todos/TodoList';
import styled from 'styled-components';

const AppContainer = styled.div`
    margin: 1rem;
    width: 100vw;
    height: 100vh;
    font-family: Arial, Halvetica, sans-serif;
    color: #222222;
`;

function App() {
    return (
        <AppContainer>
            <TodoList />
        </AppContainer>
    )
}

export default hot(module)(App)