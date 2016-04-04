// main.js
import expect from 'expect';
import deepFreeze from 'deep-freeze';

//A reducer. pure function
const todos = (state=[], action) =>{
   switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo =>{
                if(todo.id != action.id){
                    return todo;
                }
                return Object.assign({},todo,{
                    completed: !todo.completed
                });
            })
        default:
            return state;
    } 
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    };
};

import { combineReducers } from 'redux';
const todoApp = combineReducers({
    todos,
    visibilityFilter,
});

import { createStore } from 'redux';
const store = createStore(todoApp);

import React from 'react';
import ReactDOM from 'react-dom';

import { Component } from 'react';

let nextTodoId = 0;

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (filter === currentFilter){
        return <span>{children}</span>
    }

    return (
        <a href='#'
            onClick={ e =>{
                e.preventDefault();
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                });
            }}
        >
        {children}
        </a>
);
};  

class TodoApp extends Component {
    render(){
        const visibletodos = getVisibletodos(
            this.props.todos,
            this.props.visibilityFilter
        );
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }} />
                <button onClick={() =>{
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value ='';
                }}>Add Todo</button>
               <ul>
                    {visibletodos.map(todo =>
                        <li key={todo.id}
                            onClick={()=>{
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                });
                            }}
                            style={{
                               textDecoration:
                                    todo.completed ? 'line-through' : 'none' 
                            }}>
                            {todo.text}
                        </li>
                    )}
               </ul> 
               <p>
                    show
                    {' '}
                    <FilterLink filter='SHOW_ALL'
                        currentFilter={visibilityFilter}
                    >
                    All
                    </FilterLink>
                    {' '}
                    <FilterLink filter='SHOW_ACTIVE'
                        currentFilter={visibilityFilter}
                    >
                    Active
                    </FilterLink>
                    {' '}
                    <FilterLink filter='SHOW_COMPLETED'
                        currentFilter={visibilityFilter}
                    >
                    COMPLETED
                    </FilterLink>
                    </p>
            </div>
        )
    }
}

const getVisibletodos = (
    todos,
    filter
) => {
    switch(filter){
        case 'SHOW_ALL':
            return todos
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => t.completed
            )
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => !t.completed
            )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp 
            { ...store.getState() }
        />,
        document.getElementById('root')
    )
}

store.subscribe(render);
render();
