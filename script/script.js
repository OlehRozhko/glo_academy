"use strict";

/* jshint node: true */

var money = 500; // Дохід за місяць
var income = "Sport"; //Додатковий дохід
var addExpenses = "Fitnes , Girls , Beer"; // Додаткові витрати
var deposit = true;
var mission = 78958; // Сума для накопичення
var period = 12; // К-сть місяців

console.log(typeof money); //Тип данних money
console.log(typeof income); //Тип данних income
console.log(typeof deposit); //Тип данних deposit
console.log(addExpenses.length); // Довжина рядка addExpenses
console.log("Період дорівнює " + period + " місяців");
console.log("Ціль накопичення " + mission + " гривень");

var toLower = addExpenses.toLowerCase(); // Змінну addExpenses до нижнього регістру й зберігаємо в змінну toLower
var array = toLower.split(" , "); // Змінну toLower розбиваємо на масив
console.log(array);

money = +prompt("Ваш місячний дохід?");
console.log("money: ", money);
addExpenses = prompt("Перечісліть додаткові витрати?", "Fitnes , Girls , Beer");
console.log("addExpenses: ", addExpenses);
deposit = confirm("Чи є у вас кредит у банку?");
console.log("deposit: ", deposit);

var expenses1 = prompt("Введіть обов'явозкову статтю витрат?"),
  amount1 = prompt("Скільки це буде коштувати?"),
  expenses2 = prompt("Введіть обов'явозкову статтю витрат?"),
  amount2 = prompt("Скільки це буде коштувати?");

var budgetMonth = money - amount1 - amount2;
console.log("budgetMonth: ", budgetMonth);

var getTarget = Math.ceil(mission / budgetMonth);
console.log("getTarget: ", getTarget);

var budgetDay = Math.floor(budgetMonth / 30);
console.log("budgetDay: ", budgetDay);

if (budgetDay > 1200) {
  console.log("У вас високий рівень доходу");
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log("У вас середній рівень доходу");
} else if (budgetDay > 0 && budgetDay < 600) {
  console.log("На жаль у вас рівень доходу нижче середнього");
} else if (budgetDay < 0) {
  console.log("Щось пішло не так");
}
