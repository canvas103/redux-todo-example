/**
 * Created by chenghuijin on 11/10/2016.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from './../reducers';

import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const configureStore = ()=> {
    const middlewares = [promise, thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    const persistedState = loadState();
    const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares));

    store.subscribe(throttle(()=> {
        saveState({
            todos: store.getState().todos
        });
    }, 1000)); //limit saving frequency

    return store;
};
export default configureStore;
