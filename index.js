// main.js
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const addCounter = (list) =>{
    return [...list, 0];
}

const removeCounter = (list, index) => {
    return list
}

(() =>{
    const listBefore = [];
    const listAfter = [0];
    
    deepFreeze(listBefore);

    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
})();

(() =>{
    const listBefore = [0,10,20];
    const listAfter = [0,20];
    
    deepFreeze(listBefore);

    expect(
        removeCounter(listBefore)
    ).toEqual(listAfter);
})();

console.log('@@@@@@@@@@@@@@@Test Passed@@@@@@@@@@@@@@@@@@@@@@@@');


