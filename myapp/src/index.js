import React from 'react';
import ReactDOM from 'react-dom/client';

const myArray = ['apple', 'banana', 'orange'];


              
function calculate(a, b) {
    const add = a + b;
    const subtract = a - b;
    const multiply = a * b;
    const divide = a / b;
  
    return [add, subtract, multiply, divide];
  }
  
const [add, subtract, multiply, divide] = calculate(4, 7);

console.log(add)
console.log(subtract)
console.log(multiply)
console.log(divide)