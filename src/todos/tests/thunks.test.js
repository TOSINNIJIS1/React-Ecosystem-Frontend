import 'node-fetch';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import { loadTodos } from '../../Redux/Thunk/thunks';


// So what if we were to create a fake version of this dispatch function and pass it in ourselves and then check 
// if it had been called with the right arguments? Well as some of you may have guessed, that's exactly why we 
// installed the sinon package into our project, to create a fake function that we can pass in that keeps track 
// of what arguments it was called with. So this gives us a starting point. We're going to import sinon up at the 
// top of our file like this

describe('The loadTodos thunk', () => {
    it ('it dispatches the correct actions in the success scenario', async () => {
        
        const fakeDispatch = sinon.spy();
        
        const fakeTodos = [{ text: '1'}, { text: '2' }];
        fetchMock.get('http://localhost:8080/todos', fakeTodos);

        const expectedFirstAction = { type: 'LOAD_TODOS_IN_PROGRESS' }
        const expectedSecondAction = { 
            type: 'LOAD_TODOS_SUCCESS', 
            payload: {
                todos: fakeTodos,
            },
        };

        await loadTodos()(fakeDispatch);

        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction)
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction)

        fetchMock.reset();
    });
});