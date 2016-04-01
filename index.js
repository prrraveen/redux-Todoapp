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

const todoApp = (state = {},action) => {
    return {
        todos: todos(
                state.todos,
                action
            ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    };
}

import { createStore } from 'redux';
const store = createStore(todoApp);

console.log('Initial State');
console.log(store.getState());
console.log('-----------');

console.log('Dispatching action ADD_TODO');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
});
console.log('Current State')
console.log(store.getState());
console.log('-----------');

console.log('Dispatching action ADD_TODO');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Go Nuts',
});
console.log('Current State')
console.log(store.getState());
console.log('-----------');

console.log('Dispatching action TOGGLE_TODO');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0,
});
console.log('Current State')
console.log(store.getState());
console.log('-----------');

console.log('Dispatching action SET_VISIBILITY_FILTER');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'COMPLETED'
});
console.log('Current State')
console.log(store.getState());
console.log('-----------');

