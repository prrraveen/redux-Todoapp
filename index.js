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

console.log('@@@@@@@@@@@@@@@Test Passed@@@@@@@@@@@@@@@@@@@@@@@@');


