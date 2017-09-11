/**
 * Created by chenghuijin on 11/10/2016.
 */
import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router'
import TodoApp from './../containers/TodoApp';

const Root = ({store})=>(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/(:filter)' component={TodoApp}/>
        </Router>
    </Provider>
);
Root.propTypes = {
    store: PropTypes.object.isRequired,
};
export default Root;