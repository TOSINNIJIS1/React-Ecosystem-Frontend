import { expect } from 'chai';
import { todos } from '../../Redux/reducers';


// Testing reducers is very important in a React Redux application. They control the central state of our app, 
// so it's pretty vital for them to work correctly under all normal circumstances. The good news is that testing 
// reducers is actually quite easy. Reducers are pure functions, which means that they have no internal state for 
// us to set up. We simply have to define a current state and an action, and pass those two arguments to our 
// reducer to see if it returns what we expected it to.

describe('The todos reducers', () => {
    it ('Adds a new todo when CREATE_TODO action is recieved ', () => {
        // Testing reducers is very important in a React Redux application. They control the central state of our app, 
        // so it's pretty vital for them to work correctly under all normal circumstances. The good news is that 
        // testing reducers is actually quite easy. Reducers are pure functions, which means that they have no internal 
        // state for us to set up. We simply have to define a current state and an action, and pass those two arguments to 
        // our reducer to see if it returns what we expected it to.

        const fakeTodo = { text: 'hello', isCompleted: false, };
        const fakeAction = {
            type: "CREATE_TODO",
            payload: {
                todo: fakeTodo,
            },
        };

        const originalState = { isLoading: false, data: [] };

        const expected = {
            isLoading: false, 
            data: [fakeTodo]
        };

        const actual = todos(originalState, fakeAction);

        expect(actual).to.deep.equal(expected);
    })
})