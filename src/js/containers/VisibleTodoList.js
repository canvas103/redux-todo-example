/**
 * Created by chenghuijin on 11/10/2016.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toggleTodo, fetchTodos} from './../actions';
import {getVisibleTodos, getIsFetching, getErrorMessage} from './../reducers';

import FetchError from './../components/FetchError';


const Todo = ({
    onClick,
    completed,
    text
})=> (
    <li onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick
})=>(
    <ul>
        {todos.map(todo=>
            <Todo
                key={todo.id}
                {...todo}
                onClick={()=> onTodoClick(todo.id)}
            />)}
    </ul>
);
class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, fetchTodos} =this.props;
        fetchTodos(filter)
        // .then((res)=>console.log('done!:'))
        ;
    }

    render() {
        const {todos, isFetching, errorMessage, toggleTodo}=this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }
        if (errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={()=>this.fetchData()}
                />
            )
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo}/>
    }
}


const mapStateToTodoListProps = (state, {params})=> {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        filter,
    }
};
// const mapDispatchToTodoListProps = (dispatch)=> ({
//     onTodoClick(id){
//         dispatch(toggleTodo(id));
//     }
// });
VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    {
        toggleTodo,
        fetchTodos
    }
)(VisibleTodoList));

export default VisibleTodoList;