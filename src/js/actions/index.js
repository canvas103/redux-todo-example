/**
 * Created by chenghuijin on 11/10/2016.
 */
import {normalize} from 'normalizr';
import * as schema from './schema';
import {getIsFetching} from './../reducers';
import * as restApi from './../restAPI';

export const addTodo = (text) =>(dispatch)=> {
    restApi.addTodo(text)
        .then(response=>
            dispatch({
                type: 'ADD_TODO_SUCCESS',
                response: normalize(response, schema.todo),
            })
        )
};

export const toggleTodo = (id)=> (dispatch)=> {
    restApi.toggleTodo(id)
        .then(response=>
            dispatch({
                type: 'TOGGLE_TODO_SUCCESS',
                response: normalize(response, schema.todo),
            }));
};


export const removeTodo = ()=>({});

export const fetchTodos = (filter)=>(dispatch, getState)=> {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve('loading..');
    }
    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    });
    return restApi.fetchTodos(filter)
        .then(
            response=>
                dispatch({
                    type: 'FETCH_TODOS_SUCCESS',
                    filter,
                    response: normalize(response, schema.arrayOfTodos),
                }))
        .catch(
            error =>
                dispatch({
                    type: 'FETCH_TODOS_FAILURE',
                    filter,
                    message: error.message || 'Something went wrong!',
                })
        );
};
