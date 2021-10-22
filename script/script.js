"use strict";
/* jshint node: true */

let isNumber = (n) => {
  console.log("n: ", n);
  console.log(parseFloat(n));
  console.log(isFinite(n));
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var money, // Дохід за місяць
  income = "Sport", //Додатковий дохід
  addExpenses = "", // Додаткові витрати
  deposit = true,
  mission = 10000, // Сума для накопичення
  period = 4; // К-сть місяців

do {
  money = prompt("Ваш місячний дохід?");
} while (!isNumber(money));

addExpenses = prompt("Перечісліть додаткові витрати?", "Fitnes , Girls , Beer");
deposit = confirm("Чи є у вас кредит у банку?");
var showTypeOf = function (data) {
  console.log(typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(" , "));

let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 4; i++) {
    expenses[i] = prompt("Введіть обов'явозкову статтю витрат?");

    sum += +prompt("Скільки це буде коштувати?");
  }
  console.log(sum);
  return sum;
};
console.log(expenses.toLowerCase);
let expensesAmount = getExpensesMonth();

console.log("Місячні витрати: " + expensesAmount);

var getAccumulatedMonth = function () {
  return money - expensesAmount;
};
var accumulatedMonth = getAccumulatedMonth();

var getTargetMonth = function (myMiss, budgetMonth) {
  return Math.ceil(myMiss / budgetMonth);
};

var targetMonth = getTargetMonth(mission, accumulatedMonth);

targetMonth > 0
  ? console.log("Ціла буде досягнути за " + targetMonth + " місяців")
  : console.log("Ціль не буде досягнута!");

var budgetDay = Math.floor(accumulatedMonth / 30);
console.log("budgetDay: ", budgetDay);

var getStatusIncome = function () {
  if (budgetDay > 1200) {
    return "У вас високий рівень доходу";
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return "У вас середній рівень доходу";
  } else if (budgetDay > 0 && budgetDay < 600) {
    return "На жаль у вас рівень доходу нижче середнього";
  } else if (budgetDay < 0) {
    return "Щось пішло не так";
  }
};
console.log(getStatusIncome());
