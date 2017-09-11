/**
 * Created by chenghuijin on 11/10/2016.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTodo} from './../actions';
import FilterLink from './FilterLink';
import VisibleTodoList from './VisibleTodoList';

const Footer = ()=>(
    <p>
        Show:{" "}
        <FilterLink filter="all">All</FilterLink>
        {', '}
        <FilterLink filter="active">Active</FilterLink>
        {', '}
        <FilterLink filter="completed">Completed</FilterLink>
    </p>
);


let AddTodo = ({dispatch})=> {
    let input;
    return (
        <div>
            <input ref={node=> {
                input = node;
            }}/>
            <button onClick={()=> {
                input.value && dispatch(addTodo(input.value));
                input.value = '';
            }
            }>Add Todo
            </button>
        </div>
    )
};
AddTodo = connect()(AddTodo);

const TodoApp = ()=> (
    <div>
        <h2>TodoAPP Test</h2>

        <AddTodo />

        <VisibleTodoList />

        <Footer />
    </div>
);


export default TodoApp;