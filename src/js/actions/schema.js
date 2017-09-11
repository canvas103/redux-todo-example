/**
 * Created by chenghuijin on 11/14/2016.
 */
import {Schema, arrayOf} from 'normalizr';

export const todo = new Schema('todos');

export const arrayOfTodos = arrayOf(todo);