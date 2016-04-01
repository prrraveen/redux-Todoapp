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

(() =>{
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Finish ToDo app'
    }
    
    const stateAfter = [
        {
            id: 0,
            text: 'Finish ToDo app',
            completed: false
        }
    ]

    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
        todos(stateBefore,action)
    ).toEqual(stateAfter);
})();

(() =>{
    const stateBefore = [
        {
            id: 0,
            text: 'Finish ToDo app',
            completed: false
        },
        {
            id: 1,
            text: 'unit testing is awesome',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1,
    }
    
    const stateAfter = [
         {
            id: 0,
            text: 'Finish ToDo app',
            completed: false
        },
        {
            id: 1,
            text: 'unit testing is awesome',
            completed: true
        }
    ]

    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
        todos(stateBefore,action)
    ).toEqual(stateAfter);
})();

console.log('@@@@@@@@@@@@@@@Test Passed@@@@@@@@@@@@@@@@@@@@@@@@');


