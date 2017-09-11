/**
 * Created by chenghuijin on 11/10/2016.
 */
import React from 'react';
import {Link} from 'react-router';

const FilterLink = ({filter, children})=>(
    <Link to={filter === 'all' ? '' : filter}
          activeStyle={{
              textDecoration: 'none',
              color: 'black'
          }}
    >
        {children}
    </Link>
);

export default FilterLink;