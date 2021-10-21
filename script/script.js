"use strict";

/* jshint node: true */

var money = 500; // Дохід за місяць
var income = "Sport"; //Додатковий дохід
var addExpenses = "Fitnes , Girls , Beer"; // Додаткові витрати
var deposit = true;
var mission = 78958; // Сума для накопичення
var period = 12; // К-сть місяців

var showTypeOf = function (data) {
  console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

var toLower = addExpenses.toLowerCase(); // Змінну addExpenses до нижнього регістру й зберігаємо в змінну toLower
var array = toLower.split(" , "); // Змінну toLower розбиваємо на масив
console.log(array);

money = +prompt("Ваш місячний дохід?", "10000");
addExpenses = prompt("Перечісліть додаткові витрати?", "Fitnes , Girls , Beer");
deposit = confirm("Чи є у вас кредит у банку?");

var expenses1 = prompt("Введіть обов'явозкову статтю витрат?", "Курси"),
  amount1 = +prompt("Скільки це буде коштувати?", "4000"),
  expenses2 = prompt("Введіть обов'явозкову статтю витрат?", "Водіння"),
  amount2 = +prompt("Скільки це буде коштувати?", "1500");

var getExpensesMonth = function () {
  return amount1 + amount2;
};
console.log(getExpensesMonth());

var getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};
var accumulatedMonth = getAccumulatedMonth();

var getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};
console.log(getTargetMonth());

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
