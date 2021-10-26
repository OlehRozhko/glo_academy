"use strict";

// const getRandomInt = (max) => {
//   return Math.floor(Math.random() * max);
// };

// const isNum = (n) => {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

// var start = () => {
//   var randomNumber = getRandomInt(100);
//   console.log("randomNumber: ", randomNumber);
//   var game = () => {
//     var num = prompt(
//       "Угадай число от 1 до 100(Для выхода оставьте строку пустой)"
//     );
//     if (num === null) {
//       alert("GoodBye");
//       return;
//     }
//     if (isNum(num)) {
//       var realNumber = +num;
//       if (realNumber > randomNumber) {
//         alert("Загаданное число меньше");
//         game();
//       } else if (realNumber < randomNumber) {
//         alert("Загаданное число больше");
//         game();
//       } else {
//         if (confirm("Вы угадали! Сыграем ещё?")) {
//           start();
//         } else {
//           alert("goodbye");
//           return;
//         }
//       }
//     } else {
//       alert("Введите число");
//       game();
//     }
//   };
//   game();
// };
// start();

// Используйте функции alert, confirm, prompt для общения с пользователем.
// Написать игровой бот.
// "Загадывание случайного числа от 1 до 100"
// Что должна делать программа:
// — спрашивает пользователя: "Угадай число от 1 до 100".
// — если пользовательское число больше, то бот выводит "Загаданное число меньше" и предлагает ввести новый вариант;
// — если пользовательское число меньше, то бот выводит "Загаданное число больше" и предлагает ввести новый вариант;
// — если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
// — если пользователь нажимает "Отмена", то игра заканчивается и выводится сообщение "Игра окончена".
// —  если пользовательское число равно загаданному, то игра заканчивается и выводит сообщение  /
//    "Поздравляю, Вы угадали!!!"
// Программа должны быть выполнена с помощью рекурсии, без единого цикла.
// Загаданное число должно храниться «в замыкании»

var getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const isNum = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

var start = () => {
  var randomNumber = getRandomNumber(100);
  var game = () => {
    var num = prompt("Угадай число от 1 до 100");
    if (num === null) {
      alert("goodbye!!!");
      return;
    }
    if (isNum(num)) {
      var realNumber = +num;
      if (realNumber > randomNumber) {
        alert("Загаданное число меньше");
        game();
      } else if (realNumber < randomNumber) {
        alert("Загаданное число больше");
        game();
      } else {
        if (confirm("You win.Do you want to play again?")) {
          start();
        } else {
          alert("goodbye!!!");
          return;
        }
      }
    } else {
      alert("please enter a number");
      game();
    }
  };
  game();
};
start();
