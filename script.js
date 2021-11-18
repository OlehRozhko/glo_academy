/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable strict */
/* eslint-disable no-multi-assign */
/* eslint-disable radix */

'use strict';

class Calculator {
  constructor() {
    this.inputA = document.getElementById('a');
    this.inputB = document.getElementById('b');
    this.summa = document.getElementById('sum');
    this.multi = document.getElementById('mult');
    this.res = document.getElementById('res');
  }

  sum() {
    return parseInt(this.inputA.value) + parseInt(this.inputB.value);
  }

  mult() {
    return this.inputA.value * this.inputB.value;
  }

  show() {
    this.summa.addEventListener('click', function () {
      this.sum.textContent = this.res.value = this.sum();
    });
    this.multi.addEventListener('click', function () {
      this.mult.textContent = this.res.value = this.mult();
    });
  }
}
const calculator = new Calculator();
calculator.show();

// SECOND TASK
function getResult(x, y) {
  const numbers = (x ** y).toString();
  const array = [];
  for (let i = 0; i < numbers.length; i++) {
    array.push(parseInt(numbers[i]));
  }

  const result = array.reduce((accum, item) => accum + item, 0);
  return result;
}
getResult(5, 12);
