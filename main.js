"use strict";

var getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

var numberToTry = (item) => {
  return item;
};

const isNum = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

var start = () => {
  var randomNumber = getRandomNumber(100);
  var numberToTryLeave = numberToTry(10);

  var game = () => {
    var num = prompt(
      "Угадай число від 1 до 100, У вас залишилося " +
        numberToTryLeave +
        " спроб"
    );
    if (num === null) {
      alert("Бувай здоровий!");
      return;
    } else if (numberToTryLeave === 1) {
      if (confirm("Спроби закінчилися, бажаєте зіграти ще раз?")) {
        start();
      } else {
        alert("Бувай здоровий!");
      }
      return;
    }
    if (isNum(num)) {
      var realNumber = +num;
      if (realNumber > randomNumber) {
        alert("Загадане число менше");
        numberToTryLeave--;
        game();
      } else if (realNumber < randomNumber) {
        alert("Загадане число більше");
        numberToTryLeave--;
        game();
      } else {
        if (confirm("Вітаю ви перемогли, бажаєте зіграти ще раз?")) {
          start();
        } else {
          alert("Бувай здоровий!");
          return;
        }
      }
    } else {
      alert("Введіть число, будь ласка!");
      game();
    }
  };
  game();
};
start();
