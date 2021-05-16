import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todos, isLoading } from './Redux/reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


// it tells redux persist how to reconcile the initial and stored states of our application 
// for example, how deep should it go when doing so
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reducers = {
    todos,
    isLoading,
};

// tells redux persist how to save and where to store our application data
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

// put our reducers into a form that we can pass to the create store function that we imported
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
    );